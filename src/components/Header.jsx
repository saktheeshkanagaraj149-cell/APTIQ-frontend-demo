import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Header – Top navigation bar with AptIQ logo, nav links, and CTA.
 *
 * Props: none
 * State: mobileMenuOpen – toggles hamburger menu on mobile
 *
 * Notebook aesthetic: ruled-line bottom border, cream background, handwritten logo.
 */
export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isLanding = location.pathname === '/';

    return (
        <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b-2 border-ruled shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group" aria-label="AptIQ Home">
                        <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                            <span className="text-yellow-accent font-caveat font-bold text-xl">IQ</span>
                        </div>
                        <span className="font-caveat text-2xl font-bold text-navy">
                            Apt<span className="text-yellow-accent">IQ</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
                        {isLanding ? (
                            <>
                                <a href="#features" className="font-body text-navy/70 hover:text-navy transition-colors">
                                    Features
                                </a>
                                <a href="#about" className="font-body text-navy/70 hover:text-navy transition-colors">
                                    About
                                </a>
                                <Link
                                    to="/auth"
                                    className="px-5 py-2 bg-navy text-cream font-body text-lg rounded-lg hover:bg-navy-light transition-colors shadow-md hover:shadow-lg"
                                >
                                    Sign In
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/dashboard"
                                    className={`font-body text-lg transition-colors ${location.pathname === '/dashboard' ? 'text-navy bg-highlighter-yellow' : 'text-navy/70 hover:text-navy'
                                        }`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/learn"
                                    className={`font-body text-lg transition-colors ${location.pathname === '/learn' ? 'text-navy bg-highlighter-yellow' : 'text-navy/70 hover:text-navy'
                                        }`}
                                >
                                    Learn
                                </Link>
                                <Link
                                    to="/leaderboard"
                                    className={`font-body text-lg transition-colors ${location.pathname === '/leaderboard' ? 'text-navy bg-highlighter-yellow' : 'text-navy/70 hover:text-navy'
                                        }`}
                                >
                                    Leaderboard
                                </Link>
                                <div className="flex items-center gap-2 pl-4 border-l-2 border-ruled">
                                    <div className="w-8 h-8 bg-yellow-accent rounded-full flex items-center justify-center">
                                        <span className="font-caveat font-bold text-navy text-sm">Y</span>
                                    </div>
                                    <span className="font-body text-navy text-sm">You</span>
                                </div>
                            </>
                        )}
                    </nav>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden p-2 text-navy hover:bg-navy/5 rounded-lg"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={mobileMenuOpen}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {mobileMenuOpen ? (
                                <path d="M18 6L6 18M6 6l12 12" />
                            ) : (
                                <>
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="3" y1="12" x2="21" y2="12" />
                                    <line x1="3" y1="18" x2="21" y2="18" />
                                </>
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-ruled animate-fade-in">
                        <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
                            {isLanding ? (
                                <>
                                    <a href="#features" className="font-body text-lg text-navy/70 hover:text-navy px-2 py-1">Features</a>
                                    <a href="#about" className="font-body text-lg text-navy/70 hover:text-navy px-2 py-1">About</a>
                                    <Link to="/auth" className="font-body text-lg bg-navy text-cream px-4 py-2 rounded-lg text-center mt-2">Sign In</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/dashboard" className="font-body text-lg text-navy/70 hover:text-navy px-2 py-1" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                                    <Link to="/learn" className="font-body text-lg text-navy/70 hover:text-navy px-2 py-1" onClick={() => setMobileMenuOpen(false)}>Learn</Link>
                                    <Link to="/test" className="font-body text-lg text-navy/70 hover:text-navy px-2 py-1" onClick={() => setMobileMenuOpen(false)}>Tests</Link>
                                    <Link to="/leaderboard" className="font-body text-lg text-navy/70 hover:text-navy px-2 py-1" onClick={() => setMobileMenuOpen(false)}>Leaderboard</Link>
                                    <Link to="/analytics" className="font-body text-lg text-navy/70 hover:text-navy px-2 py-1" onClick={() => setMobileMenuOpen(false)}>Analytics</Link>
                                    <Link to="/badges" className="font-body text-lg text-navy/70 hover:text-navy px-2 py-1" onClick={() => setMobileMenuOpen(false)}>Badges</Link>
                                </>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
