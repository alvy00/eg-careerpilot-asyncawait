import MeshBackground from "@/components/Homepage/MeshBackground";
import Navbar from "@/components/Homepage/Navbar";
import JourneySection from "@/components/Homepage/JourneySection";
import CTASection from "@/components/Homepage/CTASection";
import Footer from "@/components/Homepage/Footer";
import HeroBanner from "@/components/Homepage/Banner";
import SkillAnalyticsSection from "@/components/Homepage/skillsgap";

export default function Home() {
    return (
        <main className="relative min-h-screen overflow-hidden selection:bg-primary/30 text-white">
            <MeshBackground />

            <div className="relative z-10">
                <Navbar />
                <HeroBanner></HeroBanner>
                <SkillAnalyticsSection></SkillAnalyticsSection>
                <JourneySection />
                <CTASection />
                <Footer />
            </div>
        </main>
    );
}
