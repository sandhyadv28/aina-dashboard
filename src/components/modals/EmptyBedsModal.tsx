import { Bed, X, Clock, ChevronDown } from "lucide-react";

interface EmptyBed {
  bedNumber: string;
  lastOccupied: string;
  emptyDuration: string;
}

interface EmptyBedsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: EmptyBed[];
}

export const EmptyBedsModal = ({ isOpen, onClose, data }: EmptyBedsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        className="fixed inset-0 z-50 bg-black/80 pointer-events-auto"
        onClick={onClose}
      />
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <div className="bg-background border shadow-lg sm:rounded-lg">
          {/* Header */}
          <div className="p-6 pb-4 border-slate-700">
            <div className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bed className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-white tracking-tight leading-none">Empty Beds</h2>
              </div>
              <div className="flex items-center space-x-1">
                {/* Date range selector */}
                <button className="inline-flex items-center justify-start gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-normal text-left ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 w-auto">
                  <Clock className="w-4 h-4" />
                  <span>Sep 23, 2025 12:14 - Sep 24, 2025 12:14</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid gap-4">
              {data.map((bed) => (
                <div
                  key={bed.bedNumber}
                  className="p-4 bg-card text-card-foreground shadow-sm rounded-lg border border-border/50"
                >
                  <div className="flex items-center justify-between">
                    {/* Left side - Bed info */}
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Bed className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-semibold text-foreground">{bed.bedNumber}</h4>
                          <p className="text-sm text-muted-foreground">Last occupied: {bed.lastOccupied}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right side - Empty duration */}
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-lg font-bold text-primary">{bed.emptyDuration}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Empty duration</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {data.length === 0 && (
              <div className="text-center py-8">
                <Bed className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-400 mb-2">No Empty Beds</h3>
                <p className="text-sm text-slate-500">
                  All beds are currently occupied. Check back later for availability.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
