import React, { useState } from "react";
import Header from "../components/Header";
// import Crown from "../components/Crown";
// import GradientIconWrapper from "../components/GradientIconView";
import { ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface DashboardViewProps {
  setCurrentView: React.Dispatch<React.SetStateAction<"dashboard" | "invoices">>;
}

const DashboardView: React.FC<DashboardViewProps> = ({ setCurrentView }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<"1Month" | "3Months" | "1Year" | "Custom">("1Month");

  const data = [
    { month: "Jan", income: 4000, momGrowth: 25 },
    { month: "Feb", income: 5000, momGrowth: 10 },
    { month: "Mar", income: 7000, momGrowth: 20 },
    { month: "Apr", income: 3000, momGrowth: -40 },
    { month: "May", income: 6000, momGrowth: 80 },
    { month: "Jun", income: 0, momGrowth: -100 },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header currentView="dashboard" setCurrentView={setCurrentView} />
      <div className="pt-20 px-4 pb-6">
        {/* Time period, charts, earnings etc. */}
        <h3 className="text-gray-800 font-semibold mb-2">Income Trend</h3>
        <div className="h-64 w-full relative">
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

        <div className="text-center mt-8 pb-6">
          <div className="flex items-center justify-center mb-2 text-gray-600 font-semibold">
            <span>Spark</span>
            <span className="inline-block relative mx-1">⚡</span>
            <span className="font-normal">nomy</span>
          </div>
          <div className="text-gray-500 text-sm">sparking the creator economy</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
