import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createClass, getClassesByTeacher } from '../../data/classStore';

export default function CreateClass() {
    const { user } = useAuth();
    const [className, setClassName] = useState('');
    const [classes, setClasses] = useState([]);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setClasses(getClassesByTeacher(user?.email));
    }, [user]);

    const handleCreate = (e) => {
        e.preventDefault();
        if (!className.trim()) return;
        setLoading(true);
        setTimeout(() => {
            const newClass = createClass({ name: className.trim(), teacherEmail: user?.email, teacherName: user?.name });
            setClasses(getClassesByTeacher(user?.email));
            setSuccess(newClass);
            setClassName('');
            setLoading(false);
        }, 400);
    };

    return (
        <div className="min-h-screen bg-cream p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8 animate-slide-up">
                    <h1 className="font-caveat text-4xl font-bold text-navy">🏫 My Classes</h1>
                    <p className="font-body text-navy/60 mt-1">Create classes and share the join code with your students.</p>
                </div>

                {/* Create form */}
                <div className="bg-white rounded-2xl shadow-card p-6 mb-8 animate-fade-in">
                    <h2 className="font-caveat text-2xl font-bold text-navy mb-4">Create New Class</h2>
                    <form onSubmit={handleCreate} className="flex gap-3">
                        <input
                            type="text"
                            placeholder="e.g. Aptitude Batch B"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            className="flex-1 px-4 py-3 bg-cream/50 border-2 border-ruled rounded-xl font-body text-navy placeholder:text-navy/30 focus:outline-none focus:border-yellow-accent transition-colors"
                        />
                        <button type="submit" disabled={loading || !className.trim()}
                            className="px-6 py-3 bg-navy text-cream font-body rounded-xl hover:bg-navy-light transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-md">
                            {loading ? '⏳' : '+ Create'}
                        </button>
                    </form>

                    {success && (
                        <div className="mt-4 p-4 bg-green-soft/40 rounded-xl border border-green-soft animate-fade-in">
                            <p className="font-body text-navy font-medium">✅ Class created!</p>
                            <p className="font-body text-navy/70 text-sm mt-1">
                                Share this join code with students:{' '}
                                <span className="font-mono font-bold text-lg bg-white px-3 py-1 rounded-lg shadow-sm border border-ruled ml-1">
                                    {success.joinCode}
                                </span>
                            </p>
                        </div>
                    )}
                </div>

                {/* Classes list */}
                <h2 className="font-caveat text-2xl font-bold text-navy mb-4">Your Classes ({classes.length})</h2>
                {classes.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-card p-10 text-center animate-fade-in">
                        <span className="text-5xl">🏫</span>
                        <p className="font-caveat text-2xl text-navy/60 mt-4">No classes yet</p>
                        <p className="font-body text-navy/40 text-sm mt-2">Create your first class above!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {classes.map((cls, i) => (
                            <div key={cls.id}
                                className="bg-white rounded-2xl shadow-card p-6 hover:shadow-hover transition-all hover:-translate-y-1 animate-fade-in border border-white/50"
                                style={{ animationDelay: `${i * 60}ms` }}>
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="font-caveat text-xl font-bold text-navy">{cls.name}</h3>
                                    <span className="px-2 py-1 bg-sky-soft/60 text-navy text-xs rounded-lg font-body">Active</span>
                                </div>
                                <p className="font-body text-navy/50 text-sm">👥 {cls.studentCount} student{cls.studentCount !== 1 ? 's' : ''}</p>
                                <div className="mt-4 flex items-center gap-2">
                                    <span className="font-body text-xs text-navy/50">Join Code:</span>
                                    <span className="font-mono font-bold text-navy bg-yellow-light/60 px-3 py-1 rounded-lg text-sm border border-yellow-accent/30">
                                        {cls.joinCode}
                                    </span>
                                </div>
                                <p className="font-body text-xs text-navy/30 mt-3">
                                    Created {new Date(cls.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
