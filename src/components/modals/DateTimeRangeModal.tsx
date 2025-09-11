import { useState, useRef, useEffect } from "react";
import { Calendar, Clock, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import type { DateRangePickerProps, QuickSelectOption } from "../SharedComponents/types";
import { quickSelectOptions } from "../SharedComponents/constants";
import { Button } from "../SharedComponents/button";

// Calendar helper functions
const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (month: number, year: number) => {
  return new Date(year, month, 1).getDay();
};

const getMonthName = (month: number) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[month];
};

const getShortMonthName = (month: number) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  return months[month];
};

// Calendar Component
const CalendarComponent = ({ 
  isFrom, 
  currentMonth, 
  currentYear, 
  onDateSelect, 
  onNavigateMonth 
}: {
  isFrom: boolean;
  currentMonth: number;
  currentYear: number;
  onDateSelect: (day: number, isFrom: boolean) => void;
  onNavigateMonth: (direction: 'prev' | 'next') => void;
}) => {

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isSelected = false;
    days.push(
      <button
        key={day}
        onClick={() => onDateSelect(day, isFrom)}
        className={`h-8 w-8 rounded-full text-sm transition-colors ${isSelected
            ? "bg-primary text-primary-foreground"
            : "text-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="absolute top-full left-0 mt-1 w-64 bg-card border border-border rounded-lg shadow-lg z-50 p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onNavigateMonth('prev')}
          className="p-1 hover:bg-accent rounded"
        >
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        </button>
        <h3 className="text-sm font-medium text-foreground">
          {getMonthName(currentMonth)} {currentYear}
        </h3>
        <button
          onClick={() => onNavigateMonth('next')}
          className="p-1 hover:bg-accent rounded"
        >
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="h-8 w-8 flex items-center justify-center text-xs text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
    </div>
  );
};

export const DateRangePicker = ({ value, onChange, className = "" }: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customFromDate, setCustomFromDate] = useState("Sep 09");
  const [customFromTime, setCustomFromTime] = useState("11:31 AM");
  const [customToDate, setCustomToDate] = useState("Sep 10");
  const [customToTime, setCustomToTime] = useState("11:31 AM");
  const [selectedQuickOption, setSelectedQuickOption] = useState<string>("24h");
  const [isCustomRange, setIsCustomRange] = useState(false);
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const dropdownRef = useRef<HTMLDivElement>(null);
  const fromDatePickerRef = useRef<HTMLDivElement>(null);
  const toDatePickerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (fromDatePickerRef.current && !fromDatePickerRef.current.contains(event.target as Node)) {
        setShowFromDatePicker(false);
      }
      if (toDatePickerRef.current && !toDatePickerRef.current.contains(event.target as Node)) {
        setShowToDatePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleQuickSelect = (option: QuickSelectOption) => {
    setSelectedQuickOption(option.value);
    setIsCustomRange(false);
    onChange(option.value);
    setIsOpen(false);
  };

  const handleCustomRangeApply = () => {
    const customValue = `${customFromDate}, 2025 ${customFromTime} - ${customToDate}, 2025 ${customToTime}`;
    onChange(customValue);
    setIsCustomRange(true);
    setIsOpen(false);
  };

  const handleDateSelect = (day: number, isFrom: boolean) => {
    const monthName = getShortMonthName(currentMonth);
    const formattedDate = `${monthName} ${day.toString().padStart(2, '0')}`;
    
    if (isFrom) {
      setCustomFromDate(formattedDate);
      setShowFromDatePicker(false);
    } else {
      setCustomToDate(formattedDate);
      setShowToDatePicker(false);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const formatDisplayValue = () => {
    if (isCustomRange) {
      return `${customFromDate}, 2025 ${customFromTime} - ${customToDate}, 2025 ${customToTime}`;
    }

    const option = quickSelectOptions.find(opt => opt.value === selectedQuickOption);
    if (option) {
      return option.label;
    }

    return value;
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <div
        className="rounded-lg border bg-card text-card-foreground shadow-sm px-4 py-2 cursor-pointer hover:bg-accent/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-foreground" />
          <span className="text-foreground font-medium text-sm">
            {formatDisplayValue()}
          </span>
          <ChevronDown className="w-4 h-4 text-foreground" />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[30rem] max-w-[calc(100vw-1rem)] bg-card border border-border rounded-lg shadow-lg z-50 backdrop-blur-md">
          <div className="p-4">
            <div className="grid grid-cols-5 gap-6">
              {/* Quick Select */}
              <div className="col-span-2">
                <h3 className="text-sm font-medium text-foreground mb-3">Quick Select</h3>
                <div className="space-y-1">
                  {quickSelectOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleQuickSelect(option)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedQuickOption === option.value && !isCustomRange
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Range */}
              <div className="col-span-3">
                <h3 className="text-sm font-medium text-foreground mb-3">Custom Range</h3>
                <div className="space-y-4">
                  {/* From */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-2 block">From</label>
                    <div className="flex space-x-3">
                      <div className="flex-1 relative" ref={fromDatePickerRef}>
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <input
                          type="text"
                          value={customFromDate}
                          onChange={(e) => setCustomFromDate(e.target.value)}
                          onClick={() => setShowFromDatePicker(!showFromDatePicker)}
                          className="w-full pl-8 pr-3 py-2 text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-w-[110px] cursor-pointer"
                          placeholder="Sep 10"
                          readOnly
                        />
                        {showFromDatePicker && (
                          <CalendarComponent
                            isFrom={true}
                            currentMonth={currentMonth}
                            currentYear={currentYear}
                            onDateSelect={handleDateSelect}
                            onNavigateMonth={navigateMonth}
                          />
                        )}
                      </div>
                      <div className="flex-1 relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <input
                          type="text"
                          value={customFromTime}
                          onChange={(e) => setCustomFromTime(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-w-[110px]"
                          placeholder="11:31 AM"
                        />
                      </div>
                    </div>
                  </div>

                  {/* To */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-2 block">To</label>
                    <div className="flex space-x-3">
                      <div className="flex-1 relative" ref={toDatePickerRef}>
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <input
                          type="text"
                          value={customToDate}
                          onChange={(e) => setCustomToDate(e.target.value)}
                          onClick={() => setShowToDatePicker(!showToDatePicker)}
                          className="w-full pl-8 pr-3 py-2 text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-w-[110px] cursor-pointer"
                          placeholder="Sep 10"
                          readOnly
                        />
                        {showToDatePicker && (
                          <CalendarComponent
                            isFrom={false}
                            currentMonth={currentMonth}
                            currentYear={currentYear}
                            onDateSelect={handleDateSelect}
                            onNavigateMonth={navigateMonth}
                          />
                        )}
                      </div>
                      <div className="flex-1 relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <input
                          type="text"
                          value={customToTime}
                          onChange={(e) => setCustomToTime(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-w-[110px]"
                          placeholder="11:31 AM"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="flex justify-end">
                    <Button
                      onClick={handleCustomRangeApply}
                      className="px-4 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};