import { useState } from 'react';
import { learningPaths } from '../data/lessons';

/**
 * LearningPath – Chapter list with notebook aesthetic.
 *
 * Props: none
 * State:
 *   - selectedPath: string – currently selected learning path ID
 *   - expandedChapter: string|null – currently expanded chapter ID
 *
 * Features:
 *   - Notebook-line background
 *   - Sticky-note style lesson cards
 *   - Bookmark icon on completed lessons
 *   - Progress bar per chapter
 */
export default function LearningPath() {
    const [selectedPath, setSelectedPath] = useState(learningPaths[0]?.id || '');
    const [expandedChapter, setExpandedChapter] = useState(null);

    const currentPath = learningPaths.find((p) => p.id === selectedPath);

    return (
        <div className="relative min-h-full">
            {/* Notebook background */}
            <div className="absolute inset-0 bg-ruled-lines opacity-20 pointer-events-none" aria-hidden="true" />

            <div className="relative p-6 lg:p-8 max-w-5xl mx-auto">
                {/* Header */}
                <h1 className="font-caveat text-4xl font-bold text-navy mb-2">📚 Learning Paths</h1>
                <p className="font-body text-navy/60 mb-8">Pick a subject and start learning at your own pace.</p>

                {/* Path selector tabs */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {learningPaths.map((path) => (
                        <button
                            key={path.id}
                            onClick={() => { setSelectedPath(path.id); setExpandedChapter(null); }}
                            className={`px-5 py-2.5 rounded-lg font-body text-base transition-all duration-200 border-2 ${selectedPath === path.id
                                    ? `${path.color} border-navy/20 shadow-sticky text-navy font-medium`
                                    : 'bg-white border-transparent text-navy/50 hover:border-navy/10 hover:bg-cream/50 shadow-sm'
                                }`}
                            aria-pressed={selectedPath === path.id}
                        >
                            <img
                                src={`https://unpkg.com/lucide-static@latest/icons/${path.icon}.svg`}
                                alt=""
                                width="16"
                                height="16"
                                className="inline-block mr-2 opacity-60"
                                aria-hidden="true"
                            />
                            {path.title}
                        </button>
                    ))}
                </div>

                {/* Current path info */}
                {currentPath && (
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-body text-navy/60 text-sm">
                                {currentPath.completedChapters} of {currentPath.totalChapters} chapters completed
                            </span>
                            <span className="font-caveat text-lg font-bold text-navy">{currentPath.progress}%</span>
                        </div>
                        <div className="w-full h-3 bg-white rounded-full overflow-hidden shadow-inner">
                            <div
                                className="h-full bg-gradient-to-r from-yellow-accent to-yellow-accent/70 rounded-full transition-all duration-700"
                                style={{ width: `${currentPath.progress}%` }}
                                role="progressbar"
                                aria-valuenow={currentPath.progress}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            />
                        </div>
                    </div>
                )}

                {/* Chapter list */}
                <div className="space-y-4">
                    {currentPath?.chapters.map((chapter, index) => {
                        const completedLessons = chapter.lessons.filter((l) => l.completed).length;
                        const totalLessons = chapter.lessons.length;
                        const chapterProgress = Math.round((completedLessons / totalLessons) * 100);
                        const isExpanded = expandedChapter === chapter.id;

                        return (
                            <div
                                key={chapter.id}
                                className="bg-white rounded-xl shadow-card overflow-hidden transition-shadow hover:shadow-hover animate-fade-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Chapter header */}
                                <button
                                    onClick={() => setExpandedChapter(isExpanded ? null : chapter.id)}
                                    className="w-full flex items-center gap-4 p-5 text-left hover:bg-cream/30 transition-colors"
                                    aria-expanded={isExpanded}
                                >
                                    <div className="w-10 h-10 bg-cream rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="font-caveat text-xl font-bold text-navy">{index + 1}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-caveat text-xl font-bold text-navy">{chapter.title}</h3>
                                        <p className="font-body text-sm text-navy/50">
                                            {completedLessons}/{totalLessons} lessons • {chapterProgress}% complete
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 flex-shrink-0">
                                        {/* Mini progress */}
                                        <div className="w-16 h-1.5 bg-cream rounded-full overflow-hidden hidden sm:block">
                                            <div
                                                className="h-full bg-green-soft rounded-full"
                                                style={{ width: `${chapterProgress}%` }}
                                            />
                                        </div>
                                        {/* Chevron */}
                                        <svg
                                            className={`w-5 h-5 text-navy/30 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                {/* Expanded lessons – sticky note style */}
                                {isExpanded && (
                                    <div className="px-5 pb-5 bg-ruled-lines">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-14">
                                            {chapter.lessons.map((lesson) => (
                                                <div
                                                    key={lesson.id}
                                                    className={`relative p-4 rounded-lg shadow-sticky transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${lesson.completed
                                                            ? 'bg-green-soft/30 border border-green-soft/50'
                                                            : 'bg-yellow-light/40 border border-yellow-accent/20 hover:bg-yellow-light/60'
                                                        }`}
                                                >
                                                    {/* Bookmark icon for completed */}
                                                    {lesson.completed && (
                                                        <div className="absolute -top-1 -right-1">
                                                            <img
                                                                src="https://unpkg.com/lucide-static@latest/icons/bookmark-check.svg"
                                                                alt="Completed"
                                                                width="18"
                                                                height="18"
                                                                className="opacity-60"
                                                            />
                                                        </div>
                                                    )}
                                                    <h4 className="font-body text-navy text-sm font-medium">{lesson.title}</h4>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <img
                                                            src="https://unpkg.com/lucide-static@latest/icons/clock.svg"
                                                            alt=""
                                                            width="12"
                                                            height="12"
                                                            className="opacity-40"
                                                            aria-hidden="true"
                                                        />
                                                        <span className="font-body text-xs text-navy/40">{lesson.duration}</span>
                                                        {lesson.completed && (
                                                            <span className="font-body text-xs text-green-700/70 ml-auto">✓ Done</span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
