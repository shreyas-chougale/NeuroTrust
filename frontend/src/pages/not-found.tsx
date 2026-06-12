import { Link } from "wouter";
import { CyberCard, CyberButton } from "@/components/ui/cyber-ui";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center p-4">
      <CyberCard className="max-w-md w-full text-center py-12 border-destructive/50">
        <AlertTriangle className="w-20 h-20 text-destructive mx-auto mb-6 drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]" />
        <h1 className="text-5xl font-display font-bold text-white mb-2 tracking-widest">404</h1>
        <h2 className="text-xl font-bold text-destructive mb-4 tracking-widest">SECTOR NOT FOUND</h2>
        <p className="text-muted-foreground font-mono text-sm mb-8">
          The requested route does not exist in the current system registry.
        </p>
        <Link href="/">
          <CyberButton className="bg-secondary text-white hover:bg-secondary/80">
            Return to Simulation
          </CyberButton>
        </Link>
      </CyberCard>
    </div>
  );
}
