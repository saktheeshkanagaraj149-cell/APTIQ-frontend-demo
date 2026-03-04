import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
    { path: '/teacher/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/teacher/classes', label: 'My Classes', icon: '🏫' },
    { path: '/teacher/create-test', label: 'Create Test', icon: '📝' },
    { path: '/teacher/notes', label: 'Notes & Updates', icon: '📢' },
    { path: '/teacher/analytics', label: 'Student Analytics', icon: '📊' },
    { path: '/teacher/results', label: 'Test Results', icon: '🏆' },
];

export default function TeacherSidebar({ isOpen, onClose }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => { logout(); navigate('/auth'); };

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm animate-fade-in"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-50
                w-64 min-h-[calc(100vh-4rem)] bg-navy flex flex-col py-6 px-3 shadow-xl shrink-0
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0
            `}>
                {/* Close button (mobile only) */}
                <button
                    onClick={onClose}
                    className="md:hidden absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-cream/70 hover:text-cream hover:bg-white/10 transition-colors"
                    aria-label="Close sidebar"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                {/* Teacher Profile */}
                <div className="px-3 pb-6 border-b border-white/10 mb-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-accent flex items-center justify-center text-navy font-bold text-xl mb-2">
                        {user?.name?.[0]?.toUpperCase() || 'T'}
                    </div>
                    <p className="text-cream font-body font-semibold text-sm truncate">{user?.name || 'Teacher'}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-green-soft/20 text-green-soft text-xs rounded-full font-body">👨‍🏫 Teacher</span>
                </div>

                {/* Nav */}
                <nav className="flex-1 space-y-1">
                    {navItems.map((item) => {
                        const active = location.pathname === item.path;
                        return (
                            <Link key={item.path} to={item.path}
                                onClick={onClose}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm transition-all duration-200 ${active
                                    ? 'bg-yellow-accent text-navy font-semibold shadow-md'
                                    : 'text-cream/70 hover:bg-white/10 hover:text-cream'}`}>
                                <span className="text-lg">{item.icon}</span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <button onClick={handleLogout}
                    className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm text-cream/50 hover:bg-white/10 hover:text-red-400 transition-all duration-200">
                    <span className="text-lg">🚪</span> Sign Out
                </button>
            </aside>
        </>
    );
}
