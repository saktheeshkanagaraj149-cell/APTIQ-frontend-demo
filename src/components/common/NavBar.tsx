import { Link, useLocation } from 'react-router-dom';

/**
 * NavBar – Top navigation bar for the AptIQ dashboard.
 * Displays logo, navigation links, and user avatar.
 * Adapts between landing-page mode and app mode based on current route.
 *
 * @param className - Additional Tailwind classes for extensibility
 * @param userName - Display name for the avatar (default: 'You')
 * @param userInitial - Single character for avatar circle (default: 'Y')
 */

interface NavBarProps {
    className?: string;
    userName?: string;
    userInitial?: string;
}

interface NavLink {
    path: string;
    label: string;
}

const appLinks: NavLink[] = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/learn', label: 'Learn' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/analytics', label: 'Analytics' },
    { path: '/badges', label: 'Badges' },
];

export function NavBar({
    className = '',
    userName = 'You',
    userInitial = 'Y',
}: NavBarProps) {
    const location = useLocation();
    const isLanding = location.pathname === '/';

    return (
        <header
            className={`sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b-2 border-ruled shadow-sm ${className}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 group"
                        aria-label="AptIQ Home"
                    >
                        <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                            <span className="text-yellow-accent font-caveat font-bold text-xl">
                                IQ
                            </span>
                        </div>
                        <span className="font-caveat text-2xl font-bold text-navy">
                            Apt<span className="text-yellow-accent">IQ</span>
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav
                        className="hidden md:flex items-center gap-6"
                        aria-label="Main navigation"
                    >
                        {isLanding ? (
                            <>
                                <a
                                    href="#features"
                                    className="font-body text-navy/70 hover:text-navy transition-colors"
                                >
                                    Features
                                </a>
                                <a
                                    href="#about"
                                    className="font-body text-navy/70 hover:text-navy transition-colors"
                                >
                                    About
                                </a>
                                <Link
                                    to="/auth"
                                    className="px-5 py-2 bg-navy text-cream font-body text-base rounded-lg hover:bg-navy-light transition-colors shadow-md hover:shadow-lg"
                                >
                                    Sign In
                                </Link>
                            </>
                        ) : (
                            <>
                                {appLinks.map((link) => {
                                    const isActive = location.pathname === link.path;
                                    return (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            className={`font-body text-base transition-colors ${isActive
                                                    ? 'text-navy bg-highlighter-yellow font-semibold'
                                                    : 'text-navy/70 hover:text-navy'
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}
                                <div className="flex items-center gap-2 pl-4 border-l-2 border-ruled">
                                    <div className="w-8 h-8 bg-yellow-accent rounded-full flex items-center justify-center">
                                        <span className="font-caveat font-bold text-navy text-sm">
                                            {userInitial}
                                        </span>
                                    </div>
                                    <span className="font-body text-navy text-sm">
                                        {userName}
                                    </span>
                                </div>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
