import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity, Cpu, MapPin, KeyRound, User, ShieldAlert,
  Clock, ShieldCheck, ShieldQuestion, Shield, Server,
} from "lucide-react";
import { usePredictRisk } from "@workspace/api-client-react";
import type { RiskResult } from "@workspace/api-client-react";
import { cn } from "@/lib/utils";
import { CyberCard, CyberInput, CyberSelect, CyberButton, CyberLabel, CyberBadge } from "@/components/ui/cyber-ui";
import { RiskGauge } from "@/components/RiskGauge";

const riskSchema = z.object({
  deviceType: z.enum(["Known", "Unknown"]),
  failedLoginAttempts: z.coerce.number().min(0, "Must be 0 or more"),
  vpnUsage: z.enum(["Yes", "No"]),
  userRole: z.enum(["User", "Admin"]),
  location: z.enum(["Normal", "Unusual"]),
  loginTime: z.enum(["Day", "Night"]),
});

type RiskFormValues = z.infer<typeof riskSchema>;

export default function Home() {
  const [result, setResult] = useState<RiskResult | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<RiskFormValues>({
    resolver: zodResolver(riskSchema),
    defaultValues: {
      deviceType: "Known",
      failedLoginAttempts: 0,
      vpnUsage: "No",
      userRole: "User",
      location: "Normal",
      loginTime: "Day",
    },
  });

  const predictMutation = usePredictRisk({
    mutation: {
      onSuccess: (data) => setResult(data),
      onError: (err) => console.error("Prediction failed:", err),
    },
  });

  const onSubmit = (data: RiskFormValues) => {
    setResult(null);
    predictMutation.mutate({ data });
  };

  const getDecisionIcon = (decision: string) => {
    switch (decision) {
      case "ALLOW": return <ShieldCheck className="w-8 h-8 text-success" />;
      case "MFA_REQUIRED": return <ShieldQuestion className="w-8 h-8 text-warning" />;
      case "BLOCK": return <ShieldAlert className="w-8 h-8 text-destructive" />;
      default: return <Shield className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-widest neon-text-primary mb-2">
            NEURO<span className="text-primary">TRUST</span> <span className="text-white/60 text-2xl md:text-3xl">AI RISK ENGINE</span>
          </h1>
          <p className="text-muted-foreground font-mono text-sm tracking-[0.15em] uppercase">
            Adaptive Identity Risk Intelligence // Configure parameters and analyze in real-time
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ─── LEFT: Input Panel ─── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5"
          >
            <CyberCard className="scanlines">
              <div className="flex items-center justify-between mb-6 border-b border-border/50 pb-4">
                <div className="flex items-center gap-3">
                  <Activity className="text-primary w-5 h-5" />
                  <h2 className="text-base font-bold text-white tracking-widest uppercase">Input Parameters</h2>
                </div>
                <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">ENV: SANDBOX</span>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <CyberLabel className="flex items-center gap-2"><Cpu className="w-3.5 h-3.5" /> Device Type</CyberLabel>
                    <CyberSelect {...register("deviceType")}>
                      <option value="Known">Known / Trusted Device</option>
                      <option value="Unknown">Unknown / New Device</option>
                    </CyberSelect>
                  </div>

                  <div>
                    <CyberLabel className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Location</CyberLabel>
                    <CyberSelect {...register("location")}>
                      <option value="Normal">Normal Behavior</option>
                      <option value="Unusual">Unusual / Impossible Travel</option>
                    </CyberSelect>
                  </div>

                  <div>
                    <CyberLabel className="flex items-center gap-2"><KeyRound className="w-3.5 h-3.5" /> Failed Login Attempts</CyberLabel>
                    <CyberInput type="number" min="0" {...register("failedLoginAttempts")} />
                    {errors.failedLoginAttempts && (
                      <span className="text-destructive text-xs font-mono mt-1 block">{errors.failedLoginAttempts.message}</span>
                    )}
                  </div>

                  <div>
                    <CyberLabel className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Login Time</CyberLabel>
                    <CyberSelect {...register("loginTime")}>
                      <option value="Day">Standard Hours (Day)</option>
                      <option value="Night">Off-Hours (Night)</option>
                    </CyberSelect>
                  </div>

                  <div>
                    <CyberLabel className="flex items-center gap-2"><ShieldAlert className="w-3.5 h-3.5" /> VPN Usage</CyberLabel>
                    <CyberSelect {...register("vpnUsage")}>
                      <option value="No">No VPN Detected</option>
                      <option value="Yes">VPN Active</option>
                    </CyberSelect>
                  </div>

                  <div>
                    <CyberLabel className="flex items-center gap-2"><User className="w-3.5 h-3.5" /> User Role</CyberLabel>
                    <CyberSelect {...register("userRole")}>
                      <option value="User">Standard User</option>
                      <option value="Admin">Administrator / Root</option>
                    </CyberSelect>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <CyberButton type="submit" className="w-full h-12 text-base" disabled={predictMutation.isPending}>
                    {predictMutation.isPending ? "Running ML Inference..." : "Analyze Risk"}
                  </CyberButton>
                </div>
              </form>
            </CyberCard>
          </motion.div>

          {/* ─── RIGHT: Output Panel ─── */}
          <div className="lg:col-span-7 space-y-5">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -24, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, type: "spring" }}
                  className="space-y-5"
                >
                  {/* Score + Decision row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {/* Gauge Card */}
                    <CyberCard className={cn(
                      "flex flex-col items-center text-center border-2 scanlines",
                      result.decision === "ALLOW" && "border-success/30",
                      result.decision === "MFA_REQUIRED" && "border-warning/30",
                      result.decision === "BLOCK" && "border-destructive/30",
                    )}>
                      <div className="w-full flex justify-between items-center mb-3">
                        <span className="text-xs font-mono text-muted-foreground uppercase">Risk Score</span>
                        <CyberBadge variant={
                          result.decision === "ALLOW" ? "success" :
                          result.decision === "MFA_REQUIRED" ? "warning" : "destructive"
                        }>
                          {result.riskLevel}
                        </CyberBadge>
                      </div>
                      <RiskGauge score={result.score} />
                    </CyberCard>

                    {/* Decision Card */}
                    <CyberCard className={cn(
                      "flex flex-col justify-between border-2",
                      result.decision === "ALLOW" && "border-success/30",
                      result.decision === "MFA_REQUIRED" && "border-warning/30",
                      result.decision === "BLOCK" && "border-destructive/30",
                    )}>
                      <div>
                        <p className="text-xs font-mono text-muted-foreground uppercase mb-2">Access Decision</p>
                        <div className="flex items-center gap-3 mb-4">
                          {getDecisionIcon(result.decision)}
                          <span className={cn(
                            "text-2xl font-display font-bold tracking-widest",
                            result.decision === "ALLOW" && "text-success neon-text-success",
                            result.decision === "MFA_REQUIRED" && "text-warning neon-text-warning",
                            result.decision === "BLOCK" && "text-destructive neon-text-destructive",
                          )}>
                            {result.decision.replace("_", " ")}
                          </span>
                        </div>
                      </div>

                      {/* Triggered factors summary */}
                      {result.reasons && result.reasons.length > 0 && (
                        <div className="space-y-1.5">
                          <p className="text-xs font-mono text-primary/80 uppercase tracking-widest">Triggered Signals</p>
                          {result.reasons.map((r, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.15 + i * 0.07 }}
                              className="flex items-center gap-2 text-xs font-mono text-foreground/80"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary/80 shrink-0" />
                              {r}
                            </motion.div>
                          ))}
                        </div>
                      )}
                      {result.reasons?.length === 0 && (
                        <p className="text-xs font-mono text-success">No risk signals detected.</p>
                      )}
                    </CyberCard>
                  </div>

                  {/* Why This Decision */}
                  <CyberCard>
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-4 h-4 text-primary" />
                      <h3 className="text-sm font-bold text-white tracking-widest uppercase">Why This Decision?</h3>
                    </div>
                    <p className="text-foreground/85 font-mono text-sm leading-relaxed bg-secondary/30 p-4 border-l-2 border-primary">
                      {result.whyDecision}
                    </p>
                  </CyberCard>

                  {/* Contributing Factors */}
                  {result.contributions && result.contributions.length > 0 && (
                    <CyberCard>
                      <div className="flex items-center gap-2 mb-4">
                        <Server className="w-4 h-4 text-primary" />
                        <h3 className="text-sm font-bold text-white tracking-widest uppercase">Contributing Factors</h3>
                      </div>
                      <div className="space-y-2.5">
                        {result.contributions.map((c, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-background/40 border border-border/50 cyber-clip gap-3"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/80" />
                                <span className="font-bold text-sm text-white tracking-wider">{c.factor}</span>
                              </div>
                              <p className="text-xs font-mono text-muted-foreground pl-3.5">{c.description}</p>
                            </div>
                            <CyberBadge variant={c.points > 15 ? "destructive" : c.points > 5 ? "warning" : "default"}>
                              +{c.points} pts
                            </CyberBadge>
                          </motion.div>
                        ))}
                      </div>
                    </CyberCard>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CyberCard className="min-h-[420px] flex flex-col items-center justify-center text-center p-12 opacity-50 border-dashed">
                    <ShieldQuestion className="w-16 h-16 text-primary/30 mb-4" />
                    <h3 className="text-xl font-display font-bold text-white mb-2 tracking-widest">Awaiting Analysis</h3>
                    <p className="text-muted-foreground font-mono text-sm max-w-xs">
                      Configure the identity parameters on the left and click "Analyze Risk" to generate a real-time risk profile.
                    </p>
                  </CyberCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
