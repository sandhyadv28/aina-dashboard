import { User, Calendar, Clock, FileText, X } from "lucide-react";
import { Badge } from "../SharedComponents/badge";
import { Button } from "../SharedComponents/button";

interface NoteDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  note?: {
    id: number;
    time: string;
    author: string;
    content: string;
    fullContent?: string;
    department?: string;
    authorTitle?: string;
  };
}

export const NoteDetailModal = ({ isOpen, onClose, note }: NoteDetailModalProps) => {
  if (!note) return null;

  // Expand the note content for demo purposes
  const fullContent = note.fullContent || `${note.content}

This is an extended note with additional details about the patient's condition and care plan. The patient has been closely monitored throughout the shift with the following observations:

1. Vital signs remain within acceptable ranges with slight elevation in heart rate
2. Patient appears comfortable but shows signs of mild agitation during routine checks
3. Fall risk protocol has been implemented with bed rails raised and frequent monitoring
4. Pain management continues to be effective with current medication regimen
5. Family has been updated on patient status and care plan

Recommendations:
- Continue current monitoring protocol
- Reassess pain management in 4 hours
- Consider consultation with physical therapy team
- Monitor for signs of increased agitation

The patient's overall condition is stable with close attention required for the noted concerns. All safety protocols are in place and being followed per hospital guidelines.`;

  const authorTitle = note.authorTitle || (note.author.includes("Dr.") ? "Attending Physician" : "Registered Nurse");
  const department = note.department || (note.author.includes("Dr.") ? "Internal Medicine" : "Medical/Surgical Unit");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 w-full max-w-3xl glass-card max-h-[85vh] overflow-y-auto custom-scrollbar rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Note Details</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Author Information */}
          <div className="glass-card rounded-lg">
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-lg">{note.author}</h3>
                    <Badge variant="outline">{authorTitle}</Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{department}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Recorded on {new Date().toLocaleDateString('en-GB', { 
                        day: '2-digit', 
                        month: 'long', 
                        year: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{note.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Note Content */}
          <div className="glass-card rounded-lg">
            <div className="p-6">
              <h3 className="font-semibold mb-4">Note</h3>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                  {fullContent}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};