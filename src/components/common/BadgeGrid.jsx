import { badges as badgeData } from '../../data/badges';

/**
 * BadgeGrid – Renders badge cards with staggered pop‑in animation
 * and a bounce effect on hover.
 *
 * @param badges - Array of badge objects (defaults to placeholder data)
 * @param className - Additional Tailwind classes
 */
export default function BadgeGrid({ badges = badgeData, className = '' }) {
    return (
        <div
            className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}
            role="list"
            aria-label="Badge collection"
        >
            {badges.map((badge, index) => (
                <div
                    key={badge.name}
                    className="animate-pop-in hover:animate-bounce-hover bg-white rounded-xl p-5 shadow-card
                     border border-cream text-center cursor-default
                     transition-shadow duration-200 hover:shadow-hover
                     focus-visible:outline-2 focus-visible:outline-navy"
                    style={{ animationDelay: `${index * 80}ms` }}
                    role="listitem"
                    tabIndex={0}
                    aria-label={`${badge.name}: ${badge.description}`}
                >
                    {/* Badge icon */}
                    <div className={`w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center
                          ${badge.earned ? 'bg-accent' : 'bg-ruled/30'}`}
                    >
                        <img
                            src={`https://unpkg.com/lucide-static@latest/icons/${badge.icon}.svg`}
                            alt=""
                            width="28"
                            height="28"
                            className={badge.earned ? 'opacity-100' : 'opacity-30'}
                            aria-hidden="true"
                        />
                    </div>

                    {/* Badge name */}
                    <h4 className="font-heading text-lg font-bold text-navy mb-1">
                        {badge.name}
                    </h4>
                    <p className="font-body text-xs text-navy/50">
                        {badge.description}
                    </p>

                    {/* Earned indicator */}
                    {badge.earned ? (
                        <span className="inline-block mt-2 px-2 py-0.5 bg-softGreen text-green-800 font-body text-xs rounded-full">
                            ✅ Earned
                        </span>
                    ) : (
                        <span className="inline-block mt-2 px-2 py-0.5 bg-ruled/20 text-navy/40 font-body text-xs rounded-full">
                            🔒 Locked
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}
