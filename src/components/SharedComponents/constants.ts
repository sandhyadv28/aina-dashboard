import type { QuickSelectOption } from "./types";

export const quickSelectOptions: QuickSelectOption[] = [
  { label: "Last 1 hour", value: "1h", hours: 1 },
  { label: "Last 3 hours", value: "3h", hours: 3 },
  { label: "Last 6 hours", value: "6h", hours: 6 },
  { label: "Last 12 hours", value: "12h", hours: 12 },
  { label: "Last 24 hours", value: "24h", hours: 24 },
  { label: "Last 7 days", value: "7d", days: 7 },
];
