import { useState, useRef, useEffect } from "react";
import { Clock, ChevronDown } from "lucide-react";

interface timePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const TimePicker = ({ value, onChange, className = "" }: timePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Generate time options for every 30 minutes
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        times.push({
          value: timeString,
          display: displayTime
        });
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTimeSelect = (timeValue: string) => {
    const selectedTime = timeOptions.find(option => option.value === timeValue);
    if (selectedTime) {
      onChange(selectedTime.display);
      setIsOpen(false);
    }
  };

  const formatDisplayValue = () => {
    if (value) {
      return value;
    }
    return "Select time";
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <div
        className="w-full pl-8 pr-3 py-2 text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-w-[110px] cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <span className="text-foreground">{formatDisplayValue()}</span>
        </div>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-card border border-border rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto custom-scrollbar">
          <div className="p-2">
            {timeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleTimeSelect(option.value)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  value === option.display
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {option.display}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
