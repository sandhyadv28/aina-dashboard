import { Clock, X } from "lucide-react";

interface BedStatus {
  bed: string;
  position: string;
  isOverdue: boolean;
  durationInPosition: string;
  lastPositionChange: string;
  dueChange: string;
  overdueBy?: string;
}

interface PositionAlertsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BedStatus[];
}

export const PositionAlertsDetailModal = ({ isOpen, onClose, data }: PositionAlertsDetailModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 w-full max-w-4xl max-h-[80vh] overflow-y-auto custom-scrollbar">
        <div className="glass-card rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-semibold leading-none tracking-tight">Position Alerts</h3>
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

            {/* Bed Status Cards */}
            <div className="space-y-4">
              {data.map((bed, index) => (
                <div key={index} className="bg-card text-card-foreground shadow-sm rounded-lg border p-4">
                  {/* Bed Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="inline-flex items-center text-foreground font-medium text-sm py-0.5 px-2.5 border rounded-full transition-colors">{bed.bed}</span>
                      <span className="inline-flex items-center bg-secondary text-secondary-foreground font-semibold text-sm py-0.5 px-2.5 border border-transparent rounded-full transition-colors">
                        {bed.position}
                      </span>
                      {bed.isOverdue && (
                        <span className="inline-flex items-center bg-destructive text-destructive-foreground font-semibold text-xs py-0.5 px-2.5 border border-transparent rounded-full transition-colors">
                          Overdue
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-gray-400">Duration in Position</div>
                      <div className="flex items-center space-x-1 text-white">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-sm">{bed.durationInPosition}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bed Details */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Last Position Change</div>
                      <div className="text-white text-sm">{bed.lastPositionChange}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Due Change</div>
                      <div className={bed.isOverdue ? "text-medical-critical" : "text-white"}>
                        {bed.dueChange}
                      </div>
                    </div>
                  </div>

                  {/* Overdue Bar */}
                  {bed.isOverdue && bed.overdueBy && (
                    <div className="mt-3 bg-medical-critical/10 border border-medical-critical/20 rounded-md p-2 text-sm">
                      <span className="text-medical-critical font-medium">Overdue by {bed.overdueBy}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
