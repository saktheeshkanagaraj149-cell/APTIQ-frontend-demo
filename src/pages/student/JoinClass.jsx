import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getClassByJoinCode, enrollStudent } from '../../data/classStore';

export default function JoinClass() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [status, setStatus] = useState(null);
    const [found, setFound] = useState(null);

    const handleJoin = (e) => {
        e.preventDefault();
        setStatus(null);
        const cls = getClassByJoinCode(code.trim());
        if (!cls) { setStatus({ type: 'error', msg: 'No class found with that code. Please check and try again.' }); return; }
        setFound(cls);
        const result = enrollStudent({ studentEmail: user?.email, studentName: user?.name, classId: cls.id, joinCode: cls.joinCode });
        if (!result.success) {
            setStatus({ type: 'warn', msg: `You're already enrolled in "${cls.name}"!` });
        } else {
            setStatus({ type: 'success', msg: `Successfully joined "${cls.name}"! 🎉` });
            setTimeout(() => navigate('/student/dashboard'), 1800);
        }
    };

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-8 animate-slide-up">
                    <span className="text-6xl">🔗</span>
                    <h1 className="font-caveat text-4xl font-bold text-navy mt-4">Join a Class</h1>
                    <p className="font-body text-navy/60 mt-2">Enter the join code shared by your teacher.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-card p-8 animate-fade-in">
                    <form onSubmit={handleJoin} className="space-y-4">
                        <div>
                            <label className="block font-body text-navy/80 text-sm mb-2">Join Code *</label>
                            <input
                                value={code}
                                onChange={e => setCode(e.target.value.toUpperCase())}
                                placeholder="e.g. ABC123"
                                maxLength={8}
                                required
                                className="w-full px-5 py-4 bg-cream/50 border-2 border-ruled rounded-xl font-mono text-2xl text-navy text-center tracking-widest uppercase placeholder:text-navy/20 placeholder:tracking-normal placeholder:font-body placeholder:text-base focus:outline-none focus:border-yellow-accent transition-colors"
                            />
                        </div>

                        {status && (
                            <div className={`px-4 py-3 rounded-xl font-body text-sm animate-fade-in flex items-start gap-2 ${status.type === 'success' ? 'bg-green-soft/50 text-navy border border-green-soft' : status.type === 'warn' ? 'bg-yellow-light/60 text-navy border border-yellow-accent/30' : 'bg-pink-light/50 text-navy border border-pink-light'}`}>
                                <span>{status.type === 'success' ? '✅' : status.type === 'warn' ? '⚠️' : '❌'}</span>
                                <span>{status.msg}</span>
                            </div>
                        )}

                        <button type="submit"
                            className="w-full py-3 bg-navy text-cream font-body text-lg rounded-xl shadow-md hover:bg-navy-light transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-yellow-accent">
                            Join Class →
                        </button>
                    </form>

                    <div className="mt-6 p-4 bg-cream/60 rounded-xl">
                        <p className="font-body text-xs text-navy/50 text-center">💡 Ask your teacher for the 6-character join code for their class.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
