import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WaveGridBg from '../components/three/WaveGridBg';
import { useAuth } from '../context/AuthContext';

export default function AuthForm() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'student' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (isSignUp && formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }
        const user = { name: formData.name || formData.email.split('@')[0], email: formData.email, role: formData.role };
        login(user);
        navigate(formData.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard');
    };

    const EyeIcon = ({ show }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {show ? (
                <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></>
            ) : (
                <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
            )}
        </svg>
    );

    return (
        <div className="min-h-screen bg-cream bg-ruled-lines flex items-center justify-center p-4 relative">
            <WaveGridBg />
            <div className="absolute top-10 left-10 text-5xl opacity-10 select-none -rotate-12" aria-hidden>📝</div>
            <div className="absolute bottom-10 right-10 text-5xl opacity-10 select-none rotate-12" aria-hidden>✏️</div>
            <div className="absolute top-1/4 right-1/4 text-3xl opacity-10 select-none rotate-6" aria-hidden>📖</div>

            <div className="w-full max-w-md bg-white rounded-xl shadow-card shadow-paper relative overflow-hidden animate-fade-in">
                <div className="absolute left-12 top-0 bottom-0 w-[2px] bg-red-300/40" aria-hidden />
                <div className="flex justify-center gap-6 py-3 bg-navy/5 border-b border-ruled" aria-hidden>
                    {[...Array(5)].map((_, i) => <div key={i} className="w-4 h-4 rounded-full border-2 border-navy/20 bg-white" />)}
                </div>

                <div className="p-6 pl-10 sm:p-8 sm:pl-16">
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-block">
                            <h1 className="font-caveat text-4xl font-bold text-navy">Apt<span className="text-yellow-accent">IQ</span></h1>
                        </Link>
                        <p className="font-body text-navy/60 mt-1">{isSignUp ? 'Create your notebook 📓' : 'Open your notebook 📖'}</p>
                    </div>

                    {error && (
                        <div className="mb-4 px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-body animate-fade-in">
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {isSignUp && (
                            <div className="animate-fade-in">
                                <label htmlFor="name" className="block font-body text-navy/80 text-sm mb-1.5">Full Name</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required={isSignUp} placeholder="Your name" className="w-full px-4 py-3 bg-cream/50 border-b-2 border-ruled rounded-lg font-body text-navy placeholder:text-navy/30 focus:outline-none focus:border-yellow-accent focus:bg-yellow-light/20 transition-colors" />
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block font-body text-navy/80 text-sm mb-1.5">Email Address</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@college.edu" className="w-full px-4 py-3 bg-cream/50 border-b-2 border-ruled rounded-lg font-body text-navy placeholder:text-navy/30 focus:outline-none focus:border-yellow-accent focus:bg-yellow-light/20 transition-colors" />
                        </div>

                        <div>
                            <label htmlFor="password" className="block font-body text-navy/80 text-sm mb-1.5">Password</label>
                            <div className="relative">
                                <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" className="w-full px-4 py-3 pr-12 bg-cream/50 border-b-2 border-ruled rounded-lg font-body text-navy placeholder:text-navy/30 focus:outline-none focus:border-yellow-accent focus:bg-yellow-light/20 transition-colors" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/40 hover:text-navy transition-colors p-1" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                                    <EyeIcon show={showPassword} />
                                </button>
                            </div>
                        </div>

                        {isSignUp && (
                            <div className="animate-fade-in">
                                <label htmlFor="confirmPassword" className="block font-body text-navy/80 text-sm mb-1.5">Confirm Password</label>
                                <div className="relative">
                                    <input type={showConfirm ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="••••••••" className="w-full px-4 py-3 pr-12 bg-cream/50 border-b-2 border-ruled rounded-lg font-body text-navy placeholder:text-navy/30 focus:outline-none focus:border-yellow-accent focus:bg-yellow-light/20 transition-colors" />
                                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/40 hover:text-navy transition-colors p-1" aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}>
                                        <EyeIcon show={showConfirm} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {isSignUp && (
                            <div className="animate-fade-in">
                                <span className="block font-body text-navy/80 text-sm mb-2">I am a...</span>
                                <div className="flex gap-3">
                                    {[
                                        { value: 'student', label: '🎓 Student', color: 'bg-sky-soft' },
                                        { value: 'teacher', label: '👨‍🏫 Teacher', color: 'bg-green-soft' },
                                    ].map((role) => (
                                        <button key={role.value} type="button" onClick={() => setFormData({ ...formData, role: role.value })}
                                            className={`flex-1 py-3 rounded-lg font-body text-lg transition-all duration-200 border-2 ${formData.role === role.value ? `${role.color} border-navy/30 shadow-sticky text-navy scale-105` : 'bg-cream/50 border-transparent text-navy/50 hover:border-navy/10'}`}
                                            aria-pressed={formData.role === role.value}>
                                            {role.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button type="submit" className="w-full py-3 bg-navy text-cream font-body text-lg rounded-lg shadow-md hover:bg-navy-light hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:ring-offset-2">
                            {isSignUp ? 'Create Account ✨' : 'Sign In →'}
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <button onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
                            className="font-body text-navy/60 hover:text-navy text-sm transition-colors underline decoration-dotted underline-offset-4">
                            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
