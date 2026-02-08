import mapImage from "@/assets/map-dark.jpg";
import { cn } from "@/lib/utils";

interface LiveMapProps {
  className?: string;
  overlay?: React.ReactNode;
}

const LiveMap = ({ className, overlay }: LiveMapProps) => {
  return (
    <div className={cn("relative overflow-hidden rounded-xl border border-border", className)}>
      <img
        src={mapImage}
        alt="Live route map"
        className="h-full w-full object-cover"
      />
      {/* Map overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30" />
      
      {/* Live indicator */}
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-background/80 px-3 py-1.5 backdrop-blur-sm border border-border/50">
        <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
        <span className="text-xs font-semibold text-foreground">LIVE</span>
      </div>

      {overlay && (
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {overlay}
        </div>
      )}
    </div>
  );
};

export default LiveMap;
