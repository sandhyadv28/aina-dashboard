import { useState } from "react";
import { Play, Pause, Volume2, Camera, Calendar, Clock, MapPin, Zap, X } from "lucide-react";
import { Button } from "../SharedComponents/button";
import { Badge } from "../SharedComponents/badge";
import { Slider } from "../SharedComponents/slider";

interface VideoSnippetModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: {
    title: string;
    timestamp: string;
    description: string;
    bedNumber: string;
    type?: string;
  };
}

export const VideoSnippetModal = ({ isOpen, onClose, event }: VideoSnippetModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);

  if (!event) return null;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 w-full max-w-4xl glass-card rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Camera className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <Badge variant="outline" className="ml-2">
                {event.bedNumber}
              </Badge>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Video Player */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center relative overflow-hidden">
              <Camera className="w-16 h-16 text-muted-foreground" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
              
              {/* Video Controls Overlay */}
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
                    <div className="w-1/3 bg-white rounded-full h-1" />
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
                  
                  <span className="text-white text-sm">1:23 / 2:45</span>
                </div>
              </div>
              
              {/* Timestamp */}
              <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                {event.timestamp}
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-2 gap-6">
            <div className="glass-card rounded-lg">
              <div className="p-6">
                <h3 className="font-semibold mb-4">Event Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{event.timestamp}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Duration: 2:45</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Camera: Room Overview</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">AI Confidence: 95%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-lg">
              <div className="p-6">
                <h3 className="font-semibold mb-4">Description</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
                <div className="mt-4">
                  <Badge variant="outline" className="text-xs">
                    Quality: 1080p
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};