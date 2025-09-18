import React, { useState } from "react";
import Header from "./Header";
import { Calendar } from "lucide-react";
import { ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { GradientIconWrapper } from "./GradientIconWrapper";
import { Crown } from "./Crown";
import InvoiceCard from "./InvoiceCard";

interface DashboardViewProps {
  setCurrentView: (view: 'dashboard' | 'invoices') => void;
}

const data = [
  { month: "Jan", income: 4000, momGrowth: 25 },
  { month: "Feb", income: 5000, momGrowth: 10 },
  { month: "Mar", income: 7000, momGrowth: 20 },
  { month: "Apr", income: 3000, momGrowth: -40 },
  { month: "May", income: 6000, momGrowth: 80 },
  { month: "Jun", income: 0, momGrowth: -100 },
];

const DashboardView: React.FC<DashboardViewProps> = ({ setCurrentView }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'1Month' | '3Months' | '1Year' | 'Custom'>('1Month');

  return (
    <div className="min-h-screen bg-white">
      <Header currentView="dashboard" setCurrentView={setCurrentView} />
      <div className="pt-20 px-4 pb-6">
        {/* Add your Create Invoice Card */}
        <InvoiceCard />

        {/* Period Buttons */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-gray-200">
          <div className="flex flex-wrap space-x-2 mb-3">
            {(['1Month','3Months','1Year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`flex items-center justify-center space-x-2 text-sm ${selectedPeriod === period ? "font-medium" : "text-gray-500"}`}
              >
                <span>{period}</span>
                {period === "1Year" && <GradientIconWrapper><Crown /></GradientIconWrapper>}
              </button>
            ))}
          </div>

          <button onClick={() => setSelectedPeriod('Custom')} className="flex items-center space-x-1 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Custom</span>
          </button>
        </div>

        {/* Total Earnings */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-gray-200">
          <h3 className="text-gray-600 font-medium mb-2">Total Earnings</h3>
          <div className="text-3xl font-bold text-purple-600">$1,25,000</div>
        </div>

        {/* Income Trend Chart */}
        <div className="bg-white rounded-2xl p-4 mb-6">
          <h3 className="text-gray-800 font-semibold mb-2">Income Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={data}>
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="income" fill="#A020F0" />
              <Line yAxisId="right" type="monotone" dataKey="momGrowth" stroke="#5A0C0C" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
