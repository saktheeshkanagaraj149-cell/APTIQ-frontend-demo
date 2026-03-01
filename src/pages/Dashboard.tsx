import { Link } from 'react-router-dom';
import { NotebookBackground } from '../components/common/NotebookBackground';
import { LeaderboardCard } from '../components/dashboard/LeaderboardCard';
import { ScoreAnalyticsCard } from '../components/dashboard/ScoreAnalyticsCard';
import { leaderboardEntries } from '../data/leaderboard';
import { learningPaths } from '../data/lessons';
import ParticleFieldBg from '../components/three/ParticleFieldBg';

/**
 * Dashboard – Main dashboard page composed of reusable TypeScript components.
 *
 * Uses:
 *   - NotebookBackground: ruled-lines wrapper
 *   - LeaderboardCard: top-5 students list
 *   - ScoreAnalyticsCard: per-subject accuracy + time
 */

const analyticsData = [
    { subject: 'Quantitative', accuracy: 78, timeTaken: '45s', barColor: 'bg-yellow-accent', icon: 'calculator' },
    { subject: 'Logical Reasoning', accuracy: 65, timeTaken: '52s', barColor: 'bg-sky-soft', icon: 'brain' },
    { subject: 'Verbal Ability', accuracy: 52, timeTaken: '38s', barColor: 'bg-pink-light', icon: 'book-open' },
    { subject: 'Data Interpretation', accuracy: 40, timeTaken: '1m 05s', barColor: 'bg-green-soft', icon: 'bar-chart-2' },
];

export default function Dashboard() {
    const currentUser = leaderboardEntries.find((e) => e.isCurrentUser);
    const top5 = leaderboardEntries.slice(0, 5);

    return (
        <NotebookBackground>
            {/* Three.js particle field background */}
            <ParticleFieldBg />

            <div className="relative z-10 p-6 lg:p-8 max-w-7xl mx-auto">
                {/* Welcome header */}
                <div className="mb-8">
                    <h1 className="font-caveat text-4xl font-bold text-navy">
                        Welcome back! 👋
                    </h1>
                    <p className="font-body text-navy/60 mt-1">
                        Keep up the momentum — you&apos;re on a roll!
                    </p>
                </div>

                {/* Top stats row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Current Rank', value: `#${currentUser?.rank || 7}`, icon: '🏅', bg: 'bg-yellow-light/50' },
                        { label: 'Total Score', value: currentUser?.score?.toLocaleString() || '2,350', icon: '⭐', bg: 'bg-sky-soft/30' },
                        { label: 'Daily Streak', value: '12 days', icon: '🔥', bg: 'bg-pink-light/30' },
                        { label: 'Tests Taken', value: '47', icon: '📝', bg: 'bg-green-soft/30' },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className={`${stat.bg} rounded-xl p-5 shadow-sm hover:shadow-card transition-shadow border border-white/50`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-body text-sm text-navy/60">{stat.label}</p>
                                    <p className="font-caveat text-3xl font-bold text-navy mt-1">{stat.value}</p>
                                </div>
                                <span className="text-3xl" aria-hidden="true">{stat.icon}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Left column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-navy rounded-xl p-6 shadow-lg text-cream relative overflow-hidden">
                            <div className="absolute top-0 right-0 text-8xl opacity-5 font-caveat select-none" aria-hidden="true">IQ</div>
                            <h3 className="font-caveat text-2xl font-bold mb-2">Ready for a challenge? 🎯</h3>
                            <p className="font-body text-cream/70 mb-4">
                                Take a quick 10-question mixed aptitude test and boost your score.
                            </p>
                            <Link
                                to="/test"
                                className="inline-block px-6 py-3 bg-yellow-accent text-navy font-body font-semibold text-base rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                            >
                                Start Quick Test →
                            </Link>
                        </div>

                        <div>
                            <h3 className="font-caveat text-2xl font-bold text-navy mb-4">📚 Your Learning Paths</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {learningPaths.map((path) => (
                                    <Link
                                        key={path.id}
                                        to="/learn"
                                        className={`group ${path.color}/30 rounded-xl p-5 shadow-sm hover:shadow-card border border-white/50 transition-all duration-200 hover:-translate-y-1`}
                                    >
                                        <div className="flex items-center gap-2 mb-3">
                                            <img src={`https://unpkg.com/lucide-static@latest/icons/${path.icon}.svg`} alt="" width="20" height="20" className="opacity-60" aria-hidden="true" />
                                            <h4 className="font-caveat text-xl font-bold text-navy">{path.title}</h4>
                                        </div>
                                        <div className="mb-2">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-body text-navy/60">{path.completedChapters}/{path.totalChapters} chapters</span>
                                                <span className="font-caveat font-bold text-navy">{path.progress}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-white/70 rounded-full overflow-hidden">
                                                <div className="h-full bg-navy/60 rounded-full transition-all duration-500" style={{ width: `${path.progress}%` }} role="progressbar" aria-valuenow={path.progress} aria-valuemin={0} aria-valuemax={100} />
                                            </div>
                                        </div>
                                        <p className="font-body text-xs text-navy/40 group-hover:text-navy/60 transition-colors">Continue learning →</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-card p-6 hover:shadow-hover transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-caveat text-2xl font-bold text-navy">🏆 Leaderboard</h3>
                                <Link to="/leaderboard" className="font-body text-sm text-navy/50 hover:text-navy transition-colors">View All →</Link>
                            </div>
                            <div className="space-y-1" role="list" aria-label="Top 5 students">
                                {top5.map((entry) => (
                                    <LeaderboardCard
                                        key={entry.rank}
                                        studentName={entry.name}
                                        rank={entry.rank}
                                        score={entry.score}
                                        badgeColor={entry.avatarColor}
                                        college={entry.college}
                                        isCurrentUser={entry.isCurrentUser}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-caveat text-2xl font-bold text-navy">📊 Score Analytics</h3>
                                <Link to="/analytics" className="font-body text-sm text-navy/50 hover:text-navy transition-colors">Full Report →</Link>
                            </div>
                            <div className="space-y-3">
                                {analyticsData.map((item) => (
                                    <ScoreAnalyticsCard key={item.subject} subject={item.subject} accuracy={item.accuracy} timeTaken={item.timeTaken} barColor={item.barColor} icon={item.icon} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NotebookBackground>
    );
}
