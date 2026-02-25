"use client";

interface Course {
    name: string;
    platform: string;
    type: "free" | "paid";
    link: string;
}

interface ResourceItem {
    name: string;
    link: string;
}

interface ResourceCardProps {
    title: string;
    items: ResourceItem[] | Course[];
    type:
        | "documentation"
        | "courses"
        | "youtube_channels"
        | "books"
        | "practice_platforms";
}

export default function ResourceCard({
    title,
    items,
    type,
}: ResourceCardProps) {
    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300 shadow-lg">
            <h4 className="text-indigo-400 font-semibold mb-4 tracking-wide">
                {title}
            </h4>

            <ul className="space-y-3 text-sm text-gray-300">
                {/* Documentation, YouTube, Books, Practice Platforms */}
                {(type === "documentation" ||
                    type === "youtube_channels" ||
                    type === "books" ||
                    type === "practice_platforms") &&
                    (items as ResourceItem[]).map((item, i) => (
                        <li key={i}>
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-white hover:underline break-all transition-all duration-200"
                            >
                                🔗 {item.name}
                            </a>
                        </li>
                    ))}

                {/* Courses */}
                {type === "courses" &&
                    (items as Course[]).map((course, i) => (
                        <li
                            key={i}
                            className="flex justify-between items-center bg-white/5 px-3 py-2 rounded-lg"
                        >
                            <div>
                                <a
                                    href={course.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white font-medium hover:underline"
                                >
                                    {course.name}
                                </a>
                                <p className="text-xs text-gray-400">
                                    {course.platform}
                                </p>
                            </div>

                            <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                    course.type === "free"
                                        ? "bg-green-500/20 text-green-400"
                                        : "bg-yellow-500/20 text-yellow-400"
                                }`}
                            >
                                {course.type.toUpperCase()}
                            </span>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
