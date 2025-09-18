import React from "react";
import { ChevronLeft } from "lucide-react";

interface HeaderProps {
  currentView: 'dashboard' | 'invoices';
  setCurrentView: (view: 'dashboard' | 'invoices') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-transparent">
      <div className="flex items-center">
        {currentView !== "dashboard" && (
          <button onClick={() => setCurrentView('dashboard')} className="mr-2">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
        )}
        <span className="text-sm text-gray-600">Back</span>
      </div>

      <span className="absolute left-1/2 transform -translate-x-1/2 text-gray-800 font-semibold">
        {currentView === 'dashboard' ? 'Dashboard' : 'Your Invoices'}
      </span>

      <div className="w-10 h-10 rounded-full bg-gray-300">
        <img
          src="/Avatar.jpeg"
          alt="Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default Header;
