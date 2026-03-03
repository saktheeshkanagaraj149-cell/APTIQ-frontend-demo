import { AnalyticsDashboard } from '../components/analytics/AnalyticsDashboard';
import { ScoreSummaryCard } from '../components/analytics/ScoreSummaryCard';
import { SectionBreakdownCard } from '../components/analytics/SectionBreakdownCard';
import { WeakAreaCard } from '../components/analytics/WeakAreaCard';
import { ProgressChart } from '../components/analytics/ProgressChart';

/**
 * Analytics – Page composing AnalyticsDashboard with analytics cards.
 * Uses placeholder data; in production, data comes from GET /api/analytics/me.
 */

const sectionData = [
    { subject: 'Number Systems', correct: 8, wrong: 1, skipped: 1, accuracy: 80 },
    { subject: 'Percentages', correct: 6, wrong: 3, skipped: 1, accuracy: 60 },
    { subject: 'Ratio & Proportion', correct: 5, wrong: 3, skipped: 2, accuracy: 50 },
    { subject: 'Time & Work', correct: 4, wrong: 4, skipped: 2, accuracy: 40 },
    { subject: 'Coding-Decoding', correct: 7, wrong: 2, skipped: 1, accuracy: 70 },
    { subject: 'Blood Relations', correct: 3, wrong: 5, skipped: 2, accuracy: 30 },
];

const weakTopics = [
    { name: 'Blood Relations', accuracy: 30 },
    { name: 'Time & Work', accuracy: 40 },
    { name: 'Ratio & Proportion', accuracy: 50 },
    { name: 'Reading Comprehension', accuracy: 45 },
];

const trendData = [
    { label: 'Test 1', value: 55 },
    { label: 'Test 2', value: 62 },
    { label: 'Test 3', value: 58 },
    { label: 'Test 4', value: 70 },
    { label: 'Test 5', value: 65 },
    { label: 'Test 6', value: 72 },
    { label: 'Test 7', value: 78 },
    { label: 'Test 8', value: 75 },
];

export default function Analytics() {
    return (
        <AnalyticsDashboard
            studentName="You"
            testName="Quantitative Aptitude – Mixed Practice"
            date="25 Feb 2026"
            onDownloadReport={() => console.log('TODO: Download report PDF')}
        >
            <ScoreSummaryCard totalScore={33} maxScore={50} percentile={78} timeTaken="23m 45s" className="mb-6" />
            <div className="mb-6">
                <h3 className="font-caveat text-2xl font-bold text-navy mb-4">📝 Section Breakdown</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sectionData.map((s) => (
                        <SectionBreakdownCard key={s.subject} subject={s.subject} correct={s.correct} wrong={s.wrong} skipped={s.skipped} accuracy={s.accuracy} />
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <WeakAreaCard topics={weakTopics} />
                <ProgressChart chartData={trendData} title="📈 Score Trend" chartType="Line Chart" />
            </div>
        </AnalyticsDashboard>
    );
}
