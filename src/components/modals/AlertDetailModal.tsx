import { useState } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  Camera, 
  Calendar, 
  Clock, 
  MapPin, 
  Zap,
  AlertTriangle,
  CheckCircle,
  User,
  Bell,
  X
} from "lucide-react";
import { Badge } from "../SharedComponents/badge";
import { Button } from "../SharedComponents/button";
import { Slider } from "../SharedComponents/slider";

interface AlertDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  alert?: {
    title: string;
    description: string;
    timestamp: string;
    severity: string;
    bedNumber: string;
    duration?: string;
  };
}

export const AlertDetailModal = ({ isOpen, onClose, alert }: AlertDetailModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [showVideoEvidence, setShowVideoEvidence] = useState(true);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-medical-critical";
      case "caution": return "text-medical-caution";
      default: return "text-muted-foreground";
    }
  };

  const notifiedUsers = [
    { name: "Dr. Smith", role: "Attending", acknowledged: true, time: "2 min ago" },
    { name: "Nurse Jane", role: "Primary Nurse", acknowledged: true, time: "1 min ago" },
    { name: "Nurse Mike", role: "Support Nurse", acknowledged: false, time: "Just now" },
    { name: "Dr. Wilson", role: "Resident", acknowledged: false, time: "Just now" }
  ];

  if (!alert) return null;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 w-full max-w-6xl glass-card max-h-[85vh] overflow-y-auto custom-scrollbar rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className={`w-5 h-5 ${getSeverityColor(alert.severity)}`} />
              <h2 className="text-xl font-semibold">{alert.title}</h2>
              <Badge 
                variant={alert.severity === "critical" ? "destructive" : "secondary"}
                className={alert.severity === "critical" ? "btn-medical-critical" : "btn-medical-caution"}
              >
                {alert.severity.toUpperCase()}
              </Badge>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Video Evidence */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card rounded-lg">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Video Evidence</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowVideoEvidence(!showVideoEvidence)}
                    >
                      {showVideoEvidence ? "Hide" : "Show"}
                    </Button>
                  </div>
                </div>
                {showVideoEvidence && (
                  <div className="p-6">
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <Camera className="w-16 h-16 text-muted-foreground" />
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
                      
                      {/* Video Controls */}
                      <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="text-white hover:bg-white/20"
                          >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          
                          <div className="flex-1 bg-white/20 rounded-full h-1">
                            <div className="w-1/4 bg-white rounded-full h-1" />
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Volume2 className="w-4 h-4 text-white" />
                            <div className="w-20">
                              <Slider
                                value={volume}
                                onValueChange={setVolume}
                                max={100}
                                step={1}
                                className="slider-white"
                              />
                            </div>
                          </div>
                          
                          <span className="text-white text-sm">0:45 / 3:20</span>
                        </div>
                      </div>
                      
                      {/* Alert Badge */}
                      <div className="absolute top-4 left-4 bg-medical-critical/90 text-white px-3 py-1 rounded-full">
                        <span className="text-sm font-medium">ALERT TRIGGERED</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{alert.timestamp}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>Duration: {alert.duration || "3:20"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>Camera: Bedside View</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-muted-foreground" />
                      <span>AI Confidence: 97%</span>
                    </div>
                  </div>
                  </div>
                )}
              </div>

              {/* Alert Description */}
              <div className="glass-card rounded-lg">
                <div className="p-6 border-b border-border">
                  <h3 className="text-lg font-semibold">Alert Details</h3>
                </div>
                <div className="p-6">
                <p className="text-muted-foreground">{alert.description}</p>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-medical-critical">1</div>
                    <div className="text-sm text-muted-foreground">Active Alerts</div>
                  </div>
                  <div className="text-center p-3 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">4</div>
                    <div className="text-sm text-muted-foreground">Notifications Sent</div>
                  </div>
                  <div className="text-center p-3 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-medical-stable">2</div>
                    <div className="text-sm text-muted-foreground">Acknowledged</div>
                  </div>
                </div>
                </div>
              </div>
            </div>

            {/* Right Column - Notifications */}
            <div className="space-y-6">
              <div className="glass-card rounded-lg">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Notifications</h3>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                {notifiedUsers.map((user, index) => (
                  <div key={index} className="p-3 bg-background/50 rounded-lg border border-border/50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <User className="w-4 h-4 mt-1 text-muted-foreground" />
                        <div>
                          <div className="font-medium text-sm">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.role}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Notified {user.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {user.acknowledged ? (
                          <CheckCircle className="w-4 h-4 text-medical-stable" />
                        ) : (
                          <Clock className="w-4 h-4 text-medical-caution" />
                        )}
                        <span className={`text-xs ${
                          user.acknowledged ? "text-medical-stable" : "text-medical-caution"
                        }`}>
                          {user.acknowledged ? "Ack" : "Pending"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};