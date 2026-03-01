/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                /* ── Design‑spec canonical names ── */
                primary: {
                    DEFAULT: '#1a3a5c',
                    light: '#2a5a8c',
                    dark: '#0f2440',
                },
                accent: '#fff176',
                softGreen: '#b9f6ca',
                lightPink: '#f8bbd9',
                skyBlue: '#b3e5fc',
                background: '#faf8f2',

                /* ── Backward‑compat aliases (used by existing components) ── */
                cream: '#faf8f2',
                navy: {
                    DEFAULT: '#1a3a5c',
                    light: '#2a5a8c',
                    dark: '#0f2440',
                },
                yellow: {
                    accent: '#fff176',
                    light: '#fff9c4',
                },
                green: {
                    soft: '#b9f6ca',
                },
                pink: {
                    light: '#f8bbd9',
                },
                sky: {
                    soft: '#b3e5fc',
                },
                ruled: '#c5d0e6',
            },
            fontFamily: {
                /* ── Design‑spec canonical names ── */
                body: ['Poppins', 'Inter', 'sans-serif'],
                heading: ['Caveat', 'cursive'],
                ui: ['Inter', 'sans-serif'],

                /* ── Backward‑compat aliases ── */
                caveat: ['Caveat', 'cursive'],
                poppins: ['Poppins', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'ruled-lines': 'repeating-linear-gradient(transparent, transparent 31px, #C5D0E6 31px, #C5D0E6 32px)',
                'paper-texture': 'linear-gradient(135deg, rgba(255,248,231,0.6) 0%, rgba(255,255,255,0.3) 100%)',
                'spiral': 'radial-gradient(circle, #888 5px, transparent 5px)',
                'highlighter-yellow': 'linear-gradient(180deg, transparent 60%, rgba(255,241,118,0.35) 60%)',
                'highlighter-pink': 'linear-gradient(180deg, transparent 60%, rgba(248,187,217,0.5) 60%)',
                'highlighter-green': 'linear-gradient(180deg, transparent 60%, rgba(185,246,202,0.5) 60%)',
            },
            boxShadow: {
                'sticky': '2px 2px 6px rgba(0,0,0,0.15), -1px -1px 3px rgba(255,255,255,0.5)',
                'card': '0 4px 15px rgba(27,42,74,0.1)',
                'hover': '0 8px 25px rgba(27,42,74,0.18)',
                'paper': '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05), inset 0 0 80px rgba(255,248,231,0.3)',
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'wiggle': 'wiggle 0.5s ease-in-out',
                'fade-in': 'fadeIn 0.6s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                /* ── New notebook animations ── */
                'fade-slide': 'fadeSlide 0.5s ease-out both',
                'pop-in': 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
                'bounce-hover': 'bounceHover 0.3s ease-out',
                'click-pulse': 'clickPulse 0.3s ease-out',
                'shimmer': 'shimmer 1.5s ease-in-out infinite',
                'slide-in-left': 'slideInLeft 0.4s ease-out both',
                'highlight-wave': 'highlightWave 1.5s ease-in-out',
                'pulse-red': 'pulseRed 0.8s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-8px)' },
                },
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-1deg)' },
                    '50%': { transform: 'rotate(1deg)' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 5px rgba(255,215,0,0.3)' },
                    '50%': { boxShadow: '0 0 20px rgba(255,215,0,0.6)' },
                },
                /* ── New keyframes ── */
                fadeSlide: {
                    '0%': { opacity: '0', transform: 'translateY(16px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                popIn: {
                    '0%': { opacity: '0', transform: 'scale(0.8)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                bounceHover: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.08)' },
                    '100%': { transform: 'scale(1.04)' },
                },
                clickPulse: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(0.95)' },
                    '100%': { transform: 'scale(1)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                highlightWave: {
                    '0%': { backgroundSize: '0% 40%' },
                    '100%': { backgroundSize: '100% 40%' },
                },
                pulseRed: {
                    '0%, 100%': { color: '#ef4444', transform: 'scale(1)' },
                    '50%': { color: '#dc2626', transform: 'scale(1.1)' },
                },
            },
        },
    },
    plugins: [],
};
