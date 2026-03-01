import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TestContainer } from '../components/test/TestContainer';
import { QuestionCard } from '../components/test/QuestionCard';
import { TimerBar } from '../components/test/TimerBar';
import { NavigationButtons } from '../components/test/NavigationButtons';
import { questions, testMeta } from '../data/questions';

const MAX_VIOLATIONS = 3;

/**
 * Test – Full-screen test page composing reusable test components.
 * Owns state and logic; child components remain pure and stateless.
 *
 * Anti-cheat features:
 *   - Fullscreen mode enforcement (enters fullscreen on start)
 *   - Tab-switch / visibility change detection (max 3 violations → auto-submit)
 *   - Fullscreen exit detection (counts as a violation)
 *   - Right-click prevention
 *   - Text selection disabled
 */
export default function Test() {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [timeLeft, setTimeLeft] = useState(testMeta.duration * 60);
    const [isStarted, setIsStarted] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const [tabSwitchCount, setTabSwitchCount] = useState(0);
    const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(false);
    const testContainerRef = useRef<HTMLDivElement>(null);

    const question = questions[currentQuestion];
    const totalTime = testMeta.duration * 60;

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    useEffect(() => {
        if (!isStarted || isSubmitted) return;
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) { clearInterval(interval); setIsSubmitted(true); return 0; }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [isStarted, isSubmitted]);

    /* ── Fullscreen helpers ── */
    const enterFullscreen = useCallback(async () => {
        try {
            const el = document.documentElement;
            if (el.requestFullscreen) {
                await el.requestFullscreen();
            } else if ((el as any).webkitRequestFullscreen) {
                await (el as any).webkitRequestFullscreen();
            } else if ((el as any).msRequestFullscreen) {
                await (el as any).msRequestFullscreen();
            }
            setIsFullscreen(true);
            setShowFullscreenPrompt(false);
        } catch {
            console.warn('Fullscreen request denied by browser.');
        }
    }, []);

    const exitFullscreen = useCallback(() => {
        try {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if ((document as any).webkitExitFullscreen) {
                (document as any).webkitExitFullscreen();
            } else if ((document as any).msExitFullscreen) {
                (document as any).msExitFullscreen();
            }
        } catch {
            // ignore
        }
        setIsFullscreen(false);
    }, []);

    /* ── Trigger violation ── */
    const triggerViolation = useCallback((message: string) => {
        if (isSubmitted) return;
        setTabSwitchCount((prev) => {
            const newCount = prev + 1;
            if (newCount >= MAX_VIOLATIONS) {
                setWarningMessage(`⛔ Maximum violations reached (${MAX_VIOLATIONS}). Test auto-submitted.`);
                setShowWarning(true);
                setIsSubmitted(true);
                exitFullscreen();
            } else {
                setWarningMessage(`${message} (${newCount}/${MAX_VIOLATIONS})`);
                setShowWarning(true);
                setTimeout(() => setShowWarning(false), 3000);
            }
            return newCount;
        });
    }, [isSubmitted, exitFullscreen]);

    /* ── Tab switch / visibility detection ── */
    const handleVisibilityChange = useCallback(() => {
        if (document.hidden && isStarted && !isSubmitted) {
            triggerViolation('🚨 Tab switch detected!');
        }
    }, [isStarted, isSubmitted, triggerViolation]);

    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [handleVisibilityChange]);

    /* ── Fullscreen exit detection ── */
    useEffect(() => {
        if (!isStarted || isSubmitted) return;
        const handleFullscreenChange = () => {
            const isFull = !!(
                document.fullscreenElement ||
                (document as any).webkitFullscreenElement ||
                (document as any).msFullscreenElement
            );
            setIsFullscreen(isFull);
            if (!isFull && isStarted && !isSubmitted) {
                // User exited fullscreen — show prompt to re-enter
                setShowFullscreenPrompt(true);
                triggerViolation('🖥️ Fullscreen exit detected!');
            }
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        };
    }, [isStarted, isSubmitted, triggerViolation]);

    /* ── Right-click prevention ── */
    useEffect(() => {
        if (!isStarted || isSubmitted) return;
        const h = (e: Event) => e.preventDefault();
        document.addEventListener('contextmenu', h);
        return () => document.removeEventListener('contextmenu', h);
    }, [isStarted, isSubmitted]);

    /* ── Keyboard shortcut prevention (Alt+Tab warning, F11, etc.) ── */
    useEffect(() => {
        if (!isStarted || isSubmitted) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent common escape keys
            if (e.key === 'F11' || e.key === 'Escape') {
                e.preventDefault();
            }
            // Prevent Ctrl+Tab, Ctrl+W, Alt+Tab attempts
            if ((e.ctrlKey && (e.key === 'Tab' || e.key === 'w' || e.key === 'W')) ||
                (e.altKey && e.key === 'Tab')) {
                e.preventDefault();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isStarted, isSubmitted]);

    /* ── Exit fullscreen on submit ── */
    useEffect(() => {
        if (isSubmitted && isFullscreen) {
            exitFullscreen();
        }
    }, [isSubmitted, isFullscreen, exitFullscreen]);

    const selectAnswer = (i: number) => setAnswers({ ...answers, [question.id]: i });
    const toggleReview = () => {
        setMarkedForReview((prev) => {
            const next = new Set(prev);
            next.has(question.id) ? next.delete(question.id) : next.add(question.id);
            return next;
        });
    };
    const handleSubmit = () => {
        setIsSubmitted(true);
        exitFullscreen();
    };
    const getScore = () => questions.filter((q) => answers[q.id] === q.correctAnswer).length;

    /* ── Start test: enter fullscreen ── */
    const handleStartTest = async () => {
        setIsStarted(true);
        await enterFullscreen();
    };

    // Pre-start screen
    if (!isStarted) {
        return (
            <div className="min-h-screen bg-cream bg-ruled-lines flex items-center justify-center p-4 select-none">
                <div className="bg-white rounded-xl shadow-card p-8 max-w-lg w-full text-center shadow-paper animate-fade-in">
                    <h1 className="font-caveat text-4xl font-bold text-navy mb-2">{testMeta.title}</h1>
                    <div className="flex justify-center gap-6 my-6">
                        <div className="bg-cream rounded-lg px-4 py-2">
                            <p className="font-caveat text-2xl font-bold text-navy">{testMeta.totalQuestions}</p>
                            <p className="font-body text-sm text-navy/50">Questions</p>
                        </div>
                        <div className="bg-cream rounded-lg px-4 py-2">
                            <p className="font-caveat text-2xl font-bold text-navy">{testMeta.duration} min</p>
                            <p className="font-body text-sm text-navy/50">Duration</p>
                        </div>
                    </div>
                    <div className="bg-yellow-light/50 rounded-lg p-4 mb-6 text-left">
                        <p className="font-body text-sm text-navy/70 mb-2">⚠️ Anti-Cheat Rules:</p>
                        <ul className="font-body text-sm text-navy/60 space-y-1 list-disc pl-4">
                            <li><strong>Fullscreen mode</strong> will be activated — do not exit</li>
                            <li><strong>Tab switching</strong> is monitored and recorded</li>
                            <li><strong>{MAX_VIOLATIONS} violations</strong> (tab switch or fullscreen exit) = auto-submit</li>
                            <li>Right-click and keyboard shortcuts are disabled</li>
                            <li>Timer starts when you click "Start"</li>
                            <li>You can mark questions for review</li>
                        </ul>
                    </div>
                    <button onClick={handleStartTest} className="px-8 py-3 bg-navy text-cream font-body text-lg rounded-lg shadow-md hover:bg-navy-light hover:shadow-lg transition-all group">
                        <span className="flex items-center gap-2">
                            🖥️ Enter Fullscreen & Start Test →
                        </span>
                    </button>
                    <p className="font-body text-xs text-navy/40 mt-3">Your browser will enter fullscreen mode</p>
                </div>
            </div>
        );
    }

    // Results screen
    if (isSubmitted) {
        const score = getScore();
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <div className="min-h-screen bg-cream bg-ruled-lines flex items-center justify-center p-4 select-none">
                <div className="bg-white rounded-xl shadow-card p-8 max-w-lg w-full text-center shadow-paper animate-fade-in">
                    <h1 className="font-caveat text-4xl font-bold text-navy mb-2">Test Complete! 🎉</h1>
                    <div className="relative w-32 h-32 mx-auto my-8">
                        <svg viewBox="0 0 36 36" className="w-32 h-32 transform -rotate-90">
                            <path d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                            <path d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" fill="none" stroke={percentage >= 70 ? '#b9f6ca' : percentage >= 40 ? '#fff176' : '#f8bbd9'} strokeWidth="3" strokeDasharray={`${percentage}, 100`} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-caveat text-3xl font-bold text-navy">{percentage}%</span>
                        </div>
                    </div>
                    <p className="font-body text-xl text-navy mb-2">{score}/{questions.length} correct</p>
                    <p className="font-body text-navy/50 mb-1">Time: {formatTime(totalTime - timeLeft)}</p>
                    {tabSwitchCount > 0 && <p className="font-body text-red-500 text-sm mb-4">⚠️ Tab switches: {tabSwitchCount}</p>}
                    <div className="flex gap-3 justify-center mt-6">
                        <button onClick={() => navigate('/analytics')} className="px-6 py-3 bg-navy text-cream font-body rounded-lg shadow-md hover:bg-navy-light transition-all">View Analytics</button>
                        <button onClick={() => navigate('/dashboard')} className="px-6 py-3 bg-cream text-navy font-body rounded-lg border-2 border-navy/20 hover:border-navy/40 transition-all">Dashboard</button>
                    </div>
                </div>
            </div>
        );
    }

    // Active test
    const answeredCount = Object.keys(answers).length;
    return (
        <TestContainer timeRemaining={timeLeft} questionNumber={currentQuestion + 1} totalQuestions={questions.length} violationCount={tabSwitchCount} maxViolations={MAX_VIOLATIONS}>
            {/* Violation warning overlay */}
            {showWarning && (
                <div className="fixed inset-0 bg-red-500/90 z-50 flex items-center justify-center animate-fade-in select-none">
                    <div className="text-center">
                        <p className="text-white font-caveat text-5xl mb-4">⚠️</p>
                        <p className="text-white font-body text-2xl">{warningMessage}</p>
                        <div className="flex gap-1 justify-center mt-4">
                            {Array.from({ length: MAX_VIOLATIONS }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-4 h-4 rounded-full border-2 border-white/50 transition-all ${i < tabSwitchCount ? 'bg-white' : 'bg-transparent'
                                        }`}
                                />
                            ))}
                        </div>
                        <p className="text-white/60 font-body text-sm mt-2">
                            {tabSwitchCount >= MAX_VIOLATIONS
                                ? 'Test has been auto-submitted'
                                : `${MAX_VIOLATIONS - tabSwitchCount} violation(s) remaining`}
                        </p>
                    </div>
                </div>
            )}

            {/* Fullscreen re-enter prompt */}
            {showFullscreenPrompt && !isSubmitted && tabSwitchCount < MAX_VIOLATIONS && (
                <div className="fixed inset-0 bg-navy/95 z-50 flex items-center justify-center animate-fade-in select-none">
                    <div className="text-center bg-white rounded-xl p-8 shadow-xl max-w-md">
                        <p className="font-caveat text-4xl mb-2">🖥️</p>
                        <h3 className="font-caveat text-2xl font-bold text-navy mb-2">Fullscreen Required</h3>
                        <p className="font-body text-navy/60 mb-4">
                            You exited fullscreen mode. This has been recorded as a violation.
                            Please re-enter fullscreen to continue.
                        </p>
                        <p className="font-body text-red-500 text-sm mb-4">
                            ⚠️ Violations: {tabSwitchCount}/{MAX_VIOLATIONS}
                        </p>
                        <button
                            onClick={enterFullscreen}
                            className="px-6 py-3 bg-navy text-cream font-body rounded-lg shadow-md hover:bg-navy-light transition-all"
                        >
                            Re-enter Fullscreen →
                        </button>
                    </div>
                </div>
            )}
            <div className="flex flex-col lg:flex-row min-h-[calc(100vh-3.5rem)]">
                <div className="flex-1 p-6 lg:p-10">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <TimerBar timeRemaining={timeLeft} totalTime={totalTime} />
                        <QuestionCard questionText={question.text} options={question.options} selectedAnswer={answers[question.id] ?? null} questionNumber={currentQuestion + 1} section={question.section} difficulty={question.difficulty as 'Easy' | 'Medium' | 'Hard'} onSelectAnswer={selectAnswer} />
                        <div className="space-y-4">
                            <div className="flex justify-center">
                                <button onClick={toggleReview} className={`px-4 py-2 font-body rounded-lg border transition-all text-sm select-none ${markedForReview.has(question.id) ? 'bg-pink-light border-pink-light text-navy' : 'bg-white border-navy/10 text-navy/50 hover:border-navy/20'}`}>
                                    {markedForReview.has(question.id) ? '📌 Marked' : '📌 Mark for Review'}
                                </button>
                            </div>
                            <NavigationButtons onPrevious={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))} onNext={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))} onSubmit={handleSubmit} isFirstQuestion={currentQuestion === 0} isLastQuestion={currentQuestion === questions.length - 1} />
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-64 bg-white border-t lg:border-t-0 lg:border-l border-ruled p-4 select-none">
                    <h4 className="font-caveat text-lg font-bold text-navy mb-3">Question Map</h4>
                    <div className="grid grid-cols-5 gap-2">
                        {questions.map((q, i) => (
                            <button key={q.id} onClick={() => setCurrentQuestion(i)} className={`w-10 h-10 rounded-lg font-caveat font-bold text-sm transition-all select-none ${i === currentQuestion ? 'bg-navy text-cream shadow-md ring-2 ring-yellow-accent' : markedForReview.has(q.id) ? 'bg-pink-light text-navy border border-pink-light' : answers[q.id] !== undefined ? 'bg-green-soft text-navy' : 'bg-cream text-navy/40 border border-ruled/50 hover:border-navy/20'}`} aria-label={`Q${i + 1}`}>
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <div className="mt-4 space-y-2 text-sm font-body text-navy/60 select-none">
                        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-soft rounded" /><span>Answered ({answeredCount})</span></div>
                        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-pink-light rounded" /><span>Marked ({markedForReview.size})</span></div>
                        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-cream border border-ruled/50 rounded" /><span>Unanswered ({questions.length - answeredCount})</span></div>
                    </div>
                </div>
            </div>
        </TestContainer>
    );
}
