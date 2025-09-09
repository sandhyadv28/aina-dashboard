import {
    Activity,
    AlertTriangle,
    Bed,
    Clock,
    Filter,
    Heart,
    RefreshCw,
    TrendingDown,
    TrendingUp,
    Users
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "../components/SharedComponents/badge";
import { Progress } from "../components/SharedComponents/progress";

const Dashboard = () => {
    const [selectedTimeRange, setSelectedTimeRange] = useState<"6h" | "12h" | "24h" | "7d">("24h");
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
        { id: 1, bed: "BED 03", type: "Position Alert", severity: "critical", time: "2 min ago" },
        { id: 2, bed: "BED 12", type: "Fall Risk", severity: "critical", time: "8 min ago" },
        { id: 3, bed: "BED 07", type: "Patient Absent", severity: "caution", time: "5 min ago" },
        { id: 4, bed: "BED 18", type: "Delirium Change", severity: "caution", time: "12 min ago" },
        { id: 5, bed: "BED 22", type: "Pain Detected", severity: "caution", time: "15 min ago" }
    ];


    const patientOverview = {
        totalPatients: 12,
        critical: 2,
        caution: 4,
        stable: 6
    };

    const alertTrends = [
        { type: "Position Change", change: 12, trend: "up", color: "text-medical-critical" },
        { type: "Patient Absent", change: 8, trend: "down", color: "text-medical-stable" },
        { type: "Fall Risk", change: 5, trend: "up", color: "text-medical-critical" }
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
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm px-4 py-2">
                    <div className="flex items-center space-x-2">
                        <Filter className="w-4 h-4 text-foreground" />
                        <span className="text-foreground font-medium text-sm">Sep 08, 2025 13:41 - Sep 09, 2025 13:41</span>
                    </div>
                </div>

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
                                <p className="text-xs font-medium text-muted-foreground">Total Patients</p>
                                <p className="text-4xl font-bold text-foreground">{unitStats.totalPatients}</p>
                            </div>
                            <Users className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                </div>

                <div className="glass-card rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-muted-foreground">Critical Alerts</p>
                                <p className="text-4xl font-bold text-medical-critical">{unitStats.criticalAlerts}</p>
                            </div>
                            <AlertTriangle className="w-8 h-8 text-medical-critical animate-pulse" />
                        </div>
                    </div>
                </div>

                <div className="glass-card rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-muted-foreground">Empty Beds</p>
                                <p className="text-4xl font-bold text-foreground">{unitStats.emptyBeds}</p>
                            </div>
                            <Bed className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* Patient Overview */}
                <div className="glass-card cursor-pointer hover:scale-105 transition-transform rounded-lg border bg-card text-card-foreground shadow-sm" onClick={() => handleWidgetClick("Patient Overview")}>
                    <div className="flex flex-col space-y-1.5 p-6">
                        <div className="flex items-center space-x-2">
                            <Users className="w-5 h-5 text-primary" />
                            <h3 className="text-xl font-semibold leading-none tracking-tight text-foreground">Patient Overview</h3>
                        </div>
                    </div>
                    <div className="p-6 pt-0 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-muted-foreground">Total Patients</span>
                            <span className="text-xl font-bold text-foreground">{patientOverview.totalPatients}</span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-medical-critical"></div>
                                    <span className="text-xs font-medium text-foreground">Critical</span>
                                </div>
                                <span className="text-xs font-bold text-foreground">{patientOverview.critical}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-medical-caution"></div>
                                    <span className="text-xs font-medium text-foreground">Caution</span>
                                </div>
                                <span className="text-xs font-bold text-foreground">{patientOverview.caution}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-medical-stable"></div>
                                    <span className="text-xs font-medium text-foreground">Stable</span>
                                </div>
                                <span className="text-xs font-bold text-foreground">{patientOverview.stable}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Alert Trends */}
                <div className="glass-card cursor-pointer hover:scale-105 transition-transform rounded-lg border bg-card text-card-foreground shadow-sm" onClick={() => handleWidgetClick("Alert Trends")}>
                    <div className="flex flex-col space-y-1.5 p-6">
                        <div className="flex items-center space-x-2">
                            <AlertTriangle className="w-5 h-5 text-primary" />
                            <h3 className="text-xl font-semibold leading-none tracking-tight text-foreground">Alert Trends</h3>
                        </div>
                    </div>
                    <div className="p-6 pt-0 space-y-4">
                        {alertTrends.map((trend, index) => (
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

                {/* Position Alerts */}
                <div className="glass-card cursor-pointer hover:scale-105 transition-transform rounded-lg border bg-card text-card-foreground shadow-sm" onClick={() => handleWidgetClick("Position Alerts")}>
                    <div className="flex flex-col space-y-1.5 p-6">
                        <div className="flex items-center space-x-2">
                            <Clock className="w-5 h-5 text-primary" />
                            <h3 className="text-xl font-semibold leading-none tracking-tight text-foreground">Position Alerts</h3>
                        </div>
                        <p className="text-xs text-muted-foreground">3 overdue, 4 total alerts</p>
                    </div>
                    <div className="p-6 pt-0 space-y-3">
                        {positionAlerts.map((alert, index) => (
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

                {/* Fall Risk */}
                <div className="glass-card cursor-pointer hover:scale-105 transition-transform rounded-lg border bg-card text-card-foreground shadow-sm" onClick={() => handleWidgetClick("Fall Risk")}>
                    <div className="flex flex-col space-y-1.5 p-6">
                        <div className="flex items-center space-x-2">
                            <Activity className="w-5 h-5 text-primary" />
                            <h3 className="text-xl font-semibold leading-none tracking-tight text-foreground">Fall Risk</h3>
                        </div>
                        <div className="text-4xl font-bold text-medical-critical">15</div>
                    </div>
                    <div className="p-6 pt-0 space-y-3">
                        {fallRiskData.map((item, index) => (
                            <div key={index} className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-foreground">{item.bed}</span>
                                    <span className="text-xs font-bold text-muted-foreground">{item.alerts} alerts</span>
                                </div>
                                <Progress value={(item.alerts / 5) * 100} className="h-2" />
                            </div>
                        ))}
                        <div className="text-xs text-muted-foreground cursor-pointer hover:underline">
                            +1 more
                        </div>
                    </div>
                </div>
            </div>


            {/* Recent Alerts */}
            <div className="glass-card rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 p-6">
                    <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-semibold leading-none tracking-tight text-foreground">Recent Active Alerts</h3>
                    </div>
                </div>
                <div className="p-6 pt-0">
                    <div className="space-y-4">
                        {recentAlerts.map((alert) => (
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

            {/* Widget Detail Modal - placeholder for future implementation */}
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