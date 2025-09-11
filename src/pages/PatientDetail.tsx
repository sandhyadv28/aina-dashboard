import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  ArrowLeft, 
  Camera, 
  Heart, 
  Activity, 
  Bed, 
  Clock, 
  User, 
  AlertTriangle,
  Shield,
  Brain,
  Zap,
  TrendingUp,
  Play,
  Maximize,
  Plus,
  Calendar,
  ChevronLeft,
  ChevronRight,
  UserPlus
} from "lucide-react";
import { Badge } from "../components/SharedComponents/badge";
import { Button } from "../components/SharedComponents/button";
import { VitalsDetailModal } from "../components/modals/VitalsDetailModal";
import { VideoSnippetModal } from "../components/modals/VideoSnippetModal";
import { AlertDetailModal } from "../components/modals/AlertDetailModal";
import { NoteDetailModal } from "../components/modals/NoteDetailModal";

const PatientDetail = () => {
  const { bedNumber } = useParams();
  const [newNote, setNewNote] = useState("");
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [showVitalsDetail, setShowVitalsDetail] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateFilter, setDateFilter] = useState("today");
  const [videoSnippetOverlay, setVideoSnippetOverlay] = useState<{isOpen: boolean, event?: any}>({isOpen: false});
  const [alertDetailModal, setAlertDetailModal] = useState<{isOpen: boolean, alert?: any}>({isOpen: false});
  const [noteDetailModal, setNoteDetailModal] = useState<{isOpen: boolean, note?: any}>({isOpen: false});

  // Convert bed-01 back to BED 01 format
  const displayBedNumber = bedNumber?.replace('-', ' ').toUpperCase() || "BED 01";

  // Generate trendline data for vitals
  const generateTrendData = () => {
    const data = [];
    for (let i = 23; i >= 0; i--) {
      const time = new Date();
      time.setHours(time.getHours() - i);
      data.push({
        time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        heartRate: 85 + Math.random() * 20 + Math.sin(i / 3) * 5,
        respiratoryRate: 18 + Math.random() * 8 + Math.sin(i / 4) * 3,
        spO2: 94 + Math.random() * 4 + Math.sin(i / 5) * 2
      });
    }
    return data;
  };

  const trendData = generateTrendData();

  // Fabricated patient data
  const patientData = {
    bedNumber: displayBedNumber,
    status: "critical",
    isNewPatient: displayBedNumber === "BED 02",
    admissionDate: "2024-01-20 08:30",
    vitals: {
      heartRate: { current: 92, trend: trendData },
      respiratoryRate: { current: 24, trend: trendData },
      spO2: { current: 94, trend: trendData }
    },
    currentAlerts: [
      { type: "Position Alert", severity: "critical", duration: "125 minutes", icon: Bed },
      { type: "Fall Risk", severity: "critical", score: "High", icon: TrendingUp },
      { type: "Pain Detected", severity: "caution", level: "Moderate", icon: AlertTriangle }
    ],
    events: [
      { id: 1, time: "14:23", type: "Position Change", description: "Supine to Left Lateral", hasVideo: true },
      { id: 2, time: "14:15", type: "Nurse Interaction", description: "Vitals check performed", hasVideo: true },
      { id: 3, time: "14:08", type: "Alert Triggered", description: "Fall risk detected", hasVideo: true },
      { id: 4, time: "13:45", type: "Position Alert", description: "No position change - 120 min", hasVideo: false },
      { id: 5, time: "13:30", type: "Medication", description: "Pain medication administered", hasVideo: true },
      { id: 6, time: "13:15", type: "Mask Adjustment", description: "Oxygen mask repositioned", hasVideo: true },
      { id: 7, time: "12:58", type: "Family Visit", description: "Family member arrived", hasVideo: true },
      { id: 8, time: "12:30", type: "Position Change", description: "Right Lateral to Supine", hasVideo: true }
    ],
    notes: [
      { id: 1, time: "14:20", author: "Dr. Smith", content: "Patient showing signs of agitation. Monitoring closely." },
      { id: 2, time: "13:45", author: "Nurse Jane", content: "Fall risk protocol initiated. Bed rails raised." },
      { id: 3, time: "12:15", author: "Dr. Wilson", content: "Pain management adjusted. Continue monitoring." }
    ],
    indicators: [
      { name: "Head of Bed Angle", value: "25°", target: "30°+", status: "caution" },
      { name: "Last Position Change", value: "125 min", target: "< 120 min", status: "critical" },
      { name: "Visual RASS Score", value: "-1", target: "0 to -2", status: "stable" },
      { name: "Hand Hygiene Compliance", value: "95%", target: "> 90%", status: "stable" },
      { name: "Oral Care", value: "12 hrs ago", target: "< 8 hrs", status: "caution" }
    ]
  };

  const handleDateChange = (direction: 'prev' | 'next' | 'today') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
      setDateFilter('custom');
    } else if (direction === 'next') {
      newDate.setDate(newDate.getDate() + 1);
      setDateFilter('custom');
    } else {
      setSelectedDate(new Date());
      setDateFilter('today');
      return;
    }
    setSelectedDate(newDate);
  };

  const getDateLabel = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (selectedDate.toDateString() === today.toDateString()) return "Today";
    if (selectedDate.toDateString() === yesterday.toDateString()) return "Yesterday";
    if (selectedDate.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    return selectedDate.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const openVideoSnippet = (event: any) => {
    setVideoSnippetOverlay({
      isOpen: true,
      event: {
        title: event.type,
        timestamp: event.time,
        description: event.description,
        bedNumber: patientData.bedNumber
      }
    });
  };

  const openAlertDetail = (alert: any) => {
    setAlertDetailModal({
      isOpen: true,
      alert: {
        title: alert.type,
        description: `${alert.type} has been active for ${alert.duration || alert.score || alert.level}`,
        timestamp: new Date().toLocaleTimeString(),
        severity: alert.severity,
        bedNumber: patientData.bedNumber,
        duration: alert.duration
      }
    });
  };

  const openNoteDetail = (note: any) => {
    setNoteDetailModal({
      isOpen: true,
      note: note
    });
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In real app, would save to backend
      setNewNote("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "stable": return "text-medical-stable";
      case "caution": return "text-medical-caution";
      case "critical": return "text-medical-critical";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBadge = (severity: string) => {
    switch (severity) {
      case "stable": return "btn-medical-stable";
      case "caution": return "btn-medical-caution";
      case "critical": return "btn-medical-critical";
      default: return "";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/patients">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold text-foreground">{patientData.bedNumber}</h1>
              <Badge className={getStatusBadge(patientData.status)}>
                {patientData.status.toUpperCase()}
              </Badge>
              {patientData.isNewPatient && (
                <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary">
                  <UserPlus className="w-3 h-3 mr-1" />
                  New Admission
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-GB', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })} {new Date().toLocaleTimeString()} UTC
            </p>
          </div>
        </div>
        
        {/* Date Filter */}
        <div className="flex flex-col items-end space-y-2">
          {patientData.admissionDate && (
            <p className="text-sm text-muted-foreground">
              Admitted on: {new Date(patientData.admissionDate).toLocaleDateString('en-GB', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })} {new Date(patientData.admissionDate).toLocaleTimeString()} UTC
            </p>
          )}
          <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleDateChange('prev')}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center space-x-2 min-w-[140px] justify-center">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{getDateLabel()}</span>
          </div>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleDateChange('next')}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          
          {dateFilter !== 'today' && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleDateChange('today')}
              className="text-xs"
            >
              Today
            </Button>
          )}
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Video and Vitals */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Feed */}
          <div className="glass-card rounded-lg">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Camera className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Live Video Feed</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Play className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center relative overflow-hidden">
                <Camera className="w-12 h-12 text-muted-foreground" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
                
                {/* Live indicator */}
                <div className="absolute top-4 left-4 flex items-center space-x-2 bg-medical-critical/90 text-white px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-sm font-medium">LIVE</span>
                </div>
                
                {/* Timestamp */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>

          {/* Vitals Graph */}
          <div className="glass-card rounded-lg cursor-pointer hover:scale-105 transition-transform" onClick={() => setShowVitalsDetail(true)}>
            <div className="p-6 border-b border-border">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Vitals</h3>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-3 gap-6">
                {/* Heart Rate */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Heart Rate</span>
                    <span className="text-2xl font-bold text-medical-critical">
                      {patientData.vitals.heartRate.current}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">BPM</div>
                  {/* Trendline chart */}
                  <div className="h-12">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData.slice(-8)}>
                        <Line 
                          type="monotone" 
                          dataKey="heartRate" 
                          stroke="hsl(var(--medical-critical))" 
                          strokeWidth={2}
                          dot={false}
                        />
                        <Tooltip 
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-card border border-border rounded-lg p-2 shadow-lg">
                                  <p className="text-xs">{`${Math.round(Number(payload[0].value))} BPM at ${label}`}</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Respiratory Rate */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Respiratory Rate</span>
                    <span className="text-2xl font-bold text-medical-caution">
                      {patientData.vitals.respiratoryRate.current}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">/min</div>
                  <div className="h-12">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData.slice(-8)}>
                        <Line 
                          type="monotone" 
                          dataKey="respiratoryRate" 
                          stroke="hsl(var(--medical-caution))" 
                          strokeWidth={2}
                          dot={false}
                        />
                        <Tooltip 
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-card border border-border rounded-lg p-2 shadow-lg">
                                  <p className="text-xs">{`${Math.round(Number(payload[0].value))}/min at ${label}`}</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* SpO2 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">SpO2</span>
                    <span className="text-2xl font-bold text-medical-caution">
                      {patientData.vitals.spO2.current}%
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">Oxygen</div>
                  <div className="h-12">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData.slice(-8)}>
                        <Line 
                          type="monotone" 
                          dataKey="spO2" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          dot={false}
                        />
                        <Tooltip 
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-card border border-border rounded-lg p-2 shadow-lg">
                                  <p className="text-xs">{`${Math.round(Number(payload[0].value))}% at ${label}`}</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Alerts and Info */}
        <div className="space-y-6">
          {/* Current Alerts */}
          <div className="glass-card rounded-lg">
            <div className="p-6 border-b border-border">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Active Alerts</h3>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {patientData.currentAlerts.map((alert, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-background/50 rounded-lg border border-border/50 cursor-pointer hover:bg-background/70 transition-colors"
                  onClick={() => openAlertDetail(alert)}
                >
                  <div className="flex items-start space-x-3">
                    <alert.icon className={`w-5 h-5 mt-0.5 ${
                      alert.severity === "critical" ? "text-medical-critical" : "text-medical-caution"
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{alert.type}</span>
                        <Badge 
                          variant={alert.severity === "critical" ? "destructive" : "secondary"}
                          className={alert.severity === "critical" ? "btn-medical-critical" : "btn-medical-caution"}
                        >
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {alert.duration || alert.score || alert.level}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Indicators */}
          <div className="glass-card rounded-lg">
            <div className="p-6 border-b border-border">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Clinical Indicators</h3>
              </div>
            </div>
            <div className="p-6 space-y-3">
              {patientData.indicators.map((indicator, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded">
                  <div>
                    <div className="font-medium text-sm">{indicator.name}</div>
                    <div className="text-xs text-muted-foreground">Target: {indicator.target}</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${getStatusColor(indicator.status)}`}>
                      {indicator.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row - Events and Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Events Log */}
        <div className="glass-card rounded-lg">
          <div className="p-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Event Log</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="h-80 overflow-y-auto custom-scrollbar">
              <div className="space-y-3">
                {patientData.events.map((event) => (
                  <div 
                    key={event.id}
                    className="p-3 bg-background/50 rounded-lg border border-border/50 cursor-pointer transition-all hover:bg-background/70 relative"
                    onMouseEnter={() => event.hasVideo && setHoveredEvent(event.id)}
                    onMouseLeave={() => setHoveredEvent(null)}
                    onClick={() => event.hasVideo && openVideoSnippet(event)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium">{event.type}</span>
                          {event.hasVideo && (
                            <Camera className="w-3 h-3 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{event.time}</span>
                    </div>
                    
                    {/* Video Preview on Hover */}
                    {hoveredEvent === event.id && event.hasVideo && (
                      <div className="absolute top-0 right-0 transform translate-x-full ml-2 z-10">
                        <div className="w-48 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center shadow-lg border border-border">
                          <Camera className="w-6 h-6 text-muted-foreground" />
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent rounded-lg" />
                          <div className="absolute bottom-1 left-1 text-xs text-white bg-black/70 px-1 rounded">
                            {event.time}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="glass-card rounded-lg">
          <div className="p-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Notes</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {/* Add Note */}
            <div className="space-y-3">
              <textarea
                placeholder="Add a note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 clinical-input"
              />
              <Button onClick={handleAddNote} className="btn-medical-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Note
              </Button>
            </div>

            {/* Existing Notes */}
            <div className="h-48 overflow-y-auto custom-scrollbar">
              <div className="space-y-3">
                {patientData.notes.map((note) => (
                  <div 
                    key={note.id} 
                    className="p-3 bg-background/50 rounded-lg border border-border/50 cursor-pointer hover:bg-background/70 transition-colors"
                    onClick={() => openNoteDetail(note)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{note.author}</span>
                      <span className="text-xs text-muted-foreground">{note.time}</span>
                    </div>
                    <p className="text-sm text-foreground">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Vitals Detail Overlay */}
      <VitalsDetailModal 
        isOpen={showVitalsDetail} 
        onClose={() => setShowVitalsDetail(false)} 
      />
      
      <VideoSnippetModal 
        isOpen={videoSnippetOverlay.isOpen}
        onClose={() => setVideoSnippetOverlay({isOpen: false})}
        event={videoSnippetOverlay.event}
      />
      
      <AlertDetailModal 
        isOpen={alertDetailModal.isOpen}
        onClose={() => setAlertDetailModal({isOpen: false})}
        alert={alertDetailModal.alert}
      />
      
      <NoteDetailModal 
        isOpen={noteDetailModal.isOpen}
        onClose={() => setNoteDetailModal({isOpen: false})}
        note={noteDetailModal.note}
      />
    </div>
  );
};

export default PatientDetail;