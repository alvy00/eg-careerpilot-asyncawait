import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const ExpandableGrid = ({
    items,
    limit = 3,
    renderItem,
    emptyMessage,
}: any) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const displayedItems = isExpanded ? items : items.slice(0, limit);

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                <p className="text-sm text-slate-500 font-medium">
                    {emptyMessage}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayedItems.map((item: any) => renderItem(item))}
            </div>
            {items.length > limit && (
                <div className="flex justify-center pt-4">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-200"
                    >
                        {isExpanded
                            ? "Collapse History"
                            : `Show All ${items.length} Sessions`}
                        <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                        />
                    </button>
                </div>
            )}
        </div>
    );
};
