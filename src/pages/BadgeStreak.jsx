import { badges, streakData } from '../data/badges';

/**
 * BadgeStreak – Badge grid with icons and streak counter.
 *
 * Props: none
 * State: none (uses placeholder data)
 *
 * Features:
 *   - Badge grid with Lucide SVG icons
 *   - Earned vs locked badge states
 *   - Streak counter with fire emoji
 *   - Weekly streak calendar
 */
export default function BadgeStreak() {
    const earnedCount = badges.filter((b) => b.earned).length;

    return (
        <div className="relative min-h-full">
            {/* Notebook background */}
            <div className="absolute inset-0 bg-ruled-lines opacity-20 pointer-events-none" aria-hidden="true" />

            <div className="relative p-6 lg:p-8 max-w-5xl mx-auto">
                {/* Header */}
                <h1 className="font-caveat text-4xl font-bold text-navy mb-2">🏅 Badges & Streaks</h1>
                <p className="font-body text-navy/60 mb-8">
                    Earn badges by completing challenges. Keep your streak alive!
                </p>

                {/* Streak Section */}
                <div className="bg-white rounded-xl shadow-card p-6 mb-8 hover:shadow-hover transition-shadow">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        {/* Fire streak counter */}
                        <div className="text-center">
                            <div className="text-6xl mb-2" aria-hidden="true">🔥</div>
                            <p className="font-caveat text-4xl font-bold text-navy">{streakData.currentStreak}</p>
                            <p className="font-body text-navy/50 text-sm">Day Streak</p>
                        </div>

                        {/* Streak details */}
                        <div className="flex-1 w-full">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <p className="font-body text-navy/60 text-sm">Longest Streak</p>
                                    <p className="font-caveat text-xl font-bold text-navy">{streakData.longestStreak} days 🏆</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-body text-navy/60 text-sm">Today</p>
                                    <p className="font-body text-sm">
                                        {streakData.todayCompleted ? (
                                            <span className="text-green-600 font-medium">✅ Completed</span>
                                        ) : (
                                            <span className="text-red-500 font-medium">⏳ Pending</span>
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* Weekly calendar */}
                            <div className="flex gap-2 justify-between">
                                {streakData.weekData.map((day) => (
                                    <div key={day.day} className="text-center flex-1">
                                        <p className="font-body text-xs text-navy/40 mb-1">{day.day}</p>
                                        <div
                                            className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center transition-colors ${day.completed
                                                    ? 'bg-green-soft text-green-800'
                                                    : 'bg-cream border border-ruled/50 text-navy/20'
                                                }`}
                                        >
                                            <span className="text-lg">{day.completed ? '🔥' : '·'}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Badges Section */}
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-caveat text-2xl font-bold text-navy">🎖️ Your Badges</h2>
                    <span className="font-body text-sm text-navy/50">
                        {earnedCount}/{badges.length} earned
                    </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {badges.map((badge, index) => (
                        <div
                            key={badge.id}
                            className={`relative bg-white rounded-xl p-5 text-center shadow-card transition-all duration-200 animate-fade-in ${badge.earned
                                    ? 'hover:shadow-hover hover:-translate-y-1 cursor-default'
                                    : 'opacity-50 grayscale'
                                }`}
                            style={{ animationDelay: `${index * 80}ms` }}
                        >
                            {/* Badge icon */}
                            <div className={`w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center ${badge.earned ? 'bg-yellow-accent/30' : 'bg-cream'
                                }`}>
                                <img
                                    src={`https://unpkg.com/lucide-static@latest/icons/${badge.icon}.svg`}
                                    alt=""
                                    width="28"
                                    height="28"
                                    className={badge.earned ? 'opacity-80' : 'opacity-30'}
                                    aria-hidden="true"
                                />
                            </div>

                            {/* Badge name */}
                            <h3 className="font-caveat text-lg font-bold text-navy mb-1">{badge.name}</h3>
                            <p className="font-body text-xs text-navy/50 leading-snug">{badge.description}</p>

                            {/* Status */}
                            {badge.earned ? (
                                <div className="mt-3 inline-block px-3 py-1 bg-green-soft/50 rounded-full">
                                    <span className="font-body text-xs text-green-800">✅ Earned</span>
                                </div>
                            ) : (
                                <div className="mt-3 inline-block px-3 py-1 bg-cream rounded-full">
                                    <span className="font-body text-xs text-navy/30">🔒 Locked</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
