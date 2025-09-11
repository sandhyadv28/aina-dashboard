import { RefreshCw, Users, Bed, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { DateRangePicker } from "../components/modals/DateTimeRangeModal";
import { PatientOverviewWidget } from "../components/SharedComponents/widgets/PatientOverviewWidget";
import { AlertTrendsWidget } from "../components/SharedComponents/widgets/AlertTrendsWidget";
import { PositionAlertsWidget } from "../components/SharedComponents/widgets/PositionAlertsWidget";
import { FallRiskWidget } from "../components/SharedComponents/widgets/FallRiskWidget";
import { RecentAlertsWidget } from "../components/SharedComponents/widgets/RecentAlertsWidget";

const Dashboard = () => {
    const [selectedTimeRange, setSelectedTimeRange] = useState<string>("Sep 08, 2025 13:41 - Sep 09, 2025 13:41");
    const [showWidgetDetail, setShowWidgetDetail] = useState(false);
    const [selectedWidget, setSelectedWidget] = useState<string>("");

    const handleWidgetClick = (widgetName: string) => {
        setSelectedWidget(widgetName);
        setShowWidgetDetail(true);
    };

    const unitStats = {
        totalPatients: 12,
        criticalAlerts: 2,
        emptyBeds: 3,
        cautionAlerts: 4,
        stablePatients: 6,
        responseTime: "3.2 min",
        maskCompliance: 89,
        handHygiene: 94,
        riskScore: 2.3
    };

    const recentAlerts = [
        { id: 1, bed: "BED 03", type: "Position Alert", severity: "critical" as const, time: "2 min ago" },
        { id: 2, bed: "BED 12", type: "Fall Risk", severity: "critical" as const, time: "8 min ago" },
        { id: 3, bed: "BED 07", type: "Patient Absent", severity: "caution" as const, time: "5 min ago" },
        { id: 4, bed: "BED 18", type: "Delirium Change", severity: "caution" as const, time: "12 min ago" },
        { id: 5, bed: "BED 22", type: "Pain Detected", severity: "caution" as const, time: "15 min ago" }
    ];


    const patientOverview = {
        totalPatients: 12,
        critical: 2,
        caution: 4,
        stable: 6
    };

    const alertTrends = [
        { type: "Position Change", change: 12, trend: "up" as const, color: "text-medical-critical" },
        { type: "Patient Absent", change: 8, trend: "down" as const, color: "text-medical-stable" },
        { type: "Fall Risk", change: 5, trend: "up" as const, color: "text-yellow-500" }
    ];


    const positionAlerts = [
        { bed: "BED 03", duration: "6h 45m", overdue: true },
        { bed: "BED 07", duration: "6h 0m", overdue: true },
        { bed: "BED 12", duration: "4h 30m", overdue: true }
    ];

    const fallRiskData = [
        { bed: "BED 12", alerts: 5 },
        { bed: "BED 03", alerts: 4 },
        { bed: "BED 07", alerts: 3 }
    ];

    return (

        <div className="space-y-6 animate-fade-in-up">

            <div className="flex items-center justify-between">
                <DateRangePicker
                    value={selectedTimeRange}
                    onChange={setSelectedTimeRange}
                />

                <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground text-xs">Last updated: 09 Sept 2025 1:41:17 PM UTC</span>
                    <button className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent rounded-md text-muted-foreground hover:text-foreground text-xs h-7 px-2 gap-1.5">
                        <RefreshCw className="w-3 h-3" />
                        <span>Refresh</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
                                <p className="text-3xl font-bold text-foreground">{unitStats.totalPatients}</p>
                            </div>
                            <Users className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                </div>

                <div className="glass-card rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Critical Alerts</p>
                                <p className="text-3xl font-bold text-medical-critical">{unitStats.criticalAlerts}</p>
                            </div>
                            <AlertTriangle className="w-8 h-8 text-medical-critical animate-pulse" />
                        </div>
                    </div>
                </div>

                <div className="glass-card rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Empty Beds</p>
                                <p className="text-3xl font-bold text-foreground">{unitStats.emptyBeds}</p>
                            </div>
                            <Bed className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                <PatientOverviewWidget
                    data={patientOverview}
                    onClick={() => handleWidgetClick("Patient Overview")}
                />
                <AlertTrendsWidget
                    data={alertTrends}
                    onClick={() => handleWidgetClick("Alert Trends")}
                />
                <PositionAlertsWidget
                    data={positionAlerts}
                    summary="3 overdue, 4 total alerts"
                    onClick={() => handleWidgetClick("Position Alerts")}
                />
                <FallRiskWidget
                    totalRisk={15}
                    data={fallRiskData}
                    onClick={() => handleWidgetClick("Fall Risk")}
                />
            </div>


            <RecentAlertsWidget data={recentAlerts} />

            {showWidgetDetail && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowWidgetDetail(false)} />
                    <div className="relative z-50 w-full max-w-2xl max-h-[80vh] overflow-y-auto custom-scrollbar">
                        <div className="glass-card rounded-lg border bg-card text-card-foreground shadow-sm">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-semibold leading-none tracking-tight">{selectedWidget}</h3>
                                    <button
                                        onClick={() => setShowWidgetDetail(false)}
                                        className="p-1 text-muted-foreground hover:text-foreground rounded-sm hover:bg-accent"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 pt-0">
                                <p className="text-muted-foreground">Widget detail view for: {selectedWidget}</p>
                                <p className="text-sm text-muted-foreground mt-2">This feature will be implemented in the future.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;