import React from 'react';
import { NotebookBackground } from '../common/NotebookBackground';
import { LiveBadge } from '../common/LiveBadge';

/**
 * LeaderboardScreen – Main container for the leaderboard page.
 * Provides notebook background, page header with LiveBadge, and content slot.
 *
 * @param children - Content (FilterBar + LeaderboardTable)
 * @param title - Page heading (default: "Leaderboard")
 * @param subtitle - Optional description text
 * @param isLive - Whether to show the LiveBadge (default: true)
 * @param className - Additional Tailwind classes for extensibility
 */

interface LeaderboardScreenProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    isLive?: boolean;
    className?: string;
}

export function LeaderboardScreen({
    children,
    title = '🏆 Leaderboard',
    subtitle = 'Real-time rankings across all students.',
    isLive = true,
    className = '',
}: LeaderboardScreenProps) {
    return (
        <NotebookBackground className={className}>
            <div className="p-6 lg:p-8 max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
                    <div>
                        <h1 className="font-caveat text-4xl font-bold text-navy">{title}</h1>
                        {subtitle && (
                            <p className="font-body text-navy/60 mt-1">{subtitle}</p>
                        )}
                    </div>
                    {isLive && <LiveBadge />}
                </div>

                {/* Content slot (FilterBar + LeaderboardTable) */}
                {children}
            </div>
        </NotebookBackground>
    );
}
