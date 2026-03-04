import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getClassesByTeacher, getTestsByTeacher, getResultsByTeacher, seedDemoData } from '../../data/classStore';

function StatCard({ icon, label, value, color, delay }) {
    return (
        <div className={`${color} rounded-2xl p-6 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in`}
            style={{ animationDelay: delay }}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-body text-sm text-navy/60 mb-1">{label}</p>
                    <p className="font-caveat text-4xl font-bold text-navy">{value}</p>
                </div>
                <span className="text-4xl">{icon}</span>
            </div>
        </div>
    );
}

export default function TeacherDashboard() {
    const { user } = useAuth();
    const [classes, setClasses] = useState([]);
    const [tests, setTests] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        seedDemoData();
        setClasses(getClassesByTeacher(user?.email));
        setTests(getTestsByTeacher(user?.email));
        setResults(getResultsByTeacher(user?.email));
    }, [user]);

    const avgScore = results.length
        ? Math.round(results.reduce((s, r) => s + r.percentage, 0) / results.length)
        : 0;

    const quickLinks = [
        { to: '/teacher/classes', icon: '🏫', label: 'Create / Manage Classes', color: 'bg-sky-soft/40' },
        { to: '/teacher/create-test', icon: '📝', label: 'Create New Test', color: 'bg-yellow-light/60' },
        { to: '/teacher/notes', icon: '📢', label: 'Post Notes & Updates', color: 'bg-green-soft/40' },
        { to: '/teacher/analytics', icon: '📊', label: 'View Student Analytics', color: 'bg-pink-light/40' },
        { to: '/teacher/results', icon: '🏆', label: 'Test Results', color: 'bg-yellow-light/40' },
    ];

    return (
        <div className="min-h-screen bg-cream p-6 lg:p-8">
            {/* Welcome */}
            <div className="mb-8 animate-slide-up">
                <h1 className="font-caveat text-4xl font-bold text-navy">
                    Welcome back, {user?.name || 'Teacher'} 👋
                </h1>
                <p className="font-body text-navy/60 mt-1">Here's your teaching overview for today.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard icon="🏫" label="Active Classes" value={classes.length || 0} color="bg-sky-soft/40" delay="0ms" />
                <StatCard icon="📝" label="Tests Created" value={tests.length || 0} color="bg-yellow-light/60" delay="80ms" />
                <StatCard icon="📩" label="Submissions" value={results.length || 0} color="bg-green-soft/40" delay="160ms" />
                <StatCard icon="📈" label="Avg Score" value={`${avgScore}%`} color="bg-pink-light/40" delay="240ms" />
            </div>

            {/* Quick action buttons */}
            <div className="mb-8">
                <h2 className="font-caveat text-2xl font-bold text-navy mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {quickLinks.map((item, i) => (
                        <Link key={item.to} to={item.to}
                            className={`${item.color} rounded-xl p-5 flex items-center gap-4 shadow-sm hover:shadow-card border border-white/60 transition-all duration-200 hover:-translate-y-1 animate-fade-in group`}
                            style={{ animationDelay: `${i * 60}ms` }}>
                            <span className="text-3xl group-hover:scale-110 transition-transform">{item.icon}</span>
                            <span className="font-body text-navy font-medium">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent activity */}
            {results.length > 0 && (
                <div className="bg-white rounded-2xl shadow-card p-6 animate-fade-in">
                    <h2 className="font-caveat text-2xl font-bold text-navy mb-4">🕐 Recent Submissions</h2>
                    <div className="space-y-3">
                        {results.slice(-5).reverse().map((r) => (
                            <div key={r.id} className="flex items-center justify-between py-3 border-b border-cream last:border-0">
                                <div>
                                    <p className="font-body text-navy font-medium text-sm">{r.studentName}</p>
                                    <p className="font-body text-navy/50 text-xs">{r.testTitle}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-body font-semibold ${r.percentage >= 70 ? 'bg-green-soft text-navy' : r.percentage >= 40 ? 'bg-yellow-light text-navy' : 'bg-pink-light text-navy'}`}>
                                    {r.percentage}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
