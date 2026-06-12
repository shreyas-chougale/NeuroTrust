import { useGetFeatureImportance } from "@workspace/api-client-react";
import { CyberCard, CyberBadge } from "@/components/ui/cyber-ui";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Brain, Network, Database, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

// Custom Tooltip for the Recharts BarChart to match theme
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-md border border-border/80 p-3 shadow-xl cyber-clip">
        <p className="text-xs font-bold text-white uppercase mb-1">{label}</p>
        <p className="text-sm font-mono text-primary">
          Weight: {(payload[0].value * 100).toFixed(1)}%
        </p>
      </div>
    );
  }
  return null;
};

export default function Insights() {
  const { data, isLoading, error } = useGetFeatureImportance();

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="flex flex-col items-center text-primary">
          <Loader2 className="w-12 h-12 animate-spin mb-4" />
          <p className="font-mono text-sm tracking-widest uppercase">Loading Model Data...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <CyberCard className="text-center border-destructive/50">
          <p className="text-destructive font-mono">Failed to load model insights.</p>
        </CyberCard>
      </div>
    );
  }

  // Sort features by importance for the chart
  const sortedFeatures = [...data.features].sort((a, b) => b.importance - a.importance);

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white tracking-widest neon-text-primary">
          MODEL INSIGHTS
        </h1>
        <p className="text-muted-foreground font-mono text-sm uppercase mt-1">AI Engine Architecture & Feature Weights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Model Metadata */}
        <CyberCard className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 bg-secondary/20">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded border border-primary/20">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Architecture</p>
              <p className="text-sm text-white font-medium">{data.modelInfo}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded border border-primary/20">
              <Database className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Training Set</p>
              <p className="text-sm text-white font-medium">{data.trainedOn}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-success/10 rounded border border-success/20">
              <Network className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Status</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm text-success font-bold tracking-widest">ONLINE & ACTIVE</span>
              </div>
            </div>
          </div>
        </CyberCard>

        {/* Chart */}
        <CyberCard className="lg:col-span-2 min-h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-white tracking-widest mb-6">FEATURE IMPORTANCE</h3>
          <div className="flex-1 w-full relative">
            {/* Grid overlay for aesthetic */}
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
            
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedFeatures}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis 
                  type="number" 
                  domain={[0, 1]} 
                  tickFormatter={(val) => `${(val * 100).toFixed(0)}%`}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  fontFamily="Fira Code"
                />
                <YAxis 
                  dataKey="label" 
                  type="category" 
                  width={120}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  fontFamily="Fira Code"
                  tick={{fill: 'hsl(var(--foreground))'}}
                />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--secondary))', opacity: 0.4}} />
                <Bar dataKey="importance" radius={[0, 4, 4, 0]} barSize={24}>
                  {sortedFeatures.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsla(var(--primary) / ${0.5 + (entry.importance * 0.5)})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CyberCard>

        {/* Feature Explanations */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-bold text-white tracking-widest mb-2 px-2">VARIABLES DEFINED</h3>
          
          {sortedFeatures.map((feature, idx) => (
            <motion.div 
              key={feature.feature}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 bg-background/50 border border-border/40 cyber-clip relative overflow-hidden group hover:border-primary/50 transition-colors"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 group-hover:bg-primary transition-colors" />
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-sm text-white tracking-wider">{feature.label}</span>
                <CyberBadge variant="outline" className="text-[10px] py-0 px-2 h-5">
                  W: {(feature.importance * 100).toFixed(1)}%
                </CyberBadge>
              </div>
              <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                {getFeatureDescription(feature.feature)}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

// Helper to provide static descriptions for the known features
function getFeatureDescription(featureKey: string) {
  const descriptions: Record<string, string> = {
    failedLoginAttempts: "Frequency of failed authentications. High velocity indicates brute-force or credential stuffing attacks.",
    location: "Geographic origin of request. Compares current IP location against historical baseline to detect impossible travel.",
    deviceType: "Cryptographic signature of the hardware. Unknown or emulated devices significantly raise risk profile.",
    vpnUsage: "Detection of known anonymizing proxies, TOR nodes, or commercial VPNs used to mask true origin.",
    loginTime: "Temporal baseline comparison. Access during anomalous hours (e.g., 3AM local time) increases risk score.",
    userRole: "Privilege level multiplier. Administrative accounts carry higher base risk due to blast radius of compromise."
  };
  return descriptions[featureKey] || "Analyzes behavioral patterns to determine statistical deviation from norm.";
}
