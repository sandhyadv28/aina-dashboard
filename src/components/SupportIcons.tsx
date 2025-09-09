import { useState } from "react";
import { HelpCircle, MessageSquare } from "lucide-react";
import { Button } from "./SharedComponents/button";
// import { SupportOverlay } from "@/components/overlays/SupportOverlay";
// import { ReportIssueOverlay } from "@/components/overlays/ReportIssueOverlay";

export const SupportIcons = () => {
  const [showSupport, setShowSupport] = useState(false);
  const [showReport, setShowReport] = useState(false);

  return (
    <>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSupport(true)}
          title="24x7 Support"
        >
          <HelpCircle className="w-5 h-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowReport(true)}
          title="Report Issue"
        >
          <MessageSquare className="w-5 h-5" />
        </Button>
      </div>

      {/* <SupportOverlay 
        isOpen={showSupport} 
        onClose={() => setShowSupport(false)} 
      />
      
      <ReportIssueOverlay 
        isOpen={showReport} 
        onClose={() => setShowReport(false)} 
      /> */}
    </>
  );
};