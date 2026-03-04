import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { postNote, getNotesByTeacher, getClassesByTeacher } from '../../data/classStore';

export default function NotesWebhook() {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [classId, setClassId] = useState('');
    const [classes, setClasses] = useState([]);
    const [notes, setNotes] = useState([]);
    const [posting, setPosting] = useState(false);
    const [sent, setSent] = useState(false);

    useEffect(() => {
        const cls = getClassesByTeacher(user?.email);
        setClasses(cls);
        if (cls.length > 0) setClassId(cls[0].id);
        setNotes(getNotesByTeacher(user?.email));
    }, [user]);

    const handlePost = (e) => {
        e.preventDefault();
        setPosting(true);
        setTimeout(() => {
            const cls = classes.find(c => c.id === classId);
            postNote({ teacherEmail: user?.email, teacherName: user?.name, classId, className: cls?.name, title, content });
            setNotes(getNotesByTeacher(user?.email));
            setTitle(''); setContent(''); setSent(true);
            setTimeout(() => setSent(false), 3000);
            setPosting(false);
        }, 600);
    };

    return (
        <div className="min-h-screen bg-cream p-6 lg:p-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 animate-slide-up">
                    <h1 className="font-caveat text-4xl font-bold text-navy">📢 Notes & Updates</h1>
                    <p className="font-body text-navy/60 mt-1">Post announcements and notes. Updates are dispatched to students via webhook.</p>
                </div>

                {/* Webhook badge */}
                <div className="flex items-center gap-2 mb-6 animate-fade-in">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
                    <span className="font-body text-xs text-navy/50">Webhook active · Events dispatched to <code className="bg-cream px-1 rounded">aptiq/note.created</code></span>
                </div>

                {sent && (
                    <div className="mb-6 px-5 py-4 bg-green-soft/50 border border-green-soft rounded-2xl font-body text-navy animate-fade-in flex gap-3">
                        <span className="text-xl">📨</span>
                        <div>
                            <p className="font-semibold">Note posted & webhook fired!</p>
                            <p className="text-sm text-navy/60">Students in the class will see this update.</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handlePost} className="bg-white rounded-2xl shadow-card p-6 mb-8 animate-fade-in space-y-4">
                    <div>
                        <label className="block font-body text-navy/80 text-sm mb-1.5">Class *</label>
                        {classes.length === 0 ? (
                            <p className="text-sm text-navy/40 font-body">No classes yet — create one first.</p>
                        ) : (
                            <select value={classId} onChange={e => setClassId(e.target.value)} required
                                className="w-full px-4 py-3 bg-cream/50 border-2 border-ruled rounded-xl font-body text-navy focus:outline-none focus:border-yellow-accent transition-colors">
                                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        )}
                    </div>
                    <div>
                        <label className="block font-body text-navy/80 text-sm mb-1.5">Title *</label>
                        <input value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g. Important: Assignment Due"
                            className="w-full px-4 py-3 bg-cream/50 border-2 border-ruled rounded-xl font-body text-navy focus:outline-none focus:border-yellow-accent transition-colors" />
                    </div>
                    <div>
                        <label className="block font-body text-navy/80 text-sm mb-1.5">Content *</label>
                        <textarea value={content} onChange={e => setContent(e.target.value)} required rows={4}
                            placeholder="Write your announcement or note here..."
                            className="w-full px-4 py-3 bg-cream/50 border-2 border-ruled rounded-xl font-body text-navy resize-none focus:outline-none focus:border-yellow-accent transition-colors" />
                    </div>
                    <button type="submit" disabled={posting || classes.length === 0}
                        className="w-full py-3 bg-navy text-cream font-body rounded-xl hover:bg-navy-light transition-all hover:-translate-y-0.5 shadow-md disabled:opacity-50 flex items-center justify-center gap-2">
                        {posting ? '⏳ Posting...' : <><span>📤</span> Post & Fire Webhook</>}
                    </button>
                </form>

                {/* Notes feed */}
                <h2 className="font-caveat text-2xl font-bold text-navy mb-4">Posted Notes ({notes.length})</h2>
                {notes.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-card p-10 text-center">
                        <span className="text-5xl">📢</span>
                        <p className="font-caveat text-2xl text-navy/60 mt-4">No notes posted yet</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {notes.map((note, i) => (
                            <div key={note.id}
                                className="bg-white rounded-2xl shadow-card p-5 border-l-4 border-yellow-accent animate-fade-in"
                                style={{ animationDelay: `${i * 60}ms` }}>
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-body font-semibold text-navy">{note.title}</h3>
                                    <span className="text-xs text-navy/30 font-body ml-2 shrink-0">{new Date(note.postedAt).toLocaleString()}</span>
                                </div>
                                <p className="font-body text-navy/70 text-sm">{note.content}</p>
                                <div className="mt-3 flex items-center gap-2">
                                    <span className="px-2 py-0.5 bg-sky-soft/60 text-navy text-xs rounded-full font-body">🏫 {note.className}</span>
                                    <span className="px-2 py-0.5 bg-green-soft/40 text-navy text-xs rounded-full font-body flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> webhook sent
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
