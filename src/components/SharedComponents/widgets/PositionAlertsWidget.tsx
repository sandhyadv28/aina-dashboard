import { Clock } from "lucide-react";

interface PositionAlert {
  bed: string;
  duration: string;
}

interface PositionAlertsWidgetProps {
  data: PositionAlert[];
  summary: string;
  onClick?: () => void;
}

export const PositionAlertsWidget = ({ data, summary, onClick }: PositionAlertsWidgetProps) => {
  return (
    <div 
      className="glass-card cursor-pointer hover:scale-105 transition-transform rounded-lg border bg-card text-card-foreground shadow-sm" 
      onClick={onClick}
    >
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold leading-none tracking-tight text-foreground">Position Alerts</h3>
        </div>
        <p className="text-xs text-muted-foreground">{summary}</p>
      </div>
      <div className="p-6 pt-0 space-y-3">
        {data.map((alert, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-medical-critical"></div>
              <span className="text-xs font-medium text-foreground">{alert.bed}</span>
            </div>
            <span className="text-xs text-muted-foreground">{alert.duration}</span>
          </div>
        ))}
        <div className="text-xs text-muted-foreground cursor-pointer hover:underline">
          +1 more
        </div>
      </div>
    </div>
  );
};
