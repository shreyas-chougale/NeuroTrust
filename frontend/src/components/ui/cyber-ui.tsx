import React, { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export function CyberCard({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative bg-card/80 backdrop-blur-md border border-border/50 p-6 cyber-clip",
        "before:absolute before:inset-0 before:border before:border-primary/20 before:cyber-clip before:pointer-events-none",
        "after:absolute after:top-0 after:left-0 after:w-20 after:h-[1px] after:bg-primary/50",
        "hover:neon-border-primary transition-all duration-500 group",
        className
      )}
      {...props}
    >
      <div className="absolute -top-[1px] right-10 w-10 h-[2px] bg-primary shadow-[0_0_8px_hsl(var(--primary))] z-10 transition-all duration-500 group-hover:w-20" />
      <div className="absolute -bottom-[1px] left-10 w-10 h-[2px] bg-primary shadow-[0_0_8px_hsl(var(--primary))] z-10 transition-all duration-500 group-hover:w-20" />
      {children}
    </div>
  );
}

export const CyberInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative group">
        <input
          type={type}
          className={cn(
            "flex h-12 w-full bg-input/50 border border-border/80 px-4 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground/50",
            "focus:outline-none focus:border-primary focus:bg-input/80 focus:neon-border-primary transition-all",
            "cyber-clip disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute bottom-0 left-4 w-0 h-[1px] bg-primary transition-all duration-300 group-focus-within:w-1/2" />
      </div>
    );
  }
);
CyberInput.displayName = "CyberInput";

export const CyberSelect = React.forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative group">
        <select
          className={cn(
            "flex h-12 w-full appearance-none bg-input/50 border border-border/80 px-4 py-2 text-sm font-mono text-foreground",
            "focus:outline-none focus:border-primary focus:bg-input/80 focus:neon-border-primary transition-all",
            "cyber-clip disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none group-focus-within:text-primary/100" />
        <div className="absolute bottom-0 left-4 w-0 h-[1px] bg-primary transition-all duration-300 group-focus-within:w-1/2" />
      </div>
    );
  }
);
CyberSelect.displayName = "CyberSelect";

export const CyberButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center h-12 px-8 font-display font-bold tracking-widest text-primary-foreground uppercase",
          "bg-primary cyber-clip-reverse overflow-hidden group transition-all duration-300",
          "hover:bg-primary/90 hover:shadow-[0_0_20px_hsla(var(--primary)/0.6)]",
          "active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
          className
        )}
        {...props}
      >
        <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  }
);
CyberButton.displayName = "CyberButton";

export function CyberLabel({ className, children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-xs font-mono font-medium text-primary/80 uppercase tracking-wider mb-2 block", className)}
      {...props}
    >
      {children}
    </label>
  );
}

export function CyberBadge({ 
  className, 
  variant = "default",
  children,
  ...props 
}: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "success" | "warning" | "destructive" | "outline" }) {
  
  const variants = {
    default: "bg-secondary text-primary border-primary/50",
    success: "bg-success/10 text-success border-success/50 shadow-[0_0_10px_hsla(var(--success)/0.2)]",
    warning: "bg-warning/10 text-warning border-warning/50 shadow-[0_0_10px_hsla(var(--warning)/0.2)]",
    destructive: "bg-destructive/10 text-destructive border-destructive/50 shadow-[0_0_10px_hsla(var(--destructive)/0.2)]",
    outline: "bg-transparent text-muted-foreground border-border",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider border cyber-clip",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
