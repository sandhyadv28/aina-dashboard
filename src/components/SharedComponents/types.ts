export interface DateRangePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export interface QuickSelectOption {
  label: string;
  value: string;
  hours?: number;
  days?: number;
}

export interface DateRangeState {
  isOpen: boolean;
  customFromDate: string;
  customFromTime: string;
  customToDate: string;
  customToTime: string;
  selectedQuickOption: string;
  isCustomRange: boolean;
  showFromDatePicker: boolean;
  showToDatePicker: boolean;
  currentMonth: number;
  currentYear: number;
}
