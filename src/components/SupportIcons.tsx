import { HelpCircle, MessageSquare } from "lucide-react";
import { Button } from "./SharedComponents/button";
import { useState } from "react";
import { SupportModal } from "./modals/SupportModal";
import { ReportIssueModal } from "./modals/ReportIssueModal";

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

      <SupportModal
        isOpen={showSupport}
        onClose={() => setShowSupport(false)}
      />

      <ReportIssueModal
        isOpen={showReport}
        onClose={() => setShowReport(false)}
      />
    </>
  );
};