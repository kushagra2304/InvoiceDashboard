import React from "react";
import Header from "./Header";
import InvoiceCard from "./InvoiceCard";

interface InvoicesViewProps {
  setCurrentView: (view: 'dashboard' | 'invoices') => void;
}

const InvoicesView: React.FC<InvoicesViewProps> = ({ setCurrentView }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header currentView="invoices" setCurrentView={setCurrentView} />
      <div className="pt-20 px-4 pb-6">
        <InvoiceCard showSelectStatus={true} />
      </div>
    </div>
  );
};

export default InvoicesView;
