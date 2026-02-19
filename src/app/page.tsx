import HeroBanner from "@/components/Homepage/Banner";
import CollaborationSection from "@/components/Homepage/Collaboration";
import CTASection from "@/components/Homepage/CTASection";
import Footer from "@/components/Homepage/Footer";
import JourneySection from "@/components/Homepage/JourneySection";
import MeshBackground from "@/components/Homepage/MeshBackground";
import Navbar from "@/components/Homepage/Navbar";
import PrecisionTools from "@/components/Homepage/PrecisionTools";
import TalkToMentor from "@/components/Homepage/TalkToMentor";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden selection:bg-primary/30 text-white">
      <MeshBackground />

      <div className="relative z-10">
        <Navbar />
        <HeroBanner></HeroBanner>
        <CollaborationSection></CollaborationSection>
        <TalkToMentor></TalkToMentor>
        <PrecisionTools />
        <JourneySection />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
