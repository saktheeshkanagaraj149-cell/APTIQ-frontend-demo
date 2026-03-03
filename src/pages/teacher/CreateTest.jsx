import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createTest, getClassesByTeacher, getTestsByTeacher } from '../../data/classStore';

/**
 * Parses a raw text block into structured questions.
 *
 * Supported format:
 *   Q1. What is 15% of 200?
 *   A. 25
 *   B. 30
 *   C. 35
 *   D. 40
 *   Correct: B
 *
 *   Q2. ...
 */
function parseQuestions(raw) {
    const questions = [];
    const blocks = raw.trim().split(/\n\s*\n/); // split on blank lines

    for (const block of blocks) {
        const lines = block.trim().split('\n').map(l => l.trim()).filter(Boolean);
        if (lines.length < 6) continue; // need at least Q + 4 opts + correct

        const questionLine = lines.find(l => /^Q\d*[\.\):]?\s+/i.test(l) || (!l.match(/^[A-D][\.\):]|^Correct:/i) && lines.indexOf(l) === 0));
        if (!questionLine) continue;

        const question = questionLine.replace(/^Q\d*[\.\):]?\s*/i, '').trim();

        const options = [];
        const optMap = {}; // 'A' -> text
        for (const line of lines) {
            const m = line.match(/^([A-D])[\.\):\s]\s*(.+)/i);
            if (m) {
                optMap[m[1].toUpperCase()] = m[2].trim();
                options.push(m[2].trim());
            }
        }
        if (options.length !== 4) continue;

        const correctLine = lines.find(l => /^correct[\s:]/i.test(l));
        if (!correctLine) continue;
        const correctKey = correctLine.replace(/^correct[\s:]*/i, '').trim().toUpperCase().charAt(0);
        const correctText = optMap[correctKey];
        if (!correctText) continue;

        questions.push({ question, options, correct: correctText });
    }
    return questions;
}

const EXAMPLE = `Q1. What is 15% of 200?
A. 25
B. 30
C. 35
D. 40
Correct: B

Q2. A train travels 360 km in 4 hours. What is its speed?
A. 80 km/h
B. 90 km/h
C. 95 km/h
D. 100 km/h
Correct: B

Q3. If 8 men complete a task in 12 days, how many days for 16 men?
A. 4
B. 6
C. 8
D. 10
Correct: B`;

