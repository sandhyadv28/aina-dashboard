import { Activity, ArrowLeft, Bell, MessageSquare, Settings as SettingsIcon, Shield } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/SharedComponents/button";
import { Label } from "../components/SharedComponents/label";
import { Input } from "../components/SharedComponents/input";
import { Switch } from "../components/SharedComponents/switch";
import { WhatsAppManagementModal } from "../components/modals/WhatsAppManagementModal";

interface AlertSetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: any;
}

interface WhatsAppUser {
  id: string;
  name: string;
  phone: string;
  role: string;
  timeFrom: string;
  timeTo: string;
}

const Settings = () => {
  const [alertSettings, setAlertSettings] = useState<AlertSetting[]>([
    {
      id: "position",
      name: "Patient Position Alerts",
      description: "Alerts when patients haven't changed position for 90/120 minutes",
      enabled: true,
      icon: Activity
    },
    {
      id: "mask",
      name: "Mask On/Off Detection",
      description: "Detects when patients remove required masks",
      enabled: true,
      icon: Shield
    },
    {
      id: "seizure",
      name: "Seizure Detection",
      description: "Detects abnormal high-frequency movements consistent with seizures",
      enabled: true,
      icon: Activity
    },
    {
      id: "delirium",
      name: "Delirium Monitoring",
      description: "Monitors patient agitation levels and RASS scores",
      enabled: true,
      icon: Activity
    },
    {
      id: "fall",
      name: "Fall Risk Detection",
      description: "Detects fall risk before falls occur",
      enabled: true,
      icon: Activity
    },
    {
      id: "pain",
      name: "Pain Detection",
      description: "Detects visual pain indicators and alerts for medication needs",
      enabled: true,
      icon: Activity
    },
    {
      id: "infection",
      name: "Infection Control Monitoring",
      description: "Monitors hand hygiene and PPE compliance",
      enabled: true,
      icon: Shield
    },
    {
      id: "tube",
      name: "Tube Disconnection Detection",
      description: "Detects ventilator tube disconnections",
      enabled: true,
      icon: Activity
    },
    {
      id: "breathing",
      name: "Work of Breathing Analysis",
      description: "Monitors respiratory patterns and work of breathing",
      enabled: false,
      icon: Activity
    },
    {
      id: "clabsi",
      name: "CLABSI Prevention Monitoring",
      description: "Monitors central line infection prevention protocols",
      enabled: true,
      icon: Shield
    },
    {
      id: "vap",
      name: "VAP Prevention Monitoring",
      description: "Monitors ventilator-associated pneumonia prevention",
      enabled: true,
      icon: Shield
    },
    {
      id: "response",
      name: "Response Time Tracking",
      description: "Measures clinical response times to events",
      enabled: true,
      icon: Activity
    }
  ]);

  const [whatsAppEnabled, setWhatsAppEnabled] = useState(true);
  const [whatsAppUsers, setWhatsAppUsers] = useState<WhatsAppUser[]>([
    { id: "1", name: "Dr. Sarah Wilson", phone: "+1 (555) 123-4567", role: "Attending Physician", timeFrom: "08:00", timeTo: "18:00" },
    { id: "2", name: "Nurse Manager Kate", phone: "+1 (555) 234-5678", role: "Nurse Manager", timeFrom: "06:00", timeTo: "18:00" },
    { id: "3", name: "Dr. Michael Chen", phone: "+1 (555) 345-6789", role: "Resident Doctor", timeFrom: "09:00", timeTo: "17:00" }
  ]);
  const [showWhatsAppManagement, setShowWhatsAppManagement] = useState(false);

  const toggleAlert = (id: string) => {
    setAlertSettings(prev =>
      prev.map(setting =>
        setting.id === id
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  const addWhatsAppUser = (user: Omit<WhatsAppUser, 'id'>) => {
    const newUser: WhatsAppUser = {
      id: Date.now().toString(),
      ...user
    };
    setWhatsAppUsers(prev => [...prev, newUser]);
  };

  const removeWhatsAppUser = (id: string) => {
    setWhatsAppUsers(prev => prev.filter(user => user.id !== id));
  };


  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Settings</h1>
          <p className="text-muted-foreground">Configure alert preferences and monitoring options</p>
        </div>
      </div>

      {/* Alert Thresholds */}
      <div className="glass-card rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Alert Thresholds</h3>
          </div>
          <p className="text-sm text-muted-foreground">Configure sensitivity levels for different alert types</p>
        </div>
        <div className="p-6 pt-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Position Alert - Warning (minutes)</Label>
              <Input type="number" defaultValue="90" className="clinical-input" />
            </div>
            <div className="space-y-2">
              <Label>Position Alert - Critical (minutes)</Label>
              <Input type="number" defaultValue="120" className="clinical-input" />
            </div>
            <div className="space-y-2">
              <Label>Heart Rate - High Threshold</Label>
              <Input type="number" defaultValue="100" className="clinical-input" />
            </div>
            <div className="space-y-2">
              <Label>SpO2 - Low Threshold (%)</Label>
              <Input type="number" defaultValue="95" className="clinical-input" />
            </div>
            <div className="space-y-2">
              <Label>Response Time - Target (minutes)</Label>
              <Input type="number" defaultValue="5" className="clinical-input" />
            </div>
            <div className="space-y-2">
              <Label>Hand Hygiene - Min Compliance (%)</Label>
              <Input type="number" defaultValue="90" className="clinical-input" />
            </div>
          </div>
        </div>
      </div>

      {/* AI Model Configuration */}
      <div className="glass-card rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="text-2xl font-semibold leading-none tracking-tight">AI Model Configuration</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Enable or disable specific AI models and their corresponding alerts.
            Changes take effect immediately across all monitoring views.
          </p>
        </div>
        <div className="p-6 pt-0 space-y-4">
          {alertSettings.map((setting) => (
            <div
              key={setting.id}
              className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50 hover:bg-background/70 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${setting.enabled ? 'bg-primary/10' : 'bg-muted/50'}`}>
                  <setting.icon className={`w-5 h-5 ${setting.enabled ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={setting.id} className="font-medium cursor-pointer">
                      {setting.name}
                    </Label>
                    {!setting.enabled && (
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        DISABLED
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {setting.description}
                  </p>
                </div>
              </div>
              <Switch
                id={setting.id}
                checked={setting.enabled}
                onCheckedChange={() => toggleAlert(setting.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="glass-card rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Notification Preferences</h3>
          </div>
          <p className="text-sm text-muted-foreground">Configure how and when you receive notifications</p>
        </div>
        <div className="p-6 pt-0 space-y-4">
          {/* WhatsApp Notifications */}
          <div className="p-4 bg-background/50 rounded-lg border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-green-500" />
                <div>
                  <Label className="font-medium">WhatsApp Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send critical alerts via WhatsApp</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowWhatsAppManagement(true)}
                  className="text-muted-foreground hover:text-foreground"
                  disabled={!whatsAppEnabled}
                >
                  <SettingsIcon className="w-4 h-4" />
                </Button>
                <Switch
                  checked={whatsAppEnabled}
                  onCheckedChange={setWhatsAppEnabled}
                />
              </div>
            </div>
            {whatsAppEnabled && (
              <div className="mt-3 pt-3 border-t border-border/30">
                <div className="text-sm text-muted-foreground">
                  {whatsAppUsers.length} user{whatsAppUsers.length !== 1 ? 's' : ''} configured
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Display and Audio Preferences */}
      <div className="glass-card rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center space-x-2">
            <SettingsIcon className="w-5 h-5 text-primary" />
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Display and Audio Preferences</h3>
          </div>
        </div>
        <div className="p-6 pt-0 space-y-4">
          {/* Other Preferences */}
          <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50">
            <div>
              <Label className="font-medium">Auto-refresh Dashboard</Label>
              <p className="text-sm text-muted-foreground">Automatically refresh data every 30 seconds</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50">
            <div>
              <Label className="font-medium">Sound Notifications</Label>
              <p className="text-sm text-muted-foreground">Play audio alerts for critical events</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50">
            <div>
              <Label className="font-medium">High Contrast Mode</Label>
              <p className="text-sm text-muted-foreground">Enhanced visibility for alert indicators</p>
            </div>
            <Switch />
          </div>
        </div>
      </div>


      {/* Save Settings */}
      <div className="flex justify-end space-x-4">
        <Link to="/dashboard">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button className="btn-medical-primary">
          Save Settings
        </Button>
      </div>

      <WhatsAppManagementModal
        isOpen={showWhatsAppManagement}
        onClose={() => setShowWhatsAppManagement(false)}
        users={whatsAppUsers}
        onAddUser={addWhatsAppUser}
        onRemoveUser={removeWhatsAppUser}
      />
    </div>
  );
};

export default Settings;