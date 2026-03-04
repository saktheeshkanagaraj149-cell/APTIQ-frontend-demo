import { Link } from 'react-router-dom';
import FloatingNotebookBg from '../components/three/FloatingNotebookBg';

/**
 * LandingPage – Hero section with slogan, feature cards, and CTA.
 *
 * Props: none
 * State: none
 *
 * Notebook aesthetic: ruled-line background, sticky-note feature cards,
 * pencil doodle accents, highlighter text effects.
 * Three.js: FloatingNotebookBg renders floating 3D wireframe shapes behind the hero.
 */

const features = [
    {
        title: 'Interactive Lessons',
        description: 'Step-by-step learning paths designed for aptitude mastery with notebook-style lessons.',
        icon: 'book-open',
        color: 'bg-yellow-light',
        rotate: '-rotate-1',
    },
    {
        title: 'Timed Tests',
        description: 'Challenge yourself with timed mock tests. Anti-cheat enabled for fair competition.',
        icon: 'timer',
        color: 'bg-pink-light',
        rotate: 'rotate-1',
    },
    {
        title: 'Live Leaderboard',
        description: 'Compete with students across India. Real-time rankings updated via Socket.io.',
        icon: 'trophy',
        color: 'bg-green-soft',
        rotate: '-rotate-2',
    },
    {
        title: 'Smart Analytics',
        description: 'Track your strengths and weaknesses with detailed section-wise performance charts.',
        icon: 'bar-chart-2',
        color: 'bg-sky-soft',
        rotate: 'rotate-1',
    },
];

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-cream">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Three.js floating shapes background */}
                <FloatingNotebookBg />

                {/* Notebook ruled lines background */}
                <div className="absolute inset-0 bg-ruled-lines opacity-30" aria-hidden="true" />

                {/* Decorative pencil doodles */}
                <div className="absolute top-20 right-10 text-6xl opacity-10 font-caveat select-none rotate-12 z-[1]" aria-hidden="true">
                    ✏️
                </div>
                <div className="absolute bottom-20 left-10 text-5xl opacity-10 font-caveat select-none -rotate-6 z-[1]" aria-hidden="true">
                    📚
                </div>
                <div className="absolute top-40 left-1/4 text-4xl opacity-10 font-caveat select-none rotate-6 z-[1]" aria-hidden="true">
                    💡
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Pencil annotation */}
                        <div className="inline-block mb-6 px-4 py-1.5 bg-yellow-light/70 rounded-full border border-yellow-accent/30">
                            <span className="font-body text-navy/80 text-sm">🎯 Free & Open Source for Indian Students</span>
                        </div>

                        {/* Main heading */}
                        <h1 className="font-caveat text-6xl sm:text-7xl lg:text-8xl font-bold text-navy leading-tight mb-6">
                            <span className="bg-highlighter-yellow">Learn.</span>{' '}
                            <span className="bg-highlighter-pink">Test.</span>{' '}
                            <span className="bg-highlighter-green">Rank.</span>
                        </h1>

                        {/* Subheading */}
                        <p className="font-body text-xl sm:text-2xl text-navy/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                            The notebook-style aptitude platform that makes learning fun.
                            Master Quantitative, Logical, and Verbal skills — all in one place.
                        </p>

                        {/* CTA Button */}
                        <div className="flex justify-center">
                            <Link
                                to="/auth"
                                className="px-8 py-4 bg-navy text-cream font-body text-lg sm:text-xl rounded-xl shadow-lg hover:shadow-xl hover:bg-navy-light transform hover:-translate-y-0.5 transition-all duration-200 animate-pulse-glow"
                            >
                                Get Started — It&apos;s Free! ✨
                            </Link>
                        </div>

                        {/* Stats bar */}
                        <div className="flex flex-wrap justify-center gap-8 mt-16">
                            {[
                                { value: '10K+', label: 'Students' },
                                { value: '500+', label: 'Questions' },
                                { value: '50+', label: 'Topics' },
                                { value: '100%', label: 'Free' },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <div className="font-caveat text-3xl font-bold text-navy">{stat.value}</div>
                                    <div className="font-body text-navy/60 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-cream relative">
                <div className="absolute inset-0 bg-ruled-lines opacity-15" aria-hidden="true" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-caveat text-4xl sm:text-5xl font-bold text-navy mb-4">
                            Why Students Love AptIQ 📒
                        </h2>
                        <p className="font-body text-lg text-navy/60 max-w-xl mx-auto">
                            Everything you need to ace your aptitude exams, wrapped in a beautiful notebook UI.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className={`${feature.color} p-6 rounded-lg shadow-sticky ${feature.rotate} hover:rotate-0 transition-all duration-300 hover:shadow-hover hover:-translate-y-2 cursor-default animate-fade-in`}
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="mb-4">
                                    <img
                                        src={`https://unpkg.com/lucide-static@latest/icons/${feature.icon}.svg`}
                                        alt=""
                                        width="32"
                                        height="32"
                                        className="opacity-70"
                                        aria-hidden="true"
                                    />
                                </div>
                                <h3 className="font-caveat text-2xl font-bold text-navy mb-2">{feature.title}</h3>
                                <p className="font-body text-navy/70 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About / How it Works */}
            <section id="about" className="py-20 bg-white/50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-caveat text-4xl sm:text-5xl font-bold text-navy mb-4">
                            How It Works ✍️
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            { step: '1', title: 'Pick a Path', desc: 'Choose from Quantitative, Logical, Verbal, or Data Interpretation tracks.', emoji: '📖' },
                            { step: '2', title: 'Learn & Practice', desc: 'Complete notebook-style lessons and practice with timed tests.', emoji: '📝' },
                            { step: '3', title: 'Climb the Ranks', desc: 'Earn badges, maintain streaks, and top the leaderboard.', emoji: '🏆' },
                        ].map((item) => (
                            <div key={item.step} className="text-center group">
                                <div className="w-16 h-16 bg-yellow-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow">
                                    <span className="font-caveat text-3xl font-bold text-navy">{item.step}</span>
                                </div>
                                <h3 className="font-caveat text-2xl font-bold text-navy mb-2">
                                    {item.emoji} {item.title}
                                </h3>
                                <p className="font-body text-navy/60">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contributors Section */}
            <section id="contributors" className="py-20 bg-cream relative">
                <div className="absolute inset-0 bg-ruled-lines opacity-10" aria-hidden="true" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-caveat text-4xl sm:text-5xl font-bold text-navy mb-4">
                            Meet the Team 👨‍💻
                        </h2>
                        <p className="text-lg text-navy/60 max-w-xl mx-auto">
                            The amazing people building AptIQ for students across India.
                        </p>
                    </div>

                    {/* Founder / Team Lead — featured card */}
                    <div className="max-w-md mx-auto mb-10">
                        <div className="bg-yellow-light p-6 rounded-xl shadow-sticky text-center hover:shadow-hover hover:-translate-y-1 transition-all duration-300 border-2 border-yellow-accent/30">
                            <div className="w-16 h-16 bg-yellow-accent rounded-full flex items-center justify-center mx-auto mb-3 text-2xl shadow-md">
                                ⭐
                            </div>
                            <h3 className="font-caveat text-2xl font-bold text-navy">Saktheesh K</h3>
                            <p className="text-navy/80 text-sm font-semibold mt-1">Founder & Team Lead</p>
                            <p className="text-navy/50 text-xs mt-1">🎓 P.S.R Engineering College</p>
                        </div>
                    </div>

                    {/* Team members grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            { name: 'Narasimha', role: 'Backend Developer', college: 'Siddharth Institute of Engineering & Technology, Puttur', emoji: '🔧', color: 'bg-sky-soft', rotate: '-rotate-1' },
                            { name: 'Mohamed Mubarak S A J', role: 'Designer & Data Analyst', college: 'IFET College of Engineering, Villupuram, TN', emoji: '🎨', color: 'bg-pink-light', rotate: 'rotate-1' },
                            { name: 'Mohan Kumar', role: 'Full Stack Developer', college: 'P.S.R.R Engineering College', emoji: '💻', color: 'bg-green-soft', rotate: '-rotate-1' },
                            { name: 'Nalini Saravanan', role: 'Software Developer', college: 'Govt Arts & Science College, Thennagur', emoji: '👩‍💻', color: 'bg-yellow-light', rotate: 'rotate-1' },
                            { name: 'Mohamed Faaris K M', role: 'System Design Engineer', college: 'KRCE Trichy', emoji: '⚙️', color: 'bg-sky-soft', rotate: 'rotate-1' },
                            { name: 'Sadhana Shree', role: 'Frontend Developer', college: 'P.S.R.R College of Engineering', emoji: '🖥️', color: 'bg-pink-light', rotate: '-rotate-1' },
                            { name: 'Sweety', role: 'Marketing, Management & Operations Strategy', college: '', emoji: '📊', color: 'bg-green-soft', rotate: 'rotate-1' },
                        ].map((member, index) => (
                            <div
                                key={member.name}
                                className={`${member.color} p-5 rounded-lg shadow-sticky ${member.rotate} hover:rotate-0 hover:-translate-y-2 hover:shadow-hover transition-all duration-300 cursor-default animate-fade-in`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="text-2xl mb-2">{member.emoji}</div>
                                <h3 className="font-caveat text-xl font-bold text-navy">{member.name}</h3>
                                <p className="text-navy/70 text-sm mt-1">{member.role}</p>
                                {member.college && (
                                    <p className="text-navy/40 text-xs mt-2">🎓 {member.college}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-navy py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="font-caveat text-2xl font-bold text-cream mb-2">
                        Apt<span className="text-yellow-accent">IQ</span>
                    </div>
                    <p className="font-body text-cream/60 text-sm mb-4">
                        Made with ❤️ for Indian students. Open source & free forever.
                    </p>
                    <div className="flex justify-center gap-6">
                        <a href="#" className="font-body text-cream/50 hover:text-cream transition-colors text-sm">GitHub</a>
                        <a href="#" className="font-body text-cream/50 hover:text-cream transition-colors text-sm">Discord</a>
                        <a href="#" className="font-body text-cream/50 hover:text-cream transition-colors text-sm">Twitter</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
