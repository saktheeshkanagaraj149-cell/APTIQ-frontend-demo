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

export default function TeacherSidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => { logout(); navigate('/auth'); };

    return (
        <aside className="w-64 min-h-[calc(100vh-4rem)] bg-navy flex flex-col py-6 px-3 shadow-xl shrink-0">
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
    );
}
