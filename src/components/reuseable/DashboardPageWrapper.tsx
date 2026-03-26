import MeshBackground from "@/components/Homepage/MeshBackground"
import { ReactNode } from "react"

export default function DashboardPageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-background">
      <MeshBackground />
      <div className="absolute top-0 -left-24 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-24 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
}
