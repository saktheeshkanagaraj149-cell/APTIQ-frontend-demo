import React from 'react';
import { NotebookBackground } from '../common/NotebookBackground';

/**
 * AnalyticsDashboard – Main container for the score analytics page.
 * Renders notebook background, header with student/test info,
 * and a content slot for analytics cards.
 *
 * @param children - Content (ScoreSummaryCard, SectionBreakdownCard, etc.)
 * @param studentName - Name of the student
 * @param testName - Name of the test
 * @param date - Date the test was taken (display string)
 * @param onDownloadReport - Callback for the "Download Report" button
 * @param className - Additional Tailwind classes for extensibility
 */

interface AnalyticsDashboardProps {
    children: React.ReactNode;
    studentName: string;
    testName: string;
    date: string;
    onDownloadReport?: () => void;
    className?: string;
}

export function AnalyticsDashboard({
    children,
    studentName,
    testName,
    date,
    onDownloadReport,
    className = '',
}: AnalyticsDashboardProps) {
    return (
        <NotebookBackground className={className}>
            <div className="p-6 lg:p-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="font-caveat text-4xl font-bold text-navy">
                            📊 Score Analytics
                        </h1>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span className="font-body text-sm text-navy/60">
                                {studentName}
                            </span>
                            <span className="text-navy/20" aria-hidden="true">•</span>
                            <span className="font-body text-sm text-navy/60">
                                {testName}
                            </span>
                            <span className="text-navy/20" aria-hidden="true">•</span>
                            <span className="font-body text-sm text-navy/40">
                                {date}
                            </span>
                        </div>
                    </div>

                    {/* Download Report button */}
                    <button
                        onClick={onDownloadReport}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-navy font-body text-sm rounded-lg border border-navy/15 shadow-sm hover:shadow-md hover:border-navy/25 transition-all duration-200"
                        aria-label="Download report"
                    >
                        <img
                            src="https://unpkg.com/lucide-static@latest/icons/download.svg"
                            alt=""
                            width="16"
                            height="16"
                            className="opacity-50"
                            aria-hidden="true"
                        />
                        Download Report
                    </button>
                </div>

                {/* Content slot */}
                {children}
            </div>
        </NotebookBackground>
    );
}