export default function CreateTest() {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [classId, setClassId] = useState('');
    const [rawText, setRawText] = useState('');
    const [classes, setClasses] = useState([]);
    const [tests, setTests] = useState([]);
    const [preview, setPreview] = useState([]);
    const [parseError, setParseError] = useState('');
    const [success, setSuccess] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const cls = getClassesByTeacher(user?.email);
        setClasses(cls);
        if (cls.length > 0) setClassId(cls[0].id);
        setTests(getTestsByTeacher(user?.email));
    }, [user]);

    // Live parse on text change
    useEffect(() => {
        if (!rawText.trim()) { setPreview([]); setParseError(''); return; }
        const parsed = parseQuestions(rawText);
        if (parsed.length === 0) {
            setParseError('No valid questions found. Follow the format shown in the guide.');
        } else {
            setParseError('');
        }
        setPreview(parsed);
    }, [rawText]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (preview.length === 0) { setParseError('Please add at least one valid question.'); return; }
        setSaving(true);
        setTimeout(() => {
            createTest({ title, classId, teacherEmail: user?.email, questions: preview });
            setTests(getTestsByTeacher(user?.email));
            setTitle(''); setRawText(''); setPreview([]);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
            setSaving(false);
        }, 400);
    };

    const loadExample = () => setRawText(EXAMPLE);

    return (
        <div className="min-h-screen bg-cream p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8 animate-slide-up">
                    <h1 className="font-caveat text-4xl font-bold text-navy">📝 Create Test</h1>
                    <p className="font-body text-navy/60 mt-1">
                        Paste all your questions and answers in one text block — we'll parse them automatically.
                    </p>
                </div>

                {success && (
                    <div className="mb-6 px-5 py-4 bg-green-soft/50 border border-green-soft rounded-2xl font-body text-navy animate-fade-in flex items-center gap-3">
                        <span className="text-2xl">✅</span> Test published successfully!
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left: Input */}
                    <div className="space-y-5">
                        {/* Format guide */}
                        <div className="bg-navy/5 border border-ruled rounded-2xl p-5 animate-fade-in">
                            <p className="font-body text-sm font-semibold text-navy mb-2">📋 Format Guide</p>
                            <pre className="font-mono text-xs text-navy/70 whitespace-pre-wrap leading-relaxed">
                                {`Q1. Your question here?
A. Option one
B. Option two
C. Option three
D. Option four
Correct: A

Q2. Next question...`}
                            </pre>
                            <button onClick={loadExample} type="button"
                                className="mt-3 text-xs font-body text-navy/50 underline underline-offset-2 hover:text-navy transition-colors">
                                Load example →
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Title */}
                            <div className="animate-fade-in">
                                <label className="block font-body text-navy/80 text-sm mb-1.5">Test Title *</label>
                                <input value={title} onChange={e => setTitle(e.target.value)} required
                                    placeholder="e.g. Quantitative Aptitude Quiz 2"
                                    className="w-full px-4 py-3 bg-white border-2 border-ruled rounded-xl font-body text-navy placeholder:text-navy/30 focus:outline-none focus:border-yellow-accent transition-colors" />
                            </div>

                            {/* Class */}
                            <div className="animate-fade-in">
                                <label className="block font-body text-navy/80 text-sm mb-1.5">Assign to Class *</label>
                                {classes.length === 0 ? (
                                    <p className="text-sm text-navy/40 font-body">No classes yet — <a href="/teacher/classes" className="underline text-navy">create one first</a>.</p>
                                ) : (
                                    <select value={classId} onChange={e => setClassId(e.target.value)} required
                                        className="w-full px-4 py-3 bg-white border-2 border-ruled rounded-xl font-body text-navy focus:outline-none focus:border-yellow-accent transition-colors">
                                        {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                )}
                            </div>

                            {/* Big text area */}
                            <div className="animate-fade-in">
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="block font-body text-navy/80 text-sm">Questions & Answers *</label>
                                    {rawText && (
                                        <span className={`text-xs font-body px-2 py-0.5 rounded-full ${preview.length > 0 ? 'bg-green-soft text-navy' : 'bg-pink-light text-navy'}`}>
                                            {preview.length > 0 ? `✅ ${preview.length} question${preview.length > 1 ? 's' : ''} detected` : '❌ No valid questions'}
                                        </span>
                                    )}
                                </div>
                                <textarea
                                    value={rawText}
                                    onChange={e => setRawText(e.target.value)}
                                    rows={18}
                                    placeholder={`Q1. What is 15% of 200?\nA. 25\nB. 30\nC. 35\nD. 40\nCorrect: B\n\nQ2. Next question here...`}
                                    className="w-full px-4 py-3 bg-white border-2 border-ruled rounded-xl font-body text-sm text-navy placeholder:text-navy/25 resize-none focus:outline-none focus:border-yellow-accent transition-colors leading-relaxed"
                                />
                                {parseError && (
                                    <p className="mt-2 text-xs text-red-500 font-body animate-fade-in">⚠️ {parseError}</p>
                                )}
                            </div>

                            <button type="submit" disabled={saving || preview.length === 0 || classes.length === 0}
                                className="w-full py-3 bg-navy text-cream font-body text-lg rounded-xl hover:bg-navy-light transition-all hover:-translate-y-0.5 shadow-md disabled:opacity-40 disabled:cursor-not-allowed">
                                {saving ? '⏳ Saving...' : `🚀 Publish Test (${preview.length} Q${preview.length !== 1 ? 's' : ''})`}
                            </button>
                        </form>
                    </div>

                    {/* Right: Live Preview */}
                    <div className="animate-fade-in">
                        <h2 className="font-caveat text-2xl font-bold text-navy mb-4">
                            👁️ Live Preview
                            {preview.length > 0 && <span className="text-base font-body font-normal text-navy/50 ml-2">({preview.length} questions)</span>}
                        </h2>

                        {preview.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-card p-10 text-center sticky top-6">
                                <span className="text-4xl opacity-40">📄</span>
                                <p className="font-caveat text-xl text-navy/40 mt-3">Type questions on the left</p>
                                <p className="font-body text-xs text-navy/30 mt-1">Preview will appear here as you type.</p>
                            </div>
                        ) : (
                            <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
                                {preview.map((q, qi) => (
                                    <div key={qi}
                                        className="bg-white rounded-2xl shadow-card p-5 border-l-4 border-yellow-accent animate-fade-in"
                                        style={{ animationDelay: `${qi * 40}ms` }}>
                                        {/* Question */}
                                        <p className="font-body font-semibold text-navy text-sm mb-3">
                                            <span className="inline-block w-6 h-6 rounded-full bg-navy text-cream text-xs flex items-center justify-center mr-2 shrink-0 font-bold" style={{ display: 'inline-flex' }}>{qi + 1}</span>
                                            {q.question}
                                        </p>

                                        {/* Options */}
                                        <div className="space-y-1.5">
                                            {q.options.map((opt, oi) => {
                                                const isCorrect = opt === q.correct;
                                                return (
                                                    <div key={oi}
                                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-body transition-all ${isCorrect ? 'bg-green-soft/60 border border-green-soft font-semibold text-navy' : 'bg-cream/60 text-navy/70'}`}>
                                                        <span className={`font-mono text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isCorrect ? 'bg-navy text-cream' : 'bg-ruled/60 text-navy/50'}`}>
                                                            {'ABCD'[oi]}
                                                        </span>
                                                        {opt}
                                                        {isCorrect && <span className="ml-auto text-xs text-green-600 font-body">✓ Correct</span>}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Existing Tests */}
                {tests.length > 0 && (
                    <div className="mt-10 animate-fade-in">
                        <h2 className="font-caveat text-2xl font-bold text-navy mb-4">Your Tests ({tests.length})</h2>
                        <div className="space-y-3">
                            {tests.map((t, i) => (
                                <div key={t.id}
                                    className="bg-white rounded-xl shadow-card p-5 flex items-center justify-between animate-fade-in"
                                    style={{ animationDelay: `${i * 50}ms` }}>
                                    <div>
                                        <h3 className="font-body text-navy font-semibold">{t.title}</h3>
                                        <p className="font-body text-navy/40 text-xs mt-0.5">
                                            {t.questions.length} question{t.questions.length !== 1 ? 's' : ''} · Created {new Date(t.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className="px-3 py-1 bg-yellow-light/60 border border-yellow-accent/30 text-navy text-xs rounded-full font-body">Active</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
