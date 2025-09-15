import { Calendar, X } from "lucide-react";

interface AlertDetail {
  type: string;
  count: number;
}

interface BedAlert {
  bed: string;
  totalAlerts: number;
  alerts: AlertDetail[];
}

interface FallRiskAlertsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BedAlert[];
}

export const FallRiskAlertsDetailModal = ({ isOpen, onClose, data }: FallRiskAlertsDetailModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 w-full max-w-4xl max-h-[80vh] overflow-y-auto custom-scrollbar">
        <div className="glass-card rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-semibold leading-none tracking-tight">Fall Risk Alerts</h3>
              </div>
              <div className="flex items-center bg-background/50 border border-border/50 rounded-sm px-4 py-2 space-x-2">
                <Calendar className="w-4 h-4 text-white" />
                <span className="text-sm text-white">Sep 14, 2025 11:08 - Sep 15, 2025 11:08</span>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-muted-foreground hover:text-foreground rounded-sm hover:bg-accent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="px-6 pb-6">
            {/* Alert Cards */}
            <div className="space-y-4">
              {data.map((bed, index) => (
                <div key={index} className="bg-background/50 text-card-foreground shadow-sm rounded-lg border border-border/50 p-4">
                  {/* Bed Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="inline-flex items-center bg-destructive text-destructive-foreground font-semibold text-xs py-0.5 px-2.5 border border-transparent rounded-full transition-colors">
                      {bed.bed}
                    </span>
                    <span className="text-foreground font-medium text-sm">{bed.totalAlerts} total alerts</span>
                  </div>

                  {/* Alert Details */}
                  <div className="space-y-2">
                    {bed.alerts.map((alert, alertIndex) => (
                      <div key={alertIndex} className="flex items-center justify-between p-2 bg-background/30 rounded">
                        <span className="text-foreground text-sm">{alert.type}</span>
                        <span className="inline-flex items-center bg-medical-caution/20 text-medical-caution font-semibold text-xs py-0.5 px-2.5 border border-transparent rounded-full transition-colors">
                          {alert.count} times
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
