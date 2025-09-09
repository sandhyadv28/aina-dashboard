import { CheckCircle, MessageCircle, Phone, Upload, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../SharedComponents/button";
import { Input } from "../SharedComponents/input";
import { Label } from "../SharedComponents/label";

interface ReportIssueModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ReportIssueModal = ({ isOpen, onClose }: ReportIssueModalProps) => {
    const [issue, setIssue] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!issue.trim()) return;

        setIsSubmitted(true);
    };

    const handleClose = () => {
        setIssue("");
        setIsSubmitted(false);
        onClose();
    };

    if (!isOpen) return null;

    if (isSubmitted) {
        return (
            <div className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
                <div className="relative z-50 w-full max-w-md">
                    <div className="glass-card rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold leading-none tracking-tight">Issue Reported</h2>
                                <Button variant="ghost" size="icon" onClick={handleClose}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="p-6 pt-0 text-center space-y-4">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                            <div>
                                <h3 className="font-medium mb-2">Thank you for your report!</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Your issue has been submitted successfully. Our support team will review it and contact you if needed.
                                </p>
                            </div>

                            <div className="glass-card p-4 rounded-lg">
                                <p className="text-sm font-medium mb-2">Need immediate assistance?</p>
                                <div className="space-y-2 text-sm">
                                    <p className="font-mono">Phone: +1 (555) 123-4567</p>
                                    <p className="font-mono">WhatsApp: +1 (555) 987-6543</p>
                                </div>
                            </div>

                            <Button onClick={handleClose} className="btn-medical-primary">
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
            <div className="relative z-50 w-[90%] max-w-md">
                <div className="glass-card rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold leading-none tracking-tight">Report an Issue</h2>
                            <Button variant="ghost" size="icon" onClick={handleClose}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-6">
                        <div>
                            <Label htmlFor="issue-description">Describe the issue</Label>
                            <textarea
                                id="issue-description"
                                placeholder="Please describe the issue you're experiencing..."
                                value={issue}
                                onChange={(e) => setIssue(e.target.value)}
                                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                                required
                            />
                        </div>

                        <div>
                            <Label>Attach Screenshot (Optional)</Label>
                            <div className="mt-2 border-2 border-dashed border-border rounded-lg p-4 text-center">
                                <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                                <p className="text-sm text-muted-foreground">
                                    Drag & drop or click to upload screenshot
                                </p>
                                <Input type="file" accept="image/*" className="hidden" />
                            </div>
                        </div>

                        <div className="glass-card p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                                <Phone className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">Need immediate help?</span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                                Call our 24x7 support: +1 (555) 123-4567
                            </p>
                            <div className="flex items-center space-x-2">
                                <MessageCircle className="w-4 h-4 text-primary" />
                                <span className="text-xs text-muted-foreground">
                                    WhatsApp: +1 (555) 987-6543
                                </span>
                            </div>
                        </div>

                        <div className="flex space-x-3">
                            <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                                Cancel
                            </Button>
                            <Button type="submit" className="flex-1 btn-medical-primary">
                                Report Issue
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};