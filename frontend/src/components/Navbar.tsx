import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Home, BarChart2, Info } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/insights", label: "Model Insights", icon: BarChart2 },
    { href: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          <div className="flex items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}images/logo.png`}
              alt="NeuroTrust"
              className="w-8 h-8 filter drop-shadow-[0_0_5px_hsla(var(--primary)/0.5)]"
            />
            <span className="font-display font-bold text-xl text-white tracking-widest uppercase">
              Neuro<span className="text-primary">Trust</span>
            </span>
          </div>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-mono tracking-widest uppercase transition-all duration-300 flex items-center gap-2",
                    isActive
                      ? "text-primary bg-primary/10 border-b-2 border-primary"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
                  )}
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </nav>
  );
}
