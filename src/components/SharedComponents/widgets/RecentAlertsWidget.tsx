import { AlertTriangle, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../badge";

interface Alert {
  id: number;
  bed: string;
  type: string;
  severity: "critical" | "caution";
  time: string;
}

interface RecentAlertsWidgetProps {
  data: Alert[];
  onClick?: () => void;
}

export const RecentAlertsWidget = ({ data, onClick }: RecentAlertsWidgetProps) => {
  return (
    <div className="glass-card rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold leading-none tracking-tight text-foreground">Recent Active Alerts</h3>
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-4">
          {data.map((alert) => (
            <Link key={alert.id} to={`/patient/${alert.bed.replace(' ', '-').toLowerCase()}`}>
              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50 cursor-pointer hover:bg-background/70 transition-all">
                <div className="flex items-center space-x-4">
                  <Badge
                    variant={alert.severity === "critical" ? "destructive" : "secondary"}
                    className={alert.severity === "critical" ? "btn-medical-critical" : "btn-medical-caution"}
                  >
                    {alert.bed}
                  </Badge>
                  <div>
                    <p className="font-medium text-foreground text-sm">{alert.type}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
                <Heart className={`w-5 h-5 ${alert.severity === "critical" ? "text-medical-critical animate-pulse" : "text-medical-caution"
                  }`} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
