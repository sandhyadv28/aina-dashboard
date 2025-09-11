import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Heart, Activity, Thermometer, Gauge, TrendingUp, X } from "lucide-react";
import { Button } from "../SharedComponents/button";

interface VitalsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VitalsDetailModal = ({ isOpen, onClose }: VitalsDetailModalProps) => {
  const [timeFilter, setTimeFilter] = useState("24h");

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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium mb-2">{`Time: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${Number(entry.value).toFixed(1)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 w-full max-w-7xl glass-card max-h-[85vh] overflow-y-auto custom-scrollbar rounded-lg">
        <div className="p-6 border-b border-border">
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
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex space-x-2 mt-4">
            {["3h", "6h", "12h", "24h"].map((filter) => (
              <Button
                key={filter}
                variant={timeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeFilter(filter)}
                className={timeFilter === filter ? "btn-medical-primary" : ""}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Current Readings */}
          <div className="glass-card rounded-lg">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold">Current Readings</h3>
            </div>
            <div className="p-6">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card rounded-lg">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-semibold">Heart Rate Trend</h3>
              </div>
              <div className="p-6">
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

            <div className="glass-card rounded-lg">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-semibold">SpO2 Trend</h3>
              </div>
              <div className="p-6">
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