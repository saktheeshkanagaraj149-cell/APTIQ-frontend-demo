import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getResultsByTeacher, getClassesByTeacher } from '../../data/classStore';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StudentAnalytics() {
    const { user } = useAuth();
    const [results, setResults] = useState([]);
    const [classes, setClasses] = useState([]);
    const [filterClass, setFilterClass] = useState('all');

    useEffect(() => {
        setResults(getResultsByTeacher(user?.email));
        setClasses(getClassesByTeacher(user?.email));
    }, [user]);

    // Group results by student
    const studentMap = {};
    results.forEach(r => {
        if (!studentMap[r.studentEmail]) {
            studentMap[r.studentEmail] = { name: r.studentName, scores: [], labels: [] };
        }
        studentMap[r.studentEmail].scores.push(r.percentage);
        studentMap[r.studentEmail].labels.push(r.testTitle);
    });

    const students = Object.values(studentMap);

    const summaryData = {
        labels: students.map(s => s.name),
        datasets: [{
            label: 'Avg Score (%)',
            data: students.map(s => Math.round(s.scores.reduce((a, b) => a + b, 0) / s.scores.length)),
            backgroundColor: students.map((_, i) => ['#b3e5fc', '#b9f6ca', '#fff176', '#f8bbd9', '#c5cae9'][i % 5]),
            borderRadius: 8,
            borderSkipped: false,
        }],
    };

    const chartOptions = {
        responsive: true,
        plugins: { legend: { display: false }, title: { display: false } },
        scales: {
            y: { beginAtZero: true, max: 100, grid: { color: '#f0ede6' }, ticks: { callback: v => v + '%' } },
            x: { grid: { display: false } },
        },
    };

    return (
        <div className="min-h-screen bg-cream p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8 animate-slide-up">
                    <h1 className="font-caveat text-4xl font-bold text-navy">📊 Student Analytics</h1>
                    <p className="font-body text-navy/60 mt-1">Track how each student is performing across all tests.</p>
                </div>

                {results.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-card p-16 text-center animate-fade-in">
                        <span className="text-6xl">📊</span>
                        <p className="font-caveat text-2xl text-navy/60 mt-4">No data yet</p>
                        <p className="font-body text-navy/40 text-sm mt-2">Analytics will appear once students complete tests.</p>
                    </div>
                ) : (
                    <>
                        {/* Overall chart */}
                        <div className="bg-white rounded-2xl shadow-card p-6 mb-6 animate-fade-in">
                            <h2 className="font-caveat text-2xl font-bold text-navy mb-4">Average Scores by Student</h2>
                            <Bar data={summaryData} options={chartOptions} />
                        </div>

                        {/* Per-student cards */}
                        <h2 className="font-caveat text-2xl font-bold text-navy mb-4">Individual Performance</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {students.map((s, i) => {
                                const avg = Math.round(s.scores.reduce((a, b) => a + b, 0) / s.scores.length);
                                return (
                                    <div key={i} className="bg-white rounded-2xl shadow-card p-5 animate-fade-in hover:shadow-hover transition-all"
                                        style={{ animationDelay: `${i * 60}ms` }}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-full bg-yellow-light flex items-center justify-center font-bold text-navy text-lg">
                                                {s.name[0]?.toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-body font-semibold text-navy">{s.name}</p>
                                                <p className="font-body text-xs text-navy/40">{s.scores.length} test{s.scores.length !== 1 ? 's' : ''} taken</p>
                                            </div>
                                            <span className={`ml-auto px-3 py-1 rounded-full text-sm font-bold font-body ${avg >= 70 ? 'bg-green-soft text-navy' : avg >= 40 ? 'bg-yellow-light text-navy' : 'bg-pink-light text-navy'}`}>
                                                {avg}%
                                            </span>
                                        </div>
                                        {/* Mini bars */}
                                        <div className="space-y-2">
                                            {s.scores.map((score, j) => (
                                                <div key={j}>
                                                    <div className="flex justify-between text-xs font-body text-navy/50 mb-1">
                                                        <span className="truncate max-w-[70%]">{s.labels[j]}</span>
                                                        <span>{score}%</span>
                                                    </div>
                                                    <div className="w-full h-2 bg-cream rounded-full overflow-hidden">
                                                        <div className="h-full rounded-full transition-all duration-700"
                                                            style={{ width: `${score}%`, background: score >= 70 ? '#b9f6ca' : score >= 40 ? '#fff176' : '#f8bbd9' }} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
