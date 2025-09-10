import { Activity } from "lucide-react";
import { Progress } from "../progress";

interface FallRiskItem {
  bed: string;
  alerts: number;
}

interface FallRiskWidgetProps {
  totalRisk: number;
  data: FallRiskItem[];
  onClick?: () => void;
}

export const FallRiskWidget = ({ totalRisk, data, onClick }: FallRiskWidgetProps) => {
  return (
    <div 
      className="glass-card cursor-pointer hover:scale-105 transition-transform rounded-lg border bg-card text-card-foreground shadow-sm" 
      onClick={onClick}
    >
      <div className="flex flex-col space-y-3 p-6">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="text-2xl font-semibold leading-none tracking-tight text-foreground">Fall Risk</h3>
        </div>
        <div className="text-2xl font-bold text-medical-critical text-center">{totalRisk}</div>
      </div>
      <div className="p-6 pt-0 space-y-3">
        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-foreground">{item.bed}</span>
              <span className="text-xs font-medium text-muted-foreground">{item.alerts} alerts</span>
            </div>
            <Progress 
              value={item.alerts} 
              max={15} 
            />
          </div>
        ))}
        <div className="text-xs text-muted-foreground cursor-pointer hover:underline text-center">
          +1 more
        </div>
      </div>
    </div>
  );
};
