import { Link, useLocation } from 'react-router-dom';

/**
 * Sidebar – Left navigation panel with bg-spiral decoration.
 *
 * Props: none
 * State: none (relies on React Router location for active highlighting)
 *
 * Features:
 * - Spiral binding dots along left edge
 * - Navigation links with Lucide SVG icons
 * - Active route highlighting with yellow accent
 * - Notebook-margin red line decoration
 */

const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
    { path: '/learn', label: 'Learning Paths', icon: 'book-open' },
    { path: '/test', label: 'Tests', icon: 'file-text' },
    { path: '/leaderboard', label: 'Leaderboard', icon: 'trophy' },
    { path: '/analytics', label: 'Analytics', icon: 'bar-chart-2' },
    { path: '/badges', label: 'Badges & Streaks', icon: 'award' },
];

export default function Sidebar() {
    const location = useLocation();

    return (
        <aside
            className="hidden lg:flex flex-col w-64 min-h-[calc(100vh-4rem)] bg-cream border-r-2 border-ruled relative"
            aria-label="Sidebar navigation"
        >
            {/* Spiral binding decoration */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-spiral opacity-40" aria-hidden="true" />

            {/* Red margin line */}
            <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-red-300/50" aria-hidden="true" />

            {/* Nav links */}
            <nav className="flex flex-col gap-1 mt-6 pl-12 pr-4">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-body text-lg transition-all duration-200 group ${isActive
                                ? 'bg-yellow-accent/20 text-navy border-l-4 border-yellow-accent shadow-sm'
                                : 'text-navy/60 hover:text-navy hover:bg-navy/5 border-l-4 border-transparent'
                                }`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            <img
                                src={`https://unpkg.com/lucide-static@latest/icons/${item.icon}.svg`}
                                alt=""
                                width="20"
                                height="20"
                                className={`transition-transform group-hover:scale-110 ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-80'}`}
                                aria-hidden="true"
                            />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom decorative section */}
            <div className="mt-auto p-4 pl-12">
                <div className="bg-yellow-light/50 rounded-lg p-4 shadow-sticky transform -rotate-1">
                    <p className="font-caveat text-navy text-lg">📝 Tip of the day</p>
                    <p className="font-body text-navy/70 text-sm mt-1">
                        Break complex problems into smaller steps. Practice daily!
                    </p>
                </div>
            </div>
        </aside>
    );
}
