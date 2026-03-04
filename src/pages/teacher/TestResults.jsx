import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getResultsByTeacher } from '../../data/classStore';

export default function TestResults() {
    const { user } = useAuth();
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        setResults(getResultsByTeacher(user?.email));
    }, [user]);

    const filtered = [...results]
        .filter(r => r.studentName.toLowerCase().includes(search.toLowerCase()) || r.testTitle.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === 'newest') return new Date(b.submittedAt) - new Date(a.submittedAt);
            if (sortBy === 'score-high') return b.percentage - a.percentage;
            if (sortBy === 'score-low') return a.percentage - b.percentage;
            return 0;
        });

    const avg = results.length ? Math.round(results.reduce((s, r) => s + r.percentage, 0) / results.length) : 0;
    const passed = results.filter(r => r.percentage >= 60).length;

    return (
        <div className="min-h-screen bg-cream p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8 animate-slide-up">
                    <h1 className="font-caveat text-4xl font-bold text-navy">🏆 Test Results</h1>
                    <p className="font-body text-navy/60 mt-1">All student submissions across your tests.</p>
                </div>

                {/* Summary stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {[
                        { label: 'Total Submissions', value: results.length, icon: '📩', color: 'bg-sky-soft/40' },
                        { label: 'Avg Score', value: `${avg}%`, icon: '📈', color: 'bg-yellow-light/60' },
                        { label: 'Passed (≥60%)', value: passed, icon: '✅', color: 'bg-green-soft/40' },
                    ].map((s, i) => (
                        <div key={i} className={`${s.color} rounded-2xl p-4 text-center animate-fade-in`} style={{ animationDelay: `${i * 60}ms` }}>
                            <span className="text-2xl">{s.icon}</span>
                            <p className="font-caveat text-3xl font-bold text-navy mt-1">{s.value}</p>
                            <p className="font-body text-xs text-navy/50">{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Search & sort */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-fade-in">
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by student or test..."
                        className="flex-1 px-4 py-2.5 bg-white border-2 border-ruled rounded-xl font-body text-navy focus:outline-none focus:border-yellow-accent text-sm transition-colors" />
                    <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                        className="px-4 py-2.5 bg-white border-2 border-ruled rounded-xl font-body text-navy focus:outline-none focus:border-yellow-accent text-sm transition-colors">
                        <option value="newest">Newest First</option>
                        <option value="score-high">Score: High to Low</option>
                        <option value="score-low">Score: Low to High</option>
                    </select>
                </div>

                {results.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-card p-16 text-center animate-fade-in">
                        <span className="text-6xl">📊</span>
                        <p className="font-caveat text-2xl text-navy/60 mt-4">No submissions yet</p>
                        <p className="font-body text-navy/40 text-sm mt-2">Results will appear once students complete your tests.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-card overflow-hidden animate-fade-in">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-navy/5 border-b border-ruled">
                                    <tr>
                                        {['Student', 'Test', 'Score', 'Time', 'Date', 'Grade'].map(h => (
                                            <th key={h} className="px-4 py-3 text-left font-body text-xs font-semibold text-navy/60 uppercase tracking-wide">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-cream">
                                    {filtered.map((r, i) => (
                                        <tr key={r.id} className="hover:bg-cream/50 transition-colors animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full bg-yellow-light flex items-center justify-center text-navy text-xs font-bold shrink-0">
                                                        {r.studentName[0]?.toUpperCase()}
                                                    </div>
                                                    <span className="font-body text-sm text-navy font-medium">{r.studentName}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 font-body text-sm text-navy/70 max-w-[160px] truncate">{r.testTitle}</td>
                                            <td className="px-4 py-3 font-body text-sm text-navy font-semibold">{r.score}/{r.total}</td>
                                            <td className="px-4 py-3 font-body text-xs text-navy/50">{r.timeTaken || '—'}</td>
                                            <td className="px-4 py-3 font-body text-xs text-navy/40">{new Date(r.submittedAt).toLocaleDateString()}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-body font-bold ${r.percentage >= 70 ? 'bg-green-soft text-navy' : r.percentage >= 40 ? 'bg-yellow-light text-navy' : 'bg-pink-light text-navy'}`}>
                                                    {r.percentage}%
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {filtered.length === 0 && (
                            <p className="text-center font-body text-navy/40 py-8 text-sm">No results match your search.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
