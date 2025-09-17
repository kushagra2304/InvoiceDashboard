import React, { useState } from 'react';
import { ChevronLeft, Plus, Calendar, Bell, Edit } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Line, LineChart, ReferenceLine } from 'recharts';

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

  const incomeData = [
    { month: 'Jan', income: 3.5, growth: 25 },
    { month: 'Feb', income: 5.0, growth: 43 },
    { month: 'Mar', income: 6.8, growth: 36 },
    { month: 'Apr', income: 3.2, growth: -53 },
    { month: 'May', income: 5.5, growth: 72 },
    { month: 'Jun', income: 0, growth: -100 },
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
            <svg width="24" height="24" viewBox="0 0 24 24" className="p-1 rounded" style={{
              background: 'linear-gradient(169.7deg, #DD2A7B 1.49%, #9747FF 42.07%, #334CCA 99.84%)'
            }}>
              <path d="M5 16L3 14L5 12L6.4 13.4L10 9.8L13.6 13.4L20.2 6.8L21.6 8.2L13.6 16.2L10 12.6L6.4 16.2L5 16Z" fill="white"/>
              <circle cx="12" cy="7" r="2" fill="white"/>
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="white"/>
            </svg>
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
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis 
                  yAxisId="income"
                  orientation="left"
                  axisLine={false} 
                  tickLine={false}
                  tickFormatter={(value) => `$${value}k`}
                  domain={[0, 8]}
                />
                <YAxis 
                  yAxisId="growth"
                  orientation="right"
                  axisLine={false} 
                  tickLine={false}
                  tickFormatter={(value) => `${value}%`}
                  domain={[-100, 100]}
                />
                <Bar yAxisId="income" dataKey="income" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                <ReferenceLine yAxisId="growth" y={0} stroke="#666" strokeDasharray="2 2" />
                <LineChart data={incomeData}>
                  <Line 
                    yAxisId="growth"
                    type="monotone" 
                    dataKey="growth" 
                    stroke="#7C3AED" 
                    strokeWidth={2}
                    dot={{ fill: '#7C3AED', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center mt-4 space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Income</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-1 bg-purple-600 rounded mr-2"></div>
              <span className="text-sm text-gray-600">momGrowth</span>
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