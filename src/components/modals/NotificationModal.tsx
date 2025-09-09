import { useState } from "react";
import { X, Bell, CheckCircle, AlertTriangle, Clock, Users } from "lucide-react";
import { Badge } from "../SharedComponents/badge";
import { Button } from "../SharedComponents/button";

interface Notification {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  message: string;
  time: string;
  bedNumber?: string;
  acknowledged?: boolean;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal = ({ isOpen, onClose }: NotificationModalProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "critical",
      title: "Fall Risk Alert",
      message: "Patient fall risk detected - immediate attention required",
      time: "2 min ago",
      bedNumber: "BED 12",
      acknowledged: false
    },
    {
      id: "2",
      type: "critical",
      title: "Position Alert",
      message: "No position change for 125 minutes",
      time: "3 min ago",
      bedNumber: "BED 03",
      acknowledged: false
    },
    {
      id: "3",
      type: "warning",
      title: "Mask Removed",
      message: "Patient mask has been removed",
      time: "8 min ago",
      bedNumber: "BED 07",
      acknowledged: true
    },
    {
      id: "4",
      type: "critical",
      title: "Seizure Detection",
      message: "Abnormal movement patterns detected",
      time: "12 min ago",
      bedNumber: "BED 11",
      acknowledged: false
    },
    {
      id: "5",
      type: "warning",
      title: "Delirium Change",
      message: "Patient agitation level has increased",
      time: "15 min ago",
      bedNumber: "BED 05",
      acknowledged: true
    },
    {
      id: "6",
      type: "info",
      title: "New Patient Admitted",
      message: "Patient assigned to bed",
      time: "18 min ago",
      bedNumber: "BED 02",
      acknowledged: false
    },
    {
      id: "7",
      type: "warning",
      title: "Hand Hygiene",
      message: "Infection control protocol reminder",
      time: "22 min ago",
      bedNumber: "BED 12",
      acknowledged: true
    },
    {
      id: "8",
      type: "info",
      title: "System Update",
      message: "AI model analysis completed successfully",
      time: "25 min ago",
      acknowledged: false
    }
  ]);

  const acknowledgeNotification = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, acknowledged: true } : notif
      )
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-medical-critical" />;
      case "warning":
        return <Clock className="w-5 h-5 text-medical-caution" />;
      case "info":
        return <Users className="w-5 h-5 text-primary" />;
      default:
        return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case "critical":
        return "btn-medical-critical";
      case "warning":
        return "btn-medical-caution";
      case "info":
        return "bg-primary text-primary-foreground";
      default:
        return "";
    }
  };

  const unacknowledgedCount = notifications.filter(n => !n.acknowledged).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-2xl max-h-[80vh] flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-row items-start justify-between space-y-0 pb-4 relative p-6">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-primary" />
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Notifications</h3>
              {unacknowledgedCount > 0 && (
                <Badge className="btn-medical-critical">
                  {unacknowledgedCount} new
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Recent alerts and system notifications
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-3 right-5">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-hidden p-6 pt-0">
          <div className="h-full overflow-y-auto custom-scrollbar">
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-all ${notification.acknowledged
                      ? 'bg-background/30 border-border/30 opacity-70'
                      : 'bg-background/50 border-border/50 hover:bg-background/70'
                    }`}
                >
                  <div className="flex items-start justify-between space-x-3">
                    <div className="flex items-start space-x-3 flex-1">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm">{notification.title}</span>
                          {notification.bedNumber && (
                            <Badge variant="outline" className="text-xs">
                              {notification.bedNumber}
                            </Badge>
                          )}
                          <Badge className={`text-xs ${getNotificationBadge(notification.type)}`}>
                            {notification.type.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {notification.acknowledged ? (
                        <CheckCircle className="w-4 h-4 text-medical-stable" />
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => acknowledgeNotification(notification.id)}
                          className="text-xs"
                        >
                          Acknowledge
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};