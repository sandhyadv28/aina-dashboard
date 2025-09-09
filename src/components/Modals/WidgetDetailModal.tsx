import React from "react";
import { X } from "lucide-react";
import { Button } from "../SharedComponents/button";

interface WidgetDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  events: Array<{
    id: string;
    timestamp: string;
    description: string;
    value: number;
    type: string;
  }>;
}

export const WidgetDetailModal: React.FC<WidgetDetailModalProps> = ({
  isOpen,
  onClose,
  title,
  events
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-50 w-full max-w-2xl max-h-[80vh] overflow-y-auto custom-scrollbar">
        <div className="glass-card rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">{title}</h3>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="p-4 rounded-lg bg-background/50 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">{event.timestamp}</span>
                    <span className="text-sm font-bold text-primary">{event.value}</span>
                  </div>
                  <p className="text-sm">{event.description}</p>
                  <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
