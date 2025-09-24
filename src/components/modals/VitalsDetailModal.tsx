import { Activity, Gauge, Heart, Thermometer, TrendingUp, X } from "lucide-react";
import { useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DateRangePicker } from "../SharedComponents/datePicker";

interface VitalsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium mb-2">{`Time: ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`${entry.dataKey}-${index}`} className="text-sm" style={{ color: entry.color }}>
            {`${entry.dataKey}: ${Number(entry.value).toFixed(1)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const VitalsDetailModal = ({ isOpen, onClose }: VitalsDetailModalProps) => {
  const [selectedDateRange, setSelectedDateRange] = useState("Sep 23, 2025 14:17 - Sep 24, 2025 14:17");

  const generateVitalsData = () => {
    const data = [];
    const now = new Date();
    for (let i = 47; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 30 * 60 * 1000);
      data.push({
        timestamp: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        fullTimestamp: time,
        heartRate: 85 + Math.random() * 20 + Math.sin(i / 6) * 10,
        respiratoryRate: 18 + Math.random() * 8 + Math.sin(i / 8) * 3,
        spO2: 94 + Math.random() * 4 + Math.sin(i / 10) * 2,
        systolic: 115 + Math.random() * 20 + Math.sin(i / 12) * 8,
        diastolic: 70 + Math.random() * 15 + Math.sin(i / 12) * 5,
        temperature: 36.8 + Math.random() * 0.6 + Math.sin(i / 15) * 0.3
      });
    }
    return data;
  };

  const vitalsData = generateVitalsData();
  const latestVitals = vitalsData[vitalsData.length - 1];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <button
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-50 w-full max-w-7xl bg-background max-h-[85vh] overflow-y-auto custom-scrollbar rounded-lg">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Detailed Vitals Monitoring</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })} {new Date().toLocaleTimeString()} UTC
              </div>
              <button
                type="button"
                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
          </div>
          <div className="mt-4">
            <DateRangePicker
              value={selectedDateRange}
              onChange={setSelectedDateRange}
            />
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Current Readings */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm glass-card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Current Readings</h3>
            </div>
            <div className="p-6 pt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <Heart className="w-6 h-6 text-medical-critical mx-auto mb-2" />
                  <div className="text-2xl font-bold text-medical-critical">
                    {Math.round(latestVitals.heartRate)}
                  </div>
                  <div className="text-sm text-muted-foreground">Heart Rate (BPM)</div>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <Activity className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">
                    {Math.round(latestVitals.spO2)}%
                  </div>
                  <div className="text-sm text-muted-foreground">SpO2 (Oxygen)</div>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <Gauge className="w-6 h-6 text-medical-caution mx-auto mb-2" />
                  <div className="text-2xl font-bold text-medical-caution">
                    {Math.round(latestVitals.respiratoryRate)}
                  </div>
                  <div className="text-sm text-muted-foreground">Respiratory (/min)</div>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <Thermometer className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-500">
                    {latestVitals.temperature.toFixed(1)}°C
                  </div>
                  <div className="text-sm text-muted-foreground">Temperature</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trend Graphs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm glass-card">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">Heart Rate Trend</h3>
              </div>
              <div className="p-6 pt-0">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={vitalsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="timestamp" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="heartRate"
                        stroke="hsl(var(--medical-critical))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--medical-critical))", strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm glass-card">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">SpO2 Trend</h3>
              </div>
              <div className="p-6 pt-0">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={vitalsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="timestamp" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="spO2"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};