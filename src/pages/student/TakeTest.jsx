import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getTestById, submitResult, hasStudentTakenTest } from '../../data/classStore';

export default function TakeTest() {
    const { testId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [test, setTest] = useState(null);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState(null);
    const [currentQ, setCurrentQ] = useState(0);
    const [startTime] = useState(Date.now());
    const [alreadyTaken, setAlreadyTaken] = useState(false);

    useEffect(() => {
        const t = getTestById(testId);
        if (!t) { navigate('/student/dashboard'); return; }
        setTest(t);
        if (hasStudentTakenTest(user?.email, testId)) setAlreadyTaken(true);
    }, [testId]);

    const handleSelect = (optionText) => {
        setAnswers(prev => ({ ...prev, [currentQ]: optionText }));
    };

    const handleSubmit = () => {
        let score = 0;
        test.questions.forEach((q, i) => { if (answers[i] === q.correct) score++; });
        const elapsed = Math.round((Date.now() - startTime) / 1000);
        const mins = Math.floor(elapsed / 60);
        const secs = elapsed % 60;
        const timeTaken = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
        const res = submitResult({ testId, testTitle: test.title, studentEmail: user?.email, studentName: user?.name, score, total: test.questions.length, answers, timeTaken });
        setResult(res);
        setSubmitted(true);
    };

    if (!test) return <div className="min-h-screen bg-cream flex items-center justify-center"><span className="font-caveat text-2xl text-navy/40">Loading...</span></div>;

    if (alreadyTaken) return (
        <div className="min-h-screen bg-cream flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-card p-10 text-center max-w-md animate-pop-in">
                <span className="text-5xl">⚠️</span>
                <h2 className="font-caveat text-3xl font-bold text-navy mt-4">Already Submitted</h2>
                <p className="font-body text-navy/60 mt-2">You've already taken this test.</p>
                <button onClick={() => navigate('/student/dashboard')} className="mt-6 px-6 py-3 bg-navy text-cream rounded-xl font-body hover:bg-navy-light transition-all">Back to Dashboard</button>
            </div>
        </div>
    );

    if (submitted && result) return (
        <div className="min-h-screen bg-cream flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-card p-10 text-center max-w-md animate-pop-in">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold font-caveat text-navy mx-auto mb-4 ${result.percentage >= 70 ? 'bg-green-soft' : result.percentage >= 40 ? 'bg-yellow-light' : 'bg-pink-light'}`}>
                    {result.percentage}%
                </div>
                <h2 className="font-caveat text-3xl font-bold text-navy">
                    {result.percentage >= 70 ? 'Excellent! 🎉' : result.percentage >= 40 ? 'Good Try! 👍' : 'Keep Practicing! 💪'}
                </h2>
                <p className="font-body text-navy/60 mt-2">{result.score} out of {result.total} correct · Time: {result.timeTaken}</p>

                {/* Question review */}
                <div className="mt-6 text-left space-y-3">
                    {test.questions.map((q, i) => {
                        const userAns = answers[i];
                        const correct = q.correct;
                        const isRight = userAns === correct;
                        return (
                            <div key={i} className={`p-3 rounded-xl text-sm font-body ${isRight ? 'bg-green-soft/40' : 'bg-pink-light/40'}`}>
                                <p className="font-medium text-navy">{i + 1}. {q.question}</p>
                                <p className={`text-xs mt-1 ${isRight ? 'text-green-600' : 'text-red-500'}`}>
                                    {isRight ? '✅' : '❌'} Your answer: {userAns || 'Not answered'}
                                    {!isRight && <span className="text-navy"> · Correct: {correct}</span>}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <button onClick={() => navigate('/student/dashboard')} className="mt-6 w-full py-3 bg-navy text-cream rounded-xl font-body hover:bg-navy-light transition-all hover:-translate-y-0.5 shadow-md">
                    Back to Dashboard →
                </button>
            </div>
        </div>
    );

    const q = test.questions[currentQ];
    const progress = ((currentQ + 1) / test.questions.length) * 100;
    const allAnswered = test.questions.every((_, i) => answers[i] !== undefined);

    return (
        <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-2xl animate-fade-in">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="font-caveat text-xl font-bold text-navy">{test.title}</h1>
                        <span className="font-body text-sm text-navy/50">{currentQ + 1} / {test.questions.length}</span>
                    </div>
                    <div className="w-full h-2 bg-white rounded-full overflow-hidden shadow-inner">
                        <div className="h-full bg-navy rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>
                </div>

                {/* Question card */}
                <div className="bg-white rounded-2xl shadow-card p-8 mb-5 animate-fade-in" key={currentQ}>
                    <p className="font-body text-navy font-semibold text-lg leading-relaxed mb-6">{q.question}</p>
                    <div className="space-y-3">
                        {q.options.map((opt, oi) => {
                            const selected = answers[currentQ] === opt;
                            return (
                                <button key={oi} onClick={() => handleSelect(opt)}
                                    className={`w-full text-left px-5 py-4 rounded-xl font-body text-navy transition-all duration-200 border-2 ${selected ? 'bg-navy text-cream border-navy shadow-md scale-[1.01]' : 'bg-cream/50 border-ruled hover:border-navy/30 hover:bg-white hover:shadow-sm'}`}>
                                    <span className="font-mono text-sm opacity-60 mr-3">{'ABCD'[oi]}.</span>{opt}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between gap-3">
                    <button onClick={() => setCurrentQ(p => Math.max(0, p - 1))} disabled={currentQ === 0}
                        className="px-5 py-2.5 rounded-xl font-body text-sm bg-white border-2 border-ruled text-navy hover:border-navy/30 disabled:opacity-40 transition-all">
                        ← Previous
                    </button>

                    {/* Question dots */}
                    <div className="flex gap-1.5">
                        {test.questions.map((_, i) => (
                            <button key={i} onClick={() => setCurrentQ(i)}
                                className={`w-3 h-3 rounded-full transition-all ${i === currentQ ? 'bg-navy scale-125' : answers[i] ? 'bg-green-soft border border-navy/20' : 'bg-ruled'}`} />
                        ))}
                    </div>

                    {currentQ < test.questions.length - 1 ? (
                        <button onClick={() => setCurrentQ(p => p + 1)}
                            className="px-5 py-2.5 rounded-xl font-body text-sm bg-navy text-cream hover:bg-navy-light transition-all hover:-translate-y-0.5">
                            Next →
                        </button>
                    ) : (
                        <button onClick={handleSubmit} disabled={!allAnswered}
                            className="px-5 py-2.5 rounded-xl font-body text-sm bg-yellow-accent text-navy font-semibold hover:bg-yellow-300 transition-all hover:-translate-y-0.5 shadow-md disabled:opacity-50">
                            Submit ✓
                        </button>
                    )}
                </div>

                {!allAnswered && currentQ === test.questions.length - 1 && (
                    <p className="text-center font-body text-xs text-navy/40 mt-3">Answer all questions to submit.</p>
                )}
            </div>
        </div>
    );
}
