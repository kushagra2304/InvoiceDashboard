import React, { useState } from 'react';
import { ChevronLeft, Plus, Calendar, Bell, Edit } from 'lucide-react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Invoice {
  id: number;
  clientName: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'disputed' | 'overdue' | 'partially-paid' | 'draft' | 'awaited';
}

const InvoiceDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'invoices'>('dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState<'1Month' | '3Months' | '1Year'>('3Months');

  const invoices: Invoice[] = [
    { id: 1, clientName: 'Client Name', amount: 125000, dueDate: '2024-06-15', status: 'unpaid' },
    { id: 2, clientName: 'Client Name', amount: 125000, dueDate: '2024-06-15', status: 'unpaid' },
    { id: 3, clientName: 'Income Trend', amount: 125000, dueDate: '2024-06-15', status: 'disputed' },
    { id: 4, clientName: 'Income Trend', amount: 125000, dueDate: '2024-06-15', status: 'paid' },
    { id: 5, clientName: 'Income Trend', amount: 125000, dueDate: '2024-06-15', status: 'paid' },
    { id: 6, clientName: 'Income Trend', amount: 125000, dueDate: '2024-06-15', status: 'partially-paid' },
    { id: 7, clientName: 'Income Trend', amount: 125000, dueDate: '2024-06-15', status: 'paid' },
    { id: 8, clientName: 'Income Trend', amount: 125000, dueDate: '2024-06-15', status: 'overdue' },
    { id: 9, clientName: 'Income Trend', amount: 125000, dueDate: '2024-06-15', status: 'paid' },
    { id: 10, clientName: 'Income Trend', amount: 125000, dueDate: '2024-06-15', status: 'overdue' },
    { id: 11, clientName: 'Income Trend', amount: 125000, dueDate: '2024-06-15', status: 'awaited' },
    { id: 12, clientName: 'Income Trend', amount: 125000, dueDate: '2024-06-15', status: 'draft' },
    { id: 13, clientName: 'Income Trend', amount: 125000, dueDate: '2024-06-15', status: 'paid' },
  ];

 const data = [
  { month: "Jan", income: 4000, momGrowth: 25 },
  { month: "Feb", income: 5000, momGrowth: 10 },
  { month: "Mar", income: 7000, momGrowth: 20 },
  { month: "Apr", income: 3000, momGrowth: -40 },
  { month: "May", income: 6000, momGrowth: 80 },
  { month: "Jun", income: 0, momGrowth: -100 },
];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-400 text-white';
      case 'unpaid': return 'bg-gray-300 text-gray-700';
      case 'disputed': return 'bg-red-400 text-white';
      case 'overdue': return 'bg-red-400 text-white';
      case 'partially-paid': return 'bg-yellow-400 text-white';
      case 'draft': return 'bg-gray-400 text-white';
      case 'awaited': return 'bg-yellow-400 text-white';
      default: return 'bg-gray-300 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Paid';
      case 'unpaid': return 'Unpaid';
      case 'disputed': return 'Disputed';
      case 'overdue': return 'Overdue';
      case 'partially-paid': return 'Partially Paid';
      case 'draft': return 'Draft';
      case 'awaited': return 'Awaited';
      default: return status;
    }
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const Header = () => (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-transparent">
      <div className="flex items-center">
        <button onClick={() => setCurrentView('dashboard')} className="mr-2">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <span className="text-sm text-gray-600">Back</span>
      </div>
      <span className="text-lg font-semibold text-gray-800 absolute left-1/2 transform -translate-x-1/2">
        {currentView === 'dashboard' ? 'Dashboard' : 'Your Invoices'}
      </span>
      <div className="w-10 h-10 rounded-full bg-gray-300"></div>
    </div>
  );

  function Crown() {
  return (
    <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.56684 18V16.4118H17.4332V18H3.56684ZM3.53658 14.62L2.10316 6.32647C2.06807 6.33318 2.0286 6.33926 1.98474 6.34474C1.94088 6.35021 1.9014 6.35294 1.86632 6.35294C1.48175 6.35294 1.15789 6.21935 0.894737 5.95218C0.631579 5.68482 0.5 5.36029 0.5 4.97859C0.5 4.59106 0.631579 4.26168 0.894737 3.99044C1.15789 3.71938 1.48202 3.58385 1.86711 3.58385C2.25202 3.58385 2.57921 3.71938 2.84868 3.99044C3.11833 4.26168 3.25316 4.59106 3.25316 4.97859C3.25316 5.07706 3.245 5.16856 3.22868 5.25309C3.21254 5.33744 3.18693 5.41694 3.15184 5.49159L6.48184 6.9128L9.69026 2.50862C9.51763 2.38774 9.37833 2.22874 9.27237 2.03162C9.1664 1.8345 9.11342 1.62221 9.11342 1.39474C9.11342 1.00738 9.24816 0.678088 9.51763 0.406853C9.78711 0.135618 10.1144 0 10.4995 0C10.8844 0 11.2118 0.135441 11.4818 0.406323C11.7517 0.677029 11.8866 1.00588 11.8866 1.39288C11.8866 1.62494 11.8336 1.83873 11.7276 2.03426C11.6217 2.22962 11.4824 2.38774 11.3097 2.50862L14.5182 6.9128L17.8482 5.49159C17.8211 5.41941 17.7975 5.33991 17.7774 5.25309C17.757 5.16644 17.7468 5.07494 17.7468 4.97859C17.7468 4.59106 17.8784 4.26168 18.1416 3.99044C18.4047 3.71938 18.7289 3.58385 19.1139 3.58385C19.4989 3.58385 19.8261 3.71938 20.0958 3.99044C20.3653 4.26168 20.5 4.59106 20.5 4.97859C20.5 5.35924 20.365 5.6835 20.095 5.95138C19.825 6.21909 19.4971 6.35294 19.1113 6.35294C19.0804 6.35294 19.0457 6.34853 19.0071 6.33971C18.9687 6.33088 18.9308 6.32647 18.8934 6.32647L17.4634 14.62H3.53658ZM4.88053 13.0317H16.1195L17.1074 7.57244L13.9797 8.88194L10.5 4.07859L7.02026 8.88194L3.89263 7.57244L4.88053 13.0317Z" fill="url(#paint0_linear_1_301)"/>
<defs>
<linearGradient id="paint0_linear_1_301" x1="7.13482" y1="-0.767422" x2="10.468" y2="19.6074" gradientUnits="userSpaceOnUse">
<stop stop-color="#DD2A7B"/>
<stop offset="0.41261" stop-color="#9747FF"/>
<stop offset="1" stop-color="#334CCA"/>
</linearGradient>
</defs>
</svg>

  );
}

// Gradient wrapper (also inline)
function GradientIconWrapper({ children, size = 32 }: { children: React.ReactNode; size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded"
      style={{
        width: size,
        height: size,
        // background:
        //   "linear-gradient(169.7deg, #DD2A7B 1.49%, #9747FF 42.07%, #334CCA 99.84%)",
      }}
    >
      <div className="text-white w-4 h-4">{children}</div>
    </div>
  );
}

  const DashboardView = () => (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-20 px-4 pb-6">
        {/* Create New Invoice Card */}
        <div className="bg-gray-100 rounded-2xl p-6 mb-6 border border-gray-200">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 p-1" style={{
              background: 'linear-gradient(169.7deg, #DD2A7B 1.49%, #9747FF 42.07%, #334CCA 99.84%)'
            }}>
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <Plus className="w-8 h-8" style={{
                  color: '#DD2A7B'
                }} />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2" style={{
              background: 'linear-gradient(169.7deg, #DD2A7B 1.49%, #9747FF 42.07%, #334CCA 99.84%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Create New Invoice</h2>
            <p className="text-gray-500 text-sm mb-4">Start by creating and sending new invoice</p>
            <p className="text-sm" style={{
              background: 'linear-gradient(169.7deg, #DD2A7B 1.49%, #9747FF 42.07%, #334CCA 99.84%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Or Upload an existing invoice and set payment reminder</p>
          </div>
        </div>

        {/* Time Period Selection */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600 font-medium">Time Period</span>
            <span className="text-gray-400 text-sm">dd.mm.yyyy - dd.mm.yyyy</span>
          </div>
          <div className="flex space-x-2 mb-3">
            {['1Month', '3Months', '1Year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period as any)}
                className={`px-4 py-2 rounded-lg text-sm border ${
                  selectedPeriod === period
                    ? 'border-purple-300 bg-purple-50 font-medium' 
                    : 'border-gray-200 bg-gray-50 text-gray-500'
                }`}
                style={selectedPeriod === period ? {
                  background: 'linear-gradient(169.7deg, #DD2A7B 1.49%, #9747FF 42.07%, #334CCA 99.84%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                } : {}}
              >
                {period.replace('Month', ' Month').replace('Year', ' Year')}
              </button>
            ))}
            <GradientIconWrapper>
        <Crown />
      </GradientIconWrapper>
          </div>
          <button className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            Custom
          </button>
        </div>

        {/* Total Earnings */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-gray-200">
          <h3 className="text-gray-600 font-medium mb-2">Total Earnings</h3>
          <div className="text-3xl font-bold text-purple-600">₹1,25,000</div>
        </div>

        {/* Payment Status Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 border border-gray-200">
            <h4 className="text-gray-600 font-medium mb-2">Payment Awaited</h4>
            <div className="text-2xl font-bold text-purple-600">₹25,000</div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-200">
            <h4 className="text-gray-600 font-medium mb-2">Payment Overdue</h4>
            <div className="text-2xl font-bold text-purple-600">₹25,000</div>
          </div>
        </div>

        {/* Income Trend Chart */}
        <div className="bg-white rounded-2xl p-4 mb-6">
          <h3 className="text-gray-800 font-semibold mb-2">Income Trend</h3>
          <p className="text-gray-500 text-sm mb-4">Your monthly income and growth for the last 6 months.</p>
          
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data}>
        <XAxis dataKey="month" />
        <YAxis yAxisId="left" orientation="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="income" fill="#A020F0" />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="momGrowth"
          stroke="#5A0C0C"
        />
      </ComposedChart>
    </ResponsiveContainer>
          </div>

          <div className="flex justify-center mt-4 space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded mr-2"></div>
              {/* <span className="text-sm text-gray-600">Income</span> */}
            </div>
            <div className="flex items-center">
              <div className="w-3 h-1  rounded mr-2"></div>
              {/* <span className="text-sm text-gray-600">momGrowth</span> */}
            </div>
          </div>
        </div>

        {/* Your Invoices Section - Show All */}
        <div className="bg-white rounded-2xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-800 font-semibold">Your Invoices</h3>
            <button onClick={() => setCurrentView('invoices')}>
              <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
            </button>
          </div>
          
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex justify-between items-center py-2">
                <div>
                  <div className="font-medium text-gray-800">{invoice.clientName}</div>
                  <div className="text-sm text-gray-500">
                    {formatCurrency(invoice.amount)}, Due: {invoice.dueDate}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {invoice.id === 1 ? (
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Update Status
                    </button>
                  ) : (
                    <>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {getStatusText(invoice.status)}
                      </span>
                      {(invoice.status === 'overdue' || invoice.status === 'awaited') && (
                        <Bell className="w-4 h-4 text-gray-400" />
                      )}
                      {invoice.status === 'draft' && (
                        <Edit className="w-4 h-4 text-gray-400" />
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const InvoicesView = () => (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-20 px-4 pb-6">
        <div className="space-y-3">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="bg-white rounded-xl p-4 flex justify-between items-center">
              <div>
                <div className="font-medium text-gray-800">{invoice.clientName}</div>
                <div className="text-sm text-gray-500">
                  {formatCurrency(invoice.amount)}, Due: {invoice.dueDate}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {invoice.id === 1 ? (
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Update Status
                  </button>
                ) : (
                  <>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {getStatusText(invoice.status)}
                    </span>
                    {(invoice.status === 'overdue' || invoice.status === 'awaited') && (
                      <Bell className="w-4 h-4 text-gray-400" />
                    )}
                    {invoice.status === 'draft' && (
                      <Edit className="w-4 h-4 text-gray-400" />
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sparkonomy Footer */}
        <div className="text-center mt-8 pb-6">
          <div className="text-gray-600 font-semibold">Spark⚡nomy</div>
          <div className="text-gray-500 text-sm">sparking the creator economy</div>
        </div>
      </div>
    </div>
  );

  return currentView === 'dashboard' ? <DashboardView /> : <InvoicesView />;
};

export default InvoiceDashboard;