export interface Roadmap {
    skill: string;

    user_profile: UserProfile;

    roadmap_summary: RoadmapSummary;

    phases: Phase[];

    weekly_breakdown: WeeklyBreakdown[];

    final_capstone_project?: FinalCapstoneProject;

    success_metrics: string[];

    career_next_steps: string[];
}

/* ================= USER PROFILE ================= */

export interface UserProfile {
    current_level: string;
    hours_per_day: number;
    total_weeks: number;
    total_estimated_hours: number;
}

/* ================= SUMMARY ================= */

export interface RoadmapSummary {
    goal: string;
    strategy_overview: string;
    expected_outcome: string;
}

/* ================= PHASE ================= */

export interface Phase {
    phase_number: number;
    phase_title: string;
    duration_weeks: number;
    phase_objective: string;

    topics: Topic[];
    projects?: Project[];
    milestones?: string[];
    resources: Resources;
}

/* ================= TOPICS ================= */

export interface Topic {
    topic_name: string;
    subtopics: string[];
}

/* ================= PROJECT ================= */

export interface Project {
    project_title: string;
    description: string;
    key_features?: string[];
    skills_applied?: string[];
    estimated_hours: number;
}

/* ================= RESOURCES ================= */

export interface Resources {
    documentation?: ResourceItem[];
    courses?: CourseResource[];
    youtube_channels?: ResourceItem[];
    books?: ResourceItem[];
    practice_platforms?: ResourceItem[];
}

export interface ResourceItem {
    name: string;
    link: string;
}

export interface CourseResource {
    name: string;
    platform: string;
    type: "free" | "paid";
    link: string;
}

/* ================= WEEKLY BREAKDOWN ================= */

export interface WeeklyBreakdown {
    week: number;
    daily_focus: string;
    deliverables: string[];
    study_hours_target: number;
}

/* ================= FINAL CAPSTONE ================= */

export interface FinalCapstoneProject {
    title: string;
    description: string;
    requirements: string[];
    skills_demonstrated: string[];
    estimated_hours: number;
}

export interface RoadmapGeneratorSectionProps {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;

    currentLevel: string;
    setCurrentLevel: React.Dispatch<React.SetStateAction<string>>;

    hours: string;
    setHours: React.Dispatch<React.SetStateAction<string>>;

    duration: string;
    setDuration: React.Dispatch<React.SetStateAction<string>>;

    handleGenerate: () => void;
    loading: boolean;
}
