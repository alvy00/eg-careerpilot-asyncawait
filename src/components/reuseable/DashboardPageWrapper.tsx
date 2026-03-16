import MeshBackground from "@/components/Homepage/MeshBackground"
import { ReactNode } from "react"

export default function DashboardPageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-[#030712]">
      <MeshBackground />
      <div className="absolute top-0 -left-24 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-24 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
}
