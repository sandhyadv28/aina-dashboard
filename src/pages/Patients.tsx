import {
  Activity,
  AlertTriangle,
  Bed,
  Brain,
  Camera,
  Heart,
  Shield,
  TrendingUp,
  UserPlus,
  Zap
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "../components/SharedComponents/badge";
import { Button } from "../components/SharedComponents/button";
import { Label } from "../components/SharedComponents/label";
import SelectDropdown from "../components/SharedComponents/selectDropdown";
import { Switch } from "../components/SharedComponents/switch";

type PatientStatus = "stable" | "caution" | "critical" | "empty";
type AlertType = "position" | "mask" | "seizure" | "delirium" | "fall" | "pain" | "infection";

interface PatientData {
  bedNumber: string;
  status: PatientStatus;
  vitals: {
    heartRate: number;
    respiratoryRate: number;
    spO2: number;
  };
  alerts: {
    type: AlertType;
    label: string;
    icon: any;
    active: boolean;
  }[];
  lastUpdate: string;
  isNewPatient?: boolean;
  admissionDate?: string;
}

const Patients = () => {
  const [videoMode, setVideoMode] = useState(false);
  const [statusFilter, setStatusFilter] = useState<PatientStatus | "all">("all");

  // Fabricated patient data with empty beds and new patients
  const patients: PatientData[] = [
    {
      bedNumber: "BED 03",
      status: "critical",
      vitals: { heartRate: 92, respiratoryRate: 24, spO2: 94 },
      alerts: [
        { type: "position", label: "Position Alert: 125 min", icon: Bed, active: true },
        { type: "fall", label: "Fall Risk", icon: TrendingUp, active: true }
      ],
      lastUpdate: "30 sec ago"
    },
    {
      bedNumber: "BED 11",
      status: "critical",
      vitals: { heartRate: 105, respiratoryRate: 28, spO2: 92 },
      alerts: [
        { type: "seizure", label: "Seizure Detected", icon: Zap, active: true },
        { type: "pain", label: "Pain Detected", icon: AlertTriangle, active: true }
      ],
      lastUpdate: "15 sec ago"
    },
    {
      bedNumber: "BED 05",
      status: "caution",
      vitals: { heartRate: 85, respiratoryRate: 22, spO2: 96 },
      alerts: [
        { type: "delirium", label: "Delirium Change", icon: Brain, active: true }
      ],
      lastUpdate: "1 min ago"
    },
    {
      bedNumber: "BED 07",
      status: "caution",
      vitals: { heartRate: 88, respiratoryRate: 20, spO2: 95 },
      alerts: [
        { type: "mask", label: "Mask Removed", icon: Shield, active: true }
      ],
      lastUpdate: "2 min ago"
    },
    {
      bedNumber: "BED 09",
      status: "caution",
      vitals: { heartRate: 82, respiratoryRate: 21, spO2: 96 },
      alerts: [
        { type: "position", label: "Position Alert: 95 min", icon: Bed, active: true }
      ],
      lastUpdate: "1 min ago"
    },
    {
      bedNumber: "BED 12",
      status: "caution",
      vitals: { heartRate: 79, respiratoryRate: 19, spO2: 96 },
      alerts: [
        { type: "infection", label: "Hand Hygiene", icon: Shield, active: true }
      ],
      lastUpdate: "3 min ago"
    },
    {
      bedNumber: "BED 01",
      status: "stable",
      vitals: { heartRate: 72, respiratoryRate: 18, spO2: 98 },
      alerts: [],
      lastUpdate: "2 min ago"
    },
    {
      bedNumber: "BED 02",
      status: "stable",
      vitals: { heartRate: 68, respiratoryRate: 16, spO2: 97 },
      alerts: [],
      lastUpdate: "1 min ago",
      isNewPatient: true,
      admissionDate: "2024-01-20 08:30"
    },
    {
      bedNumber: "BED 04",
      status: "stable",
      vitals: { heartRate: 76, respiratoryRate: 19, spO2: 99 },
      alerts: [],
      lastUpdate: "3 min ago"
    },
    {
      bedNumber: "BED 06",
      status: "stable",
      vitals: { heartRate: 70, respiratoryRate: 17, spO2: 98 },
      alerts: [],
      lastUpdate: "4 min ago"
    },
    {
      bedNumber: "BED 08",
      status: "stable",
      vitals: { heartRate: 74, respiratoryRate: 18, spO2: 97 },
      alerts: [],
      lastUpdate: "5 min ago"
    },
    {
      bedNumber: "BED 10",
      status: "stable",
      vitals: { heartRate: 69, respiratoryRate: 16, spO2: 99 },
      alerts: [],
      lastUpdate: "2 min ago"
    },
    {
      bedNumber: "BED 13",
      status: "empty",
      vitals: { heartRate: 0, respiratoryRate: 0, spO2: 0 },
      alerts: [],
      lastUpdate: "Empty"
    },
    {
      bedNumber: "BED 14",
      status: "empty",
      vitals: { heartRate: 0, respiratoryRate: 0, spO2: 0 },
      alerts: [],
      lastUpdate: "Empty"
    },
    {
      bedNumber: "BED 15",
      status: "empty",
      vitals: { heartRate: 0, respiratoryRate: 0, spO2: 0 },
      alerts: [],
      lastUpdate: "Empty"
    }
  ];

  // Sort patients: critical first, then caution, then stable, then empty, then by bed number
  const sortedPatients = [...patients].sort((a, b) => {
    const statusOrder = { critical: 0, caution: 1, stable: 2, empty: 3 };
    const statusDiff = statusOrder[a.status] - statusOrder[b.status];
    if (statusDiff !== 0) return statusDiff;
    return a.bedNumber.localeCompare(b.bedNumber);
  });

  // Filter patients based on selected filter
  const filteredPatients = statusFilter === "all"
    ? sortedPatients
    : sortedPatients.filter(p => p.status === statusFilter);

  const getCardClassName = (status: PatientStatus, isNewPatient?: boolean) => {
    const baseClass = "cursor-pointer transition-all duration-300 hover:scale-105";
    switch (status) {
      case "stable":
        return `${baseClass} patient-card-stable ${isNewPatient ? 'ring-2 ring-primary ring-opacity-50' : ''}`;
      case "caution":
        return `${baseClass} patient-card-caution`;
      case "critical":
        return `${baseClass} patient-card-critical`;
      case "empty":
        return `${baseClass} bg-muted/30 opacity-60`;
      default:
        return `${baseClass} glass-card`;
    }
  };

  const getStatusBadge = (status: PatientStatus) => {
    switch (status) {
      case "stable":
        return "btn-medical-stable";
      case "caution":
        return "btn-medical-caution";
      case "critical":
        return "btn-medical-critical";
      case "empty":
        return "bg-muted text-muted-foreground";
      default:
        return "";
    }
  };

  const statusCounts = {
    critical: patients.filter(p => p.status === "critical").length,
    caution: patients.filter(p => p.status === "caution").length,
    stable: patients.filter(p => p.status === "stable").length,
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header with Video Mode Toggle and Filter */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-6">
          {/* Status Filter Dropdown */}
          <div className="flex items-center space-x-2">
            <Label htmlFor="status-filter" className="text-sm font-medium">
              Filter:
            </Label>
            <SelectDropdown
              values={[
                { value: "all", label: `All Patients (${patients.length})` },
                { value: "critical", label: `Critical (${statusCounts.critical})` },
                { value: "caution", label: `Caution (${statusCounts.caution})` },
                { value: "stable", label: `Stable (${statusCounts.stable})` }
              ]}
              value={statusFilter}
              onChange={(value: string) => setStatusFilter(value as PatientStatus | "all")}
              placeholder="Filter patients"
            />
          </div>

          {statusFilter !== "all" && (
            <Badge variant="outline" className="text-xs">
              Filtered: {statusFilter} ({filteredPatients.length})
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <Label htmlFor="video-mode" className="text-sm font-medium">
            Video Mode
          </Label>
          <Switch
            id="video-mode"
            checked={videoMode}
            onCheckedChange={setVideoMode}
          />
        </div>
      </div>

      {/* Patient Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPatients.map((patient) => (
          <Link
            key={patient.bedNumber}
            to={patient.status !== "empty" ? `/patient/${patient.bedNumber.replace(' ', '-').toLowerCase()}` : "#"}
            className={patient.status === "empty" ? "pointer-events-none" : ""}
          >
            <div className={`${getCardClassName(patient.status, patient.isNewPatient)} h-80`}>
              <div className="p-6 h-full flex flex-col">
                {patient.status === "empty" ? (
                  /* Empty Bed Layout */
                  <div className="text-center space-y-4 flex-1 flex flex-col justify-center">
                    <Bed className="w-12 h-12 text-muted-foreground mx-auto" />
                    <div>
                      <h3 className="text-xl font-bold text-muted-foreground">{patient.bedNumber}</h3>
                      <p className="text-sm text-muted-foreground">Empty Bed</p>
                    </div>
                  </div>
                ) : videoMode ? (
                  /* Video Mode Layout */
                  <div className="flex flex-col h-full space-y-3">
                    {/* Simulated Video Feed */}
                    <div className="flex-1 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <Camera className="w-8 h-8 text-muted-foreground" />
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />

                      {/* New Patient Indicator */}
                      {patient.isNewPatient && (
                        <div className="absolute top-2 left-2 bg-primary/90 text-white px-2 py-1 rounded">
                          <UserPlus className="w-3 h-3" />
                        </div>
                      )}

                      {/* Video Overlay - Alerts */}
                      {patient.alerts.length > 0 && (
                        <div className="absolute top-2 right-2 flex flex-col space-y-1">
                          {patient.alerts.slice(0, 2).map((alert, index) => (
                            <div key={index} className="flex items-center space-x-1 bg-black/70 text-white px-2 py-1 rounded text-xs">
                              <alert.icon className="w-3 h-3" />
                              <span className="truncate max-w-20">{alert.type}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Bed Number Overlay */}
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-3 py-1 rounded font-bold">
                        {patient.bedNumber}
                      </div>
                    </div>

                    {/* Bottom Row: Vitals and Status */}
                    <div className="flex items-center justify-between">
                      {/* Vitals Display */}
                      <div className="flex space-x-2 text-xs">
                        <div className="flex items-center space-x-1 p-1 bg-background/50 rounded">
                          <Heart className="w-3 h-3 text-medical-critical" />
                          <span className="font-medium">{patient.vitals.heartRate}</span>
                        </div>
                        <div className="flex items-center space-x-1 p-1 bg-background/50 rounded">
                          <Activity className="w-3 h-3 text-primary" />
                          <span className="font-medium">{patient.vitals.respiratoryRate}</span>
                        </div>
                        <div className="flex items-center space-x-1 p-1 bg-background/50 rounded">
                          <span className="font-medium">{patient.vitals.spO2}%</span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <Badge className={`${getStatusBadge(patient.status)} text-xs`}>
                        {patient.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  /* Data Mode Layout */
                  <div className="h-full flex flex-col justify-between space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-2xl font-bold text-foreground">{patient.bedNumber}</h3>
                        {patient.isNewPatient && (
                          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary p-1">
                            <UserPlus className="w-3 h-3" />
                          </Badge>
                        )}
                      </div>
                      <Badge className={getStatusBadge(patient.status)}>
                        {patient.status.toUpperCase()}
                      </Badge>
                    </div>

                    {/* Vitals */}
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center p-2 bg-background/50 rounded">
                        <div className="flex items-center justify-center space-x-1">
                          <Heart className="w-3 h-3 text-medical-critical" />
                          <span className="font-medium">{patient.vitals.heartRate}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">BPM</div>
                      </div>
                      <div className="text-center p-2 bg-background/50 rounded">
                        <div className="flex items-center justify-center space-x-1">
                          <Activity className="w-3 h-3 text-primary" />
                          <span className="font-medium">{patient.vitals.respiratoryRate}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">RR</div>
                      </div>
                      <div className="text-center p-2 bg-background/50 rounded">
                        <div className="flex items-center justify-center space-x-1">
                          <span className="font-medium">{patient.vitals.spO2}%</span>
                        </div>
                        <div className="text-xs text-muted-foreground">SpO2</div>
                      </div>
                    </div>

                    {/* Active Alerts */}
                    <div className="flex-1 overflow-hidden">
                      {patient.alerts.length > 0 ? (
                        <div className="space-y-2">
                          {patient.alerts.slice(0, 2).map((alert, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <alert.icon className="w-4 h-4 text-medical-caution" />
                              <span className="text-muted-foreground truncate">{alert.label}</span>
                            </div>
                          ))}
                          {patient.alerts.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{patient.alerts.length - 2} more alerts
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-xs text-muted-foreground">No active alerts</div>
                      )}
                    </div>

                    {/* Last Update */}
                    <div className="text-xs text-muted-foreground mt-auto">
                      Updated {patient.lastUpdate}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Clear Filter Button */}
      {statusFilter !== "all" && (
        <div className="text-center">
          <Button variant="outline" onClick={() => setStatusFilter("all")}>
            Show All Patients ({patients.length})
          </Button>
        </div>
      )}
    </div>
  );
};

export default Patients;