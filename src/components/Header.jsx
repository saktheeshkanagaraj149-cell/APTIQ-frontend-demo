import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Header – Top navigation bar with AptIQ logo, nav links, and CTA.
 *
 * Role-aware: Shows different navigation based on login state and user role.
 * Responsive: Hamburger menu on mobile, horizontal nav on desktop.
 */
export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const isLanding = location.pathname === '/';
    const isAuth = location.pathname === '/auth';

    const handleLogout = () => {
        logout();
        navigate('/auth');
        setMobileMenuOpen(false);
    };

    // Determine which nav links to show based on role
    const getNavLinks = () => {
        if (isLanding) {
            return [
                { type: 'anchor', href: '#features', label: 'Features' },
                { type: 'anchor', href: '#about', label: 'About' },
            ];
        }
        if (isAuth) {
            // No nav links on auth page — just logo and sign in button
            return [];
        }
        if (user?.role === 'teacher') {
            return [
                { type: 'link', to: '/teacher/dashboard', label: 'Dashboard' },
                { type: 'link', to: '/teacher/classes', label: 'Classes' },
                { type: 'link', to: '/teacher/create-test', label: 'Tests' },
            ];
        }
        if (user?.role === 'student') {
            return [
                { type: 'link', to: '/student/dashboard', label: 'Dashboard' },
                { type: 'link', to: '/student/join-class', label: 'Join Class' },
            ];
        }
        return [];
    };

    const navLinks = getNavLinks();

    return (
        <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b-2 border-ruled shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group shrink-0" aria-label="AptIQ Home">
                        <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                            <span className="text-yellow-accent font-caveat font-bold text-xl">IQ</span>
                        </div>
                        <span className="font-caveat text-2xl font-bold text-navy">
                            Apt<span className="text-yellow-accent">IQ</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-4 lg:gap-6" aria-label="Main navigation">
                        {navLinks.map((item) =>
                            item.type === 'anchor' ? (
                                <a key={item.href} href={item.href} className="font-body text-navy/70 hover:text-navy transition-colors text-sm lg:text-base">
                                    {item.label}
                                </a>
                            ) : (
                                <Link key={item.to} to={item.to}
                                    className={`font-body text-sm lg:text-base transition-colors ${location.pathname === item.to ? 'text-navy bg-highlighter-yellow px-2 py-0.5 rounded' : 'text-navy/70 hover:text-navy'}`}>
                                    {item.label}
                                </Link>
                            )
                        )}

                        {/* Auth section */}
                        {!user ? (
                            <Link
                                to="/auth"
                                className="px-5 py-2 bg-navy text-cream font-body text-sm lg:text-base rounded-lg hover:bg-navy-light transition-colors shadow-md hover:shadow-lg"
                            >
                                Sign In
                            </Link>
                        ) : (
                            <div className="flex items-center gap-3 pl-4 border-l-2 border-ruled">
                                <div className="w-8 h-8 bg-yellow-accent rounded-full flex items-center justify-center">
                                    <span className="font-caveat font-bold text-navy text-sm">{user.name?.[0]?.toUpperCase() || 'U'}</span>
                                </div>
                                <span className="font-body text-navy text-sm hidden lg:inline">{user.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="font-body text-xs text-navy/40 hover:text-red-500 transition-colors ml-1"
                                    aria-label="Sign out"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </nav>

                    {/* Mobile hamburger — hidden on auth page since no nav links */}
                    {!isAuth && (
                        <button
                            className="md:hidden p-2 text-navy hover:bg-navy/5 rounded-lg"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                            aria-expanded={mobileMenuOpen}
                            id="mobile-menu-toggle"
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
                    )}
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-ruled animate-fade-in">
                        <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
                            {navLinks.map((item) =>
                                item.type === 'anchor' ? (
                                    <a key={item.href} href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="font-body text-lg text-navy/70 hover:text-navy px-3 py-2 rounded-lg hover:bg-navy/5 transition-colors">
                                        {item.label}
                                    </a>
                                ) : (
                                    <Link key={item.to} to={item.to}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`font-body text-lg px-3 py-2 rounded-lg transition-colors ${location.pathname === item.to ? 'text-navy bg-yellow-accent/20 font-semibold' : 'text-navy/70 hover:text-navy hover:bg-navy/5'}`}>
                                        {item.label}
                                    </Link>
                                )
                            )}

                            {/* Auth action */}
                            {!user ? (
                                <Link to="/auth"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="font-body text-lg bg-navy text-cream px-4 py-2.5 rounded-lg text-center mt-2">
                                    Sign In
                                </Link>
                            ) : (
                                <div className="border-t border-ruled mt-2 pt-3 space-y-2">
                                    <div className="flex items-center gap-3 px-3">
                                        <div className="w-8 h-8 bg-yellow-accent rounded-full flex items-center justify-center">
                                            <span className="font-caveat font-bold text-navy text-sm">{user.name?.[0]?.toUpperCase() || 'U'}</span>
                                        </div>
                                        <div>
                                            <p className="font-body text-navy text-sm font-semibold">{user.name}</p>
                                            <p className="font-body text-navy/40 text-xs capitalize">{user.role}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left font-body text-sm text-red-500/70 hover:text-red-500 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors">
                                        🚪 Sign Out
                                    </button>
                                </div>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
