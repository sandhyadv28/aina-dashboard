import { MessageCircle, Phone, X } from "lucide-react";
import { Button } from "../SharedComponents/button";

interface SupportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SupportModal = ({ isOpen, onClose }: SupportModalProps) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative z-50 w-[90%] max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="glass-card rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold leading-none tracking-tight">24x7 Customer Support</h2>
                            <Button variant="ghost" size="icon" onClick={onClose}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="p-6 pt-0 space-y-6">
                        <div className="text-center">
                            <p className="text-muted-foreground mb-6">
                                Our support team is available 24/7 to assist you with any issues.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="glass-card p-4 rounded-lg">
                                <div className="flex items-center space-x-3 mb-2">
                                    <Phone className="w-5 h-5 text-primary" />
                                    <span className="font-medium">Call Support</span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Speak directly with our technical support team
                                </p>
                                <div className="space-y-2">
                                    <p className="font-mono text-sm">+1 (555) 123-4567</p>
                                    <p className="font-mono text-sm">+1 (555) 765-4321</p>
                                </div>
                            </div>

                            <div className="glass-card p-4 rounded-lg">
                                <div className="flex items-center space-x-3 mb-2">
                                    <MessageCircle className="w-5 h-5 text-primary" />
                                    <span className="font-medium">WhatsApp Support</span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Quick assistance via WhatsApp messaging
                                </p>
                                <div className="space-y-2">
                                    <p className="font-mono text-sm">+1 (555) 987-6543</p>
                                    <p className="font-mono text-sm">+1 (555) 456-7890</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-xs text-muted-foreground">
                                Available 24 hours a day, 7 days a week
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};