"use client";

import ResourceCard from "./ResourceCard";

interface Course {
    title: string;
    platform: string;
    type: "free" | "paid";
    link: string;
}

interface ResourceItem {
    name: string;
    link: string;
}

interface Resources {
    documentation: ResourceItem[];
    courses: Course[];
    youtube_channels: ResourceItem[];
    books: ResourceItem[];
    practice_platforms: ResourceItem[];
}

export default function ResourcesSection({
    resources,
}: {
    resources: Resources;
}) {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-cyan-400">
                📚 Learning Resources
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Documentation */}
                {resources.documentation?.length > 0 && (
                    <ResourceCard
                        title="Documentation"
                        type="documentation"
                        items={resources.documentation}
                    />
                )}

                {/* Courses */}
                {resources.courses?.length > 0 && (
                    <ResourceCard
                        title="Courses"
                        type="courses"
                        items={resources.courses}
                    />
                )}

                {/* YouTube Channels */}
                {resources.youtube_channels?.length > 0 && (
                    <ResourceCard
                        title="YouTube Channels"
                        type="youtube_channels"
                        items={resources.youtube_channels}
                    />
                )}

                {/* Books */}
                {resources.books?.length > 0 && (
                    <ResourceCard
                        title="Books"
                        type="books"
                        items={resources.books}
                    />
                )}

                {/* Practice Platforms */}
                {resources.practice_platforms?.length > 0 && (
                    <ResourceCard
                        title="Practice Platforms"
                        type="practice_platforms"
                        items={resources.practice_platforms}
                    />
                )}
            </div>
        </div>
    );
}
