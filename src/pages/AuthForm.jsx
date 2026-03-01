import { useState } from 'react';
import { Link } from 'react-router-dom';
import WaveGridBg from '../components/three/WaveGridBg';

/**
 * AuthForm – Sign-in / Sign-up modal with notebook paper texture.
 *
 * Props: none
 * State:
 *   - isSignUp: boolean – toggles between sign-in and sign-up mode
 *   - formData: { email, password, confirmPassword, role }
 *
 * Notebook aesthetic: Paper-texture background, ruled lines, pencil doodle accents.
 * Role selection: Student or Teacher (for sign-up).
 */
export default function AuthForm() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Integrate with JWT auth endpoints
        console.log('Auth submit:', { ...formData, mode: isSignUp ? 'signup' : 'signin' });
    };

    return (
        <div className="min-h-screen bg-cream bg-ruled-lines flex items-center justify-center p-4 relative">
            {/* Three.js wave grid background */}
            <WaveGridBg />

            {/* Decorative elements */}
            <div className="absolute top-10 left-10 text-5xl opacity-10 select-none -rotate-12" aria-hidden="true">📝</div>
            <div className="absolute bottom-10 right-10 text-5xl opacity-10 select-none rotate-12" aria-hidden="true">✏️</div>
            <div className="absolute top-1/4 right-1/4 text-3xl opacity-10 select-none rotate-6" aria-hidden="true">📖</div>

            {/* Auth card – notebook paper style */}
            <div className="w-full max-w-md bg-white rounded-xl shadow-card shadow-paper relative overflow-hidden animate-fade-in">
                {/* Red margin line */}
                <div className="absolute left-12 top-0 bottom-0 w-[2px] bg-red-300/40" aria-hidden="true" />

                {/* Spiral binding dots at top */}
                <div className="flex justify-center gap-6 py-3 bg-navy/5 border-b border-ruled" aria-hidden="true">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-4 h-4 rounded-full border-2 border-navy/20 bg-white" />
                    ))}
                </div>

                <div className="p-8 pl-16">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-block">
                            <h1 className="font-caveat text-4xl font-bold text-navy">
                                Apt<span className="text-yellow-accent">IQ</span>
                            </h1>
                        </Link>
                        <p className="font-body text-navy/60 mt-1">
                            {isSignUp ? 'Create your notebook 📓' : 'Open your notebook 📖'}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block font-body text-navy/80 text-sm mb-1.5">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="you@college.edu.in"
                                className="w-full px-4 py-3 bg-cream/50 border-b-2 border-ruled rounded-lg font-body text-navy placeholder:text-navy/30 focus:outline-none focus:border-yellow-accent focus:bg-yellow-light/20 transition-colors"
                                aria-label="Email address"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block font-body text-navy/80 text-sm mb-1.5">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-cream/50 border-b-2 border-ruled rounded-lg font-body text-navy placeholder:text-navy/30 focus:outline-none focus:border-yellow-accent focus:bg-yellow-light/20 transition-colors"
                                aria-label="Password"
                            />
                        </div>

                        {/* Confirm Password (sign-up only) */}
                        {isSignUp && (
                            <div className="animate-fade-in">
                                <label htmlFor="confirmPassword" className="block font-body text-navy/80 text-sm mb-1.5">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 bg-cream/50 border-b-2 border-ruled rounded-lg font-body text-navy placeholder:text-navy/30 focus:outline-none focus:border-yellow-accent focus:bg-yellow-light/20 transition-colors"
                                    aria-label="Confirm password"
                                />
                            </div>
                        )}

                        {/* Role selection (sign-up only) */}
                        {isSignUp && (
                            <div className="animate-fade-in">
                                <span className="block font-body text-navy/80 text-sm mb-2">I am a...</span>
                                <div className="flex gap-3">
                                    {[
                                        { value: 'student', label: '🎓 Student', color: 'bg-sky-soft' },
                                        { value: 'teacher', label: '👨‍🏫 Teacher', color: 'bg-green-soft' },
                                    ].map((role) => (
                                        <button
                                            key={role.value}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, role: role.value })}
                                            className={`flex-1 py-3 rounded-lg font-body text-lg transition-all duration-200 border-2 ${formData.role === role.value
                                                ? `${role.color} border-navy/30 shadow-sticky text-navy`
                                                : 'bg-cream/50 border-transparent text-navy/50 hover:border-navy/10'
                                                }`}
                                            aria-pressed={formData.role === role.value}
                                        >
                                            {role.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-navy text-cream font-body text-lg rounded-lg shadow-md hover:bg-navy-light hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:ring-offset-2"
                        >
                            {isSignUp ? 'Create Account ✨' : 'Sign In →'}
                        </button>
                    </form>

                    {/* Toggle sign-in / sign-up */}
                    <div className="text-center mt-6">
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="font-body text-navy/60 hover:text-navy text-sm transition-colors underline decoration-dotted underline-offset-4 focus:outline-none focus:text-navy"
                        >
                            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
