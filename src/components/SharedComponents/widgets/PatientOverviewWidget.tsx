import { Users } from "lucide-react";

interface PatientOverviewData {
  totalPatients: number;
  critical: number;
  caution: number;
  stable: number;
}

interface PatientOverviewWidgetProps {
  data: PatientOverviewData;
  onClick?: () => void;
}

export const PatientOverviewWidget = ({ data, onClick }: PatientOverviewWidgetProps) => {
  return (
    <div 
      className="glass-card cursor-pointer hover:scale-105 transition-transform rounded-lg border bg-card text-card-foreground shadow-sm" 
      onClick={onClick}
    >
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold leading-none tracking-tight text-foreground">Patient Overview</h3>
        </div>
      </div>
      <div className="p-6 pt-0 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-muted-foreground">Total Patients</span>
          <span className="text-xl font-bold text-foreground">{data.totalPatients}</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-medical-critical"></div>
              <span className="text-xs font-medium text-foreground">Critical</span>
            </div>
            <span className="text-xs font-bold text-foreground">{data.critical}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-medical-caution"></div>
              <span className="text-xs font-medium text-foreground">Caution</span>
            </div>
            <span className="text-xs font-bold text-foreground">{data.caution}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-medical-stable"></div>
              <span className="text-xs font-medium text-foreground">Stable</span>
            </div>
            <span className="text-xs font-bold text-foreground">{data.stable}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
