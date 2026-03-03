import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getTestsForStudent, getResultsByStudent, getEnrollmentsByStudent, getAllClasses, getNotesForStudent } from '../../data/classStore';

export default function StudentDashboard() {
    const { user } = useAuth();
    const [tests, setTests] = useState([]);
    const [results, setResults] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        setTests(getTestsForStudent(user?.email));
        setResults(getResultsByStudent(user?.email));
        setEnrollments(getEnrollmentsByStudent(user?.email));
        setNotes(getNotesForStudent(user?.email));
    }, [user]);

    const allClasses = getAllClasses();
    const myClasses = allClasses.filter(c => enrollments.some(e => e.classId === c.id));

    const takenTestIds = new Set(results.map(r => r.testId));
    const pendingTests = tests.filter(t => !takenTestIds.has(t.id));
    const completedTests = tests.filter(t => takenTestIds.has(t.id));
    const avgScore = results.length ? Math.round(results.reduce((s, r) => s + r.percentage, 0) / results.length) : 0;

    return (
        <div className="min-h-screen bg-cream p-6 lg:p-8">
            {/* Welcome */}
            <div className="mb-8 animate-slide-up">
                <h1 className="font-caveat text-4xl font-bold text-navy">Hey, {user?.name || 'Student'} 👋</h1>
                <p className="font-body text-navy/60 mt-1">Ready to learn something new today?</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { icon: '🏫', label: 'Classes Joined', value: myClasses.length, color: 'bg-sky-soft/40' },
                    { icon: '📝', label: 'Tests Available', value: pendingTests.length, color: 'bg-yellow-light/60' },
                    { icon: '✅', label: 'Tests Completed', value: completedTests.length, color: 'bg-green-soft/40' },
                    { icon: '📈', label: 'Avg Score', value: `${avgScore}%`, color: 'bg-pink-light/40' },
                ].map((s, i) => (
                    <div key={i} className={`${s.color} rounded-2xl p-5 shadow-sm hover:shadow-card transition-all hover:-translate-y-1 animate-fade-in`}
                        style={{ animationDelay: `${i * 70}ms` }}>
                        <span className="text-3xl">{s.icon}</span>
                        <p className="font-caveat text-3xl font-bold text-navy mt-2">{s.value}</p>
                        <p className="font-body text-xs text-navy/60">{s.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Tests */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Pending tests */}
                    <div className="animate-fade-in">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-caveat text-2xl font-bold text-navy">📝 Pending Tests</h2>
                            <Link to="/student/join-class" className="text-sm font-body text-navy/50 hover:text-navy transition-colors">+ Join a class</Link>
                        </div>
                        {enrollments.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-card p-8 text-center">
                                <span className="text-4xl">🔗</span>
                                <p className="font-caveat text-xl text-navy/60 mt-3">No classes yet</p>
                                <Link to="/student/join-class" className="mt-3 inline-block px-5 py-2 bg-navy text-cream rounded-xl font-body text-sm hover:bg-navy-light transition-all">
                                    Join a Class →
                                </Link>
                            </div>
                        ) : pendingTests.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-card p-8 text-center">
                                <span className="text-4xl">🎉</span>
                                <p className="font-caveat text-xl text-navy/60 mt-3">All caught up!</p>
                                <p className="font-body text-navy/40 text-sm mt-1">No pending tests right now.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {pendingTests.map((t, i) => (
                                    <div key={t.id} className="bg-white rounded-2xl shadow-card p-5 flex items-center justify-between hover:shadow-hover transition-all animate-fade-in"
                                        style={{ animationDelay: `${i * 60}ms` }}>
                                        <div>
                                            <h3 className="font-body font-semibold text-navy">{t.title}</h3>
                                            <p className="font-body text-xs text-navy/40 mt-0.5">{t.questions.length} questions</p>
                                        </div>
                                        <Link to={`/student/test/${t.id}`}
                                            className="px-4 py-2 bg-navy text-cream rounded-xl font-body text-sm hover:bg-navy-light transition-all hover:-translate-y-0.5 shadow-sm shrink-0">
                                            Start →
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Recent results */}
                    {results.length > 0 && (
                        <div className="animate-fade-in">
                            <h2 className="font-caveat text-2xl font-bold text-navy mb-4">🏆 Recent Results</h2>
                            <div className="space-y-3">
                                {[...results].reverse().slice(0, 4).map((r, i) => (
                                    <div key={r.id} className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-navy text-sm font-body ${r.percentage >= 70 ? 'bg-green-soft' : r.percentage >= 40 ? 'bg-yellow-light' : 'bg-pink-light'}`}>
                                            {r.percentage}%
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-body text-sm text-navy font-medium truncate">{r.testTitle}</p>
                                            <p className="font-body text-xs text-navy/40">{r.score}/{r.total} correct</p>
                                        </div>
                                        <span className="font-body text-xs text-navy/30 shrink-0">{new Date(r.submittedAt).toLocaleDateString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Notes */}
                <div className="space-y-4">
                    <h2 className="font-caveat text-2xl font-bold text-navy">📢 Class Notes</h2>
                    {notes.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-card p-6 text-center animate-fade-in">
                            <span className="text-3xl">📝</span>
                            <p className="font-body text-navy/40 text-sm mt-2">No notes from teachers yet.</p>
                        </div>
                    ) : (
                        notes.slice(0, 5).map((n, i) => (
                            <div key={n.id} className="bg-white rounded-2xl shadow-card p-4 border-l-4 border-yellow-accent animate-fade-in"
                                style={{ animationDelay: `${i * 60}ms` }}>
                                <p className="font-body text-sm font-semibold text-navy">{n.title}</p>
                                <p className="font-body text-xs text-navy/60 mt-1 line-clamp-2">{n.content}</p>
                                <p className="font-body text-xs text-navy/30 mt-2">{n.teacherName} · {new Date(n.postedAt).toLocaleDateString()}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
