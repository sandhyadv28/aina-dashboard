import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

interface AlertTrend {
  type: string;
  trend: "up" | "down";
  change: number;
  color: string;
}

interface AlertTrendsWidgetProps {
  data: AlertTrend[];
  onClick?: () => void;
}

export const AlertTrendsWidget = ({ data, onClick }: AlertTrendsWidgetProps) => {
  return (
    <div 
      className="glass-card cursor-pointer hover:scale-105 transition-transform rounded-lg border bg-card text-card-foreground shadow-sm" 
      onClick={onClick}
    >
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold leading-none tracking-tight text-foreground">Alert Trends</h3>
        </div>
      </div>
      <div className="p-6 pt-0 space-y-4">
        {data.map((trend, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {trend.trend === "up" ? (
                <TrendingUp className={`w-4 h-4 ${trend.color}`} />
              ) : (
                <TrendingDown className={`w-4 h-4 ${trend.color}`} />
              )}
              <span className="text-xs font-medium text-foreground">{trend.type}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className={`text-xs font-bold ${trend.color}`}>
                {trend.trend === "up" ? "+" : "-"}{trend.change}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
