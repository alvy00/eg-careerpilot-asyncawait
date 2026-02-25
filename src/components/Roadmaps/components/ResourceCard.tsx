interface ResourceItem {
    name: string;
    link: string;
}

interface CourseItem extends ResourceItem {
    platform: string;
    type: "free" | "paid";
}

interface ResourceCardProps<T extends ResourceItem> {
    title: string;
    type: string;
    items: T[];
}

// ✅ Type Guard
function isCourse(item: ResourceItem): item is CourseItem {
    return (
        typeof (item as CourseItem).platform === "string" &&
        typeof (item as CourseItem).type === "string"
    );
}

export default function ResourceCard<T extends ResourceItem>({
    title,
    items,
}: ResourceCardProps<T>) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-cyan-500/50 transition-colors">
            <h4 className="text-white font-medium mb-4">{title}</h4>

            <div className="space-y-3">
                {items.map((item, index) => (
                    <a
                        key={index}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                    >
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-200 group-hover:text-cyan-400 transition-colors">
                                {item.name}
                            </span>

                            {/* ✅ Safe narrowing */}
                            {isCourse(item) && (
                                <span className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">
                                    {item.platform} • {item.type}
                                </span>
                            )}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
