import { motion } from "framer-motion";
import { Link } from "wouter";
import { ShieldAlert, ShieldCheck, ShieldQuestion, ArrowLeft, Target, Server, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRiskStore } from "@/lib/store";
import { CyberCard, CyberBadge, CyberButton } from "@/components/ui/cyber-ui";
import { RiskGauge } from "@/components/RiskGauge";

export default function Dashboard() {
  const result = useRiskStore((state) => state.latestResult);

  if (!result) {
    return (
      <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center p-4">
        <CyberCard className="max-w-md w-full text-center py-12 border-dashed">
          <ShieldQuestion className="w-16 h-16 text-primary/30 mx-auto mb-6" />
          <h2 className="text-2xl font-display font-bold text-white mb-3 tracking-widest">NO DATA FOUND</h2>
          <p className="text-muted-foreground font-mono text-sm mb-8">
            Run an identity simulation first to generate a risk profile dashboard.
          </p>
          <Link href="/">
            <CyberButton>Go to Simulation</CyberButton>
          </Link>
        </CyberCard>
      </div>
    );
  }

  const getDecisionIcon = (decision: string) => {
    switch (decision) {
      case "ALLOW": return <ShieldCheck className="w-10 h-10 text-success" />;
      case "MFA_REQUIRED": return <ShieldQuestion className="w-10 h-10 text-warning" />;
      case "BLOCK": return <ShieldAlert className="w-10 h-10 text-destructive" />;
      default: return <Target className="w-10 h-10 text-primary" />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-widest neon-text-primary">
            RISK DASHBOARD
          </h1>
          <p className="text-muted-foreground font-mono text-sm uppercase mt-1">Real-time Analysis Output</p>
        </div>
        <Link href="/">
          <CyberButton className="h-10 px-4 text-sm bg-secondary hover:bg-secondary/80">
            <ArrowLeft className="w-4 h-4 mr-2" /> New Sim
          </CyberButton>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Status Panel */}
        <CyberCard className={cn(
          "lg:col-span-1 flex flex-col items-center justify-between text-center scanlines border-2",
          result.decision === "ALLOW" ? "border-success/30 shadow-[inset_0_0_50px_hsla(var(--success)/0.05)]" : "",
          result.decision === "MFA_REQUIRED" ? "border-warning/30 shadow-[inset_0_0_50px_hsla(var(--warning)/0.05)]" : "",
          result.decision === "BLOCK" ? "border-destructive/30 shadow-[inset_0_0_50px_hsla(var(--destructive)/0.05)]" : ""
        )}>
          <div className="w-full flex justify-between items-start mb-4">
            <span className="text-xs font-mono text-muted-foreground uppercase">Status</span>
            <CyberBadge variant={
              result.decision === "ALLOW" ? "success" : 
              result.decision === "MFA_REQUIRED" ? "warning" : "destructive"
            }>
              {result.decision.replace("_", " ")}
            </CyberBadge>
          </div>
          
          <div className="py-6 w-full">
            <RiskGauge score={result.score} />
          </div>

          <div className="w-full mt-4 p-4 bg-background/50 border border-border/50 cyber-clip flex items-center justify-center gap-4">
            {getDecisionIcon(result.decision)}
            <div className="text-left">
              <p className="text-xs font-mono text-muted-foreground uppercase">Recommended Action</p>
              <p className={cn(
                "font-bold text-lg tracking-widest uppercase",
                result.decision === "ALLOW" && "text-success neon-text-success",
                result.decision === "MFA_REQUIRED" && "text-warning neon-text-warning",
                result.decision === "BLOCK" && "text-destructive neon-text-destructive"
              )}>
                {result.decision.replace("_", " ")}
              </p>
            </div>
          </div>
        </CyberCard>

        {/* Explainability Panel */}
        <div className="lg:col-span-2 space-y-6">
          
          <CyberCard>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-white tracking-widest">WHY THIS DECISION?</h3>
            </div>
            <p className="text-foreground/90 font-mono text-sm leading-relaxed bg-secondary/30 p-4 border-l-2 border-primary">
              {result.whyDecision}
            </p>
          </CyberCard>

          <CyberCard>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-white tracking-widest">TOP CONTRIBUTING FACTORS</h3>
              </div>
            </div>

            <div className="space-y-3">
              {result.contributions && result.contributions.length > 0 ? (
                result.contributions.map((contribution, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-background/40 border border-border/50 cyber-clip gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-primary/80" />
                        <span className="font-bold text-white tracking-wider">{contribution.factor}</span>
                      </div>
                      <p className="text-xs font-mono text-muted-foreground pl-4">{contribution.description}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-mono text-muted-foreground">Impact</span>
                      <CyberBadge variant={contribution.points > 15 ? "destructive" : contribution.points > 5 ? "warning" : "default"}>
                        +{contribution.points} pts
                      </CyberBadge>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-6 text-center border border-dashed border-border/50">
                  <p className="text-sm font-mono text-muted-foreground">No significant risk factors contributed to this score.</p>
                </div>
              )}
            </div>
          </CyberCard>

        </div>
      </div>
    </div>
  );
}
