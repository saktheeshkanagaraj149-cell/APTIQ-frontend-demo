/**
 * FilterBar – Leaderboard filter tabs for switching between views.
 * Pure UI component — calls onFilterChange with the selected filter key.
 *
 * @param activeFilter - Currently active filter key
 * @param onFilterChange - Callback when a filter tab is clicked
 * @param className - Additional Tailwind classes for extensibility
 */

type FilterKey = 'all-india' | 'college' | 'my-tests';

interface FilterOption {
    key: FilterKey;
    label: string;
    icon: string;
}

interface FilterBarProps {
    activeFilter: FilterKey;
    onFilterChange: (filter: FilterKey) => void;
    className?: string;
}

const filterOptions: FilterOption[] = [
    { key: 'all-india', label: 'All India', icon: '🇮🇳' },
    { key: 'college', label: 'My College', icon: '🏫' },
    { key: 'my-tests', label: 'My Tests', icon: '📝' },
];

export function FilterBar({
    activeFilter,
    onFilterChange,
    className = '',
}: FilterBarProps) {
    return (
        <div
            className={`flex flex-wrap gap-2 ${className}`}
            role="tablist"
            aria-label="Leaderboard filters"
        >
            {filterOptions.map((option) => {
                const isActive = activeFilter === option.key;
                return (
                    <button
                        key={option.key}
                        onClick={() => onFilterChange(option.key)}
                        className={`px-4 py-2 rounded-lg font-body text-sm transition-all duration-200 border-2 ${isActive
                                ? 'bg-yellow-accent/30 border-yellow-accent/50 text-navy font-semibold shadow-sticky'
                                : 'bg-white border-transparent text-navy/50 hover:border-navy/10 hover:bg-cream/50 shadow-sm'
                            }`}
                        role="tab"
                        aria-selected={isActive}
                        aria-controls="leaderboard-panel"
                    >
                        <span className="mr-1.5" aria-hidden="true">
                            {option.icon}
                        </span>
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}

export type { FilterKey };
