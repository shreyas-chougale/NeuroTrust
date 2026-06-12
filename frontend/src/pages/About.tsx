import { CyberCard } from "@/components/ui/cyber-ui";
import { Shield, Lock, Zap, Cpu, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const steps = [
    { icon: Cpu, title: "Data Ingestion", desc: "Collects contextual signals: device, location, time, and network topology." },
    { icon: Zap, title: "ML Inference", desc: "Passes normalized data through a Random Forest ensemble model to calculate deviance." },
    { icon: Shield, title: "Risk Scoring", desc: "Outputs a deterministic risk score (0-100) and categorizes threat level." },
    { icon: Lock, title: "Automated Action", desc: "Triggers downstream identity provider to ALLOW, require MFA, or BLOCK access." }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-bold text-white tracking-widest neon-text-primary mb-4">
          SYSTEM ARCHITECTURE
        </h1>
        <div className="w-24 h-1 bg-primary mx-auto shadow-[0_0_10px_hsl(var(--primary))]" />
      </div>

      <div className="space-y-8">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <CyberCard className="bg-background/80">
            <h2 className="text-xl font-bold text-white tracking-widest mb-4 flex items-center gap-3">
              <span className="text-destructive font-mono">01 //</span> THE PROBLEM
            </h2>
            <p className="text-muted-foreground font-mono text-sm leading-relaxed border-l-2 border-destructive/50 pl-4 py-2">
              Static access control mechanisms rely purely on binary checks (e.g., correct password). They fail to account for context, making them highly vulnerable to credential theft, session hijacking, and insider threats. A stolen password grants full access regardless of anomalous behavior.
            </p>
          </CyberCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <CyberCard className="bg-background/80">
            <h2 className="text-xl font-bold text-white tracking-widest mb-4 flex items-center gap-3">
              <span className="text-primary font-mono">02 //</span> OUR SOLUTION
            </h2>
            <p className="text-muted-foreground font-mono text-sm leading-relaxed border-l-2 border-primary/50 pl-4 py-2">
              NeuroTrust implements an Adaptive AI-based identity risk scoring engine. By analyzing multiple vectors of telemetry in real-time, the system builds a behavioral profile and calculates a dynamic risk score for every authentication attempt. Security friction (like MFA) is only introduced when context dictates elevated risk.
            </p>
          </CyberCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-xl font-bold text-white tracking-widest mb-6 mt-12 flex items-center gap-3">
            <span className="text-white font-mono">03 //</span> WORKFLOW PIPELINE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative">
                  <CyberCard className="h-full flex flex-col items-center text-center p-6 border-border/30 hover:border-primary/50">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4 border border-border">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-xs font-mono text-muted-foreground">{step.desc}</p>
                  </CyberCard>
                  {idx < steps.length - 1 && (
                    <ArrowRight className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-border z-10" />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <CyberCard className="mt-12 bg-warning/5 border-warning/30">
            <h2 className="text-lg font-bold text-warning tracking-widest mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" /> PRIVACY & COMPLIANCE
            </h2>
            <p className="text-muted-foreground font-mono text-xs leading-relaxed">
              <strong>NOTICE:</strong> This demonstration utilizes synthetic, anonymized dataset profiles. No Real Personally Identifiable Information (PII) is processed or stored. The underlying architecture follows principle-of-least-privilege and data masking standards suitable for GDPR and SOC2 compliance environments.
            </p>
          </CyberCard>
        </motion.div>

      </div>
    </div>
  );
}
