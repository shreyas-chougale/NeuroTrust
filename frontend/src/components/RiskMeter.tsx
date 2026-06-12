import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RiskMeterProps {
  score: number;
}

export function RiskMeter({ score }: RiskMeterProps) {
  // Determine color based on score
  let colorClass = "bg-success shadow-[0_0_15px_hsla(var(--success)/0.6)]";
  let gradientClass = "from-success/20 to-success";
  
  if (score >= 30 && score <= 70) {
    colorClass = "bg-warning shadow-[0_0_15px_hsla(var(--warning)/0.6)]";
    gradientClass = "from-warning/20 to-warning";
  } else if (score > 70) {
    colorClass = "bg-destructive shadow-[0_0_15px_hsla(var(--destructive)/0.6)]";
    gradientClass = "from-destructive/20 to-destructive";
  }

  // Cap score at 100 for width rendering
  const fillWidth = Math.min(Math.max(score, 0), 100);

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-xs font-mono text-muted-foreground">
        <span>000</span>
        <span className="text-primary font-bold">SYS.RISK.LEVEL</span>
        <span>100</span>
      </div>
      
      <div className="relative h-6 w-full bg-secondary/50 border border-border cyber-clip overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.1) 50%)', backgroundSize: '10px 100%' }} />
        
        {/* Animated Fill */}
        <motion.div
          className={cn("absolute top-0 left-0 h-full bg-gradient-to-r", gradientClass)}
          initial={{ width: 0 }}
          animate={{ width: `${fillWidth}%` }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        >
          <div className={cn("absolute right-0 top-0 bottom-0 w-2", colorClass)} />
        </motion.div>
        
        {/* Markers */}
        <div className="absolute left-[30%] top-0 bottom-0 w-[1px] bg-border/80 z-10" />
        <div className="absolute left-[70%] top-0 bottom-0 w-[1px] bg-border/80 z-10" />
      </div>
    </div>
  );
}
