import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RiskGaugeProps {
  score: number;
}

export function RiskGauge({ score }: RiskGaugeProps) {
  // SVG Geometry for a semi-circle arc
  const radius = 90;
  const strokeWidth = 16;
  const circumference = Math.PI * radius; // Half circle
  
  // Calculate stroke dash offset based on score (0-100)
  const normalizedScore = Math.min(Math.max(score, 0), 100);
  const fillPercentage = normalizedScore / 100;
  const strokeDashoffset = circumference - (fillPercentage * circumference);

  // Determine colors based on risk level
  let strokeColor = "hsl(var(--success))";
  let dropShadowColor = "hsla(var(--success) / 0.5)";
  
  if (normalizedScore >= 30 && normalizedScore <= 70) {
    strokeColor = "hsl(var(--warning))";
    dropShadowColor = "hsla(var(--warning) / 0.5)";
  } else if (normalizedScore > 70) {
    strokeColor = "hsl(var(--destructive))";
    dropShadowColor = "hsla(var(--destructive) / 0.5)";
  }

  return (
    <div className="relative w-full max-w-[300px] aspect-[2/1] mx-auto flex flex-col items-center justify-end overflow-hidden">
      <svg 
        viewBox="0 0 200 110" 
        className="w-full h-full drop-shadow-xl"
        style={{ filter: `drop-shadow(0 0 8px ${dropShadowColor})` }}
      >
        {/* Background Arc */}
        <path
          d={`M 10,100 A ${radius},${radius} 0 0,1 190,100`}
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="opacity-50"
        />
        
        {/* Fill Arc - Animated */}
        <motion.path
          d={`M 10,100 A ${radius},${radius} 0 0,1 190,100`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        />
        
        {/* Ticks/Markers */}
        {[30, 70].map((tick) => {
          const angle = Math.PI - (tick / 100) * Math.PI;
          const x1 = 100 + (radius - strokeWidth) * Math.cos(angle);
          const y1 = 100 - (radius - strokeWidth) * Math.sin(angle);
          const x2 = 100 + (radius + strokeWidth) * Math.cos(angle);
          const y2 = 100 - (radius + strokeWidth) * Math.sin(angle);
          return (
            <line 
              key={tick}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="hsl(var(--background))"
              strokeWidth="3"
            />
          );
        })}
      </svg>
      
      {/* Center Value Display */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <motion.span 
          className="text-5xl font-display font-bold leading-none text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
          style={{ textShadow: `0 0 15px ${dropShadowColor}` }}
        >
          {normalizedScore}
        </motion.span>
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-1">
          Risk Score
        </span>
      </div>
    </div>
  );
}
