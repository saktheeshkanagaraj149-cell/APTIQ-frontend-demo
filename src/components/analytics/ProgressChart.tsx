/**
 * ProgressChart – Placeholder container ready for Recharts integration.
 * Renders a styled wrapper div where a Recharts chart can be mounted.
 *
 * @param chartData - Array of data points for the chart
 * @param title - Chart title (e.g. "Score Trend", "Time Analysis")
 * @param chartType - Label for the chart type (e.g. "Line", "Bar")
 * @param height - Chart container height in px (default: 280)
 * @param className - Additional Tailwind classes for extensibility
 */

interface ChartDataPoint {
    label: string;
    value: number;
    [key: string]: unknown;
}

interface ProgressChartProps {
    chartData: ChartDataPoint[];
    title?: string;
    chartType?: string;
    height?: number;
    className?: string;
}

export function ProgressChart({
    chartData,
    title = 'Performance Trend',
    chartType = 'Chart',
    height = 280,
    className = '',
}: ProgressChartProps) {
    return (
        <div
            className={`bg-white rounded-xl p-5 shadow-md border border-cream ${className}`}
        >
            <h4 className="font-caveat text-xl font-bold text-navy mb-4">{title}</h4>

            {/* Chart placeholder container */}
            <div
                className="w-full bg-cream/50 rounded-lg border-2 border-dashed border-ruled/40 flex flex-col items-center justify-center"
                style={{ height: `${height}px` }}
                role="img"
                aria-label={`${title} chart placeholder — ${chartData.length} data points`}
            >
                {/* Placeholder visual */}
                <div className="text-center">
                    <span className="text-4xl mb-3 block" aria-hidden="true">📈</span>
                    <p className="font-caveat text-lg text-navy/40 mb-1">
                        {chartType} — {chartData.length} data points
                    </p>
                    <p className="font-body text-xs text-navy/30">
                        Integrate Recharts here:
                    </p>
                    <code className="font-mono text-xs text-navy/40 mt-1 block bg-cream px-3 py-1 rounded">
                        {'<ResponsiveContainer><LineChart data={chartData} /></ResponsiveContainer>'}
                    </code>
                </div>
            </div>

            {/* Data summary footer */}
            {chartData.length > 0 && (
                <div className="flex items-center justify-between mt-3 text-sm">
                    <span className="font-body text-navy/40">
                        Points: {chartData.length}
                    </span>
                    <span className="font-body text-navy/40">
                        Range: {Math.min(...chartData.map((d) => d.value))} – {Math.max(...chartData.map((d) => d.value))}
                    </span>
                </div>
            )}
        </div>
    );
}
