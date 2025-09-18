import React, { useState } from 'react';
import { ChevronLeft, Calendar, Bell, Edit } from 'lucide-react';
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
    status: 'Update Status' | 'paid' | 'unpaid' | 'disputed' | 'overdue' | 'partially-paid' | 'draft' | 'awaited';
}
// const statusOptions: Invoice["status"][] = [
//   "paid",
//   "unpaid",
//   "disputed",
//   "overdue",
//   "partially-paid",
//   "draft",
//   "awaited",
// ];

const InvoiceDashboard: React.FC = () => {
    const [currentView, setCurrentView] = useState<'dashboard' | 'invoices'>('dashboard');
    type Period = '1Month' | '3Months' | '1Year' | 'Custom';

    const [selectedPeriod, setSelectedPeriod] = useState<Period>('1Month');
const [statuses, setStatuses] = useState<Record<number, Invoice["status"]>>({});

const handleStatusChange = (id: number, newStatus: Invoice["status"]) => {
  setStatuses((prev) => ({ ...prev, [id]: newStatus }));
};




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
    //   const handleStatusChange = (id: number, newStatus: Invoice['status']) => {
    //   // update the invoice in state
    //   setInvoices((prev) =>
    //     prev.map((inv) => (inv.id === id ? { ...inv, status: newStatus } : inv))
    //   );
    // };

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
            <span
                className="absolute left-1/2 transform -translate-x-1/2 text-gray-800 font-semibold"
                style={{
                    width: "88px",
                    height: "22px",
                    transform: "translateX(-50%) rotate(0deg)",
                    opacity: 1,
                }}
            >
                {currentView === 'dashboard' ? 'Dashboard' : 'Your Invoices'}
            </span>

            <div className="w-10 h-10 rounded-full bg-gray-300"><img
                src="/Avatar.jpeg" // replace with your image URL
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
            />
            </div>
        </div>
    );

    function Crown() {
        return (
            <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.56684 18V16.4118H17.4332V18H3.56684ZM3.53658 14.62L2.10316 6.32647C2.06807 6.33318 2.0286 6.33926 1.98474 6.34474C1.94088 6.35021 1.9014 6.35294 1.86632 6.35294C1.48175 6.35294 1.15789 6.21935 0.894737 5.95218C0.631579 5.68482 0.5 5.36029 0.5 4.97859C0.5 4.59106 0.631579 4.26168 0.894737 3.99044C1.15789 3.71938 1.48202 3.58385 1.86711 3.58385C2.25202 3.58385 2.57921 3.71938 2.84868 3.99044C3.11833 4.26168 3.25316 4.59106 3.25316 4.97859C3.25316 5.07706 3.245 5.16856 3.22868 5.25309C3.21254 5.33744 3.18693 5.41694 3.15184 5.49159L6.48184 6.9128L9.69026 2.50862C9.51763 2.38774 9.37833 2.22874 9.27237 2.03162C9.1664 1.8345 9.11342 1.62221 9.11342 1.39474C9.11342 1.00738 9.24816 0.678088 9.51763 0.406853C9.78711 0.135618 10.1144 0 10.4995 0C10.8844 0 11.2118 0.135441 11.4818 0.406323C11.7517 0.677029 11.8866 1.00588 11.8866 1.39288C11.8866 1.62494 11.8336 1.83873 11.7276 2.03426C11.6217 2.22962 11.4824 2.38774 11.3097 2.50862L14.5182 6.9128L17.8482 5.49159C17.8211 5.41941 17.7975 5.33991 17.7774 5.25309C17.757 5.16644 17.7468 5.07494 17.7468 4.97859C17.7468 4.59106 17.8784 4.26168 18.1416 3.99044C18.4047 3.71938 18.7289 3.58385 19.1139 3.58385C19.4989 3.58385 19.8261 3.71938 20.0958 3.99044C20.3653 4.26168 20.5 4.59106 20.5 4.97859C20.5 5.35924 20.365 5.6835 20.095 5.95138C19.825 6.21909 19.4971 6.35294 19.1113 6.35294C19.0804 6.35294 19.0457 6.34853 19.0071 6.33971C18.9687 6.33088 18.9308 6.32647 18.8934 6.32647L17.4634 14.62H3.53658ZM4.88053 13.0317H16.1195L17.1074 7.57244L13.9797 8.88194L10.5 4.07859L7.02026 8.88194L3.89263 7.57244L4.88053 13.0317Z" fill="url(#paint0_linear_1_301)" />
                <defs>
                    <linearGradient id="paint0_linear_1_301" x1="7.13482" y1="-0.767422" x2="10.468" y2="19.6074" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#DD2A7B" />
                        <stop offset="0.41261" stop-color="#9747FF" />
                        <stop offset="1" stop-color="#334CCA" />
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
                <div className="bg-gray-100 p-6 mb-4 border border-gray-200 rounded-2xl shadow-sm">
                    <div className="flex flex-col items-center text-center">
                        <div className="rounded-full flex items-center justify-center mb-4" style={{ width: "50.67px", height: "50.67px" }}>
                            <svg width="51" height="52" viewBox="0 0 51 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.5003 38.667H27.5003V28.0003H38.167V24.0003H27.5003V13.3337H23.5003V24.0003H12.8337V28.0003H23.5003V38.667ZM25.505 51.3337C22.001 51.3337 18.7074 50.6688 15.6243 49.339C12.5412 48.0092 9.85944 46.2045 7.57899 43.925C5.29855 41.6454 3.49299 38.9648 2.16233 35.883C0.832103 32.8012 0.166992 29.5086 0.166992 26.005C0.166992 22.501 0.831881 19.2074 2.16166 16.1243C3.49144 13.0412 5.2961 10.3594 7.57566 8.07899C9.85522 5.79855 12.5359 3.99299 15.6177 2.66233C18.6994 1.3321 21.9921 0.666992 25.4957 0.666992C28.9997 0.666992 32.2932 1.33188 35.3763 2.66166C38.4594 3.99144 41.1412 5.7961 43.4217 8.07566C45.7021 10.3552 47.5077 13.0359 48.8383 16.1177C50.1686 19.1994 50.8337 22.4921 50.8337 25.9957C50.8337 29.4997 50.1688 32.7932 48.839 35.8763C47.5092 38.9594 45.7045 41.6412 43.425 43.9217C41.1454 46.2021 38.4648 48.0077 35.383 49.3383C32.3012 50.6686 29.0086 51.3337 25.505 51.3337ZM25.5003 47.3337C31.4559 47.3337 36.5003 45.267 40.6337 41.1337C44.767 37.0003 46.8337 31.9559 46.8337 26.0003C46.8337 20.0448 44.767 15.0003 40.6337 10.867C36.5003 6.73366 31.4559 4.66699 25.5003 4.66699C19.5448 4.66699 14.5003 6.73366 10.367 10.867C6.23366 15.0003 4.16699 20.0448 4.16699 26.0003C4.16699 31.9559 6.23366 37.0003 10.367 41.1337C14.5003 45.267 19.5448 47.3337 25.5003 47.3337Z" fill="url(#paint0_linear_1_250)" />
                                <defs>
                                    <linearGradient id="paint0_linear_1_250" x1="16.9752" y1="-1.49316" x2="27.3365" y2="55.5097" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#DD2A7B" />
                                        <stop offset="0.41261" stopColor="#9747FF" />
                                        <stop offset="1" stopColor="#334CCA" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>

                        <h2 className="mb-2 text-center text-2xl font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                            Create New Invoice
                        </h2>

                        <p className="text-gray-500 mb-4 text-sm leading-7">
                            Start by creating and sending new invoice
                        </p>
                    </div>
                </div>

                {/* Reduced gap here */}
                <div className="flex justify-center items-center py-2 mb-4">
                    <p className="text-sm bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent text-center">
                        Or Upload an existing invoice and set payment reminder
                    </p>
                </div>




                {/* Time Period Selection */}
                {/* Time Period Buttons */}
                <div className="bg-white rounded-2xl p-4 mb-6 border border-gray-200">
                    <div className="flex flex-wrap space-x-2 mb-3">
                        {(['1Month', '3Months', '1Year'] as Period[]).map((period) => (
                            <button
                                key={period}
                                onClick={() => setSelectedPeriod(period)}
                                className={`flex items-center justify-center space-x-2 text-sm ${selectedPeriod === period ? "font-medium" : "text-gray-500"
                                    }`}
                                style={{
                                    width: "80px",
                                    height: "28px",
                                    borderRadius: "16px",
                                    padding: "4px 12px",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                    borderColor: selectedPeriod === period ? "#C084FC" : "#E5E7EB",
                                    backgroundColor: selectedPeriod === period ? "#F5F3FF" : "#F9FAFB",
                                    ...(selectedPeriod === period
                                        ? {
                                            background:
                                                "linear-gradient(169.7deg, #DD2A7B 1.49%, #9747FF 42.07%, #334CCA 99.84%)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }
                                        : {}),
                                }}
                            >
                                <span>{period}</span>
                                {period === "1Year" && (
                                    <GradientIconWrapper>
                                        <Crown />
                                    </GradientIconWrapper>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Custom button on a new line */}
                    <div className="mt-2">
                        <button
                            onClick={() => setSelectedPeriod("Custom")}
                            className={`flex items-center space-x-1 text-sm ${selectedPeriod === "Custom" ? "font-medium" : "text-gray-500"
                                }`}
                            style={{
                                width: "auto",
                                height: "28px",
                                borderRadius: "16px",
                                padding: "4px 12px",
                                borderWidth: "1px",
                                borderStyle: "solid",
                                borderColor: selectedPeriod === "Custom" ? "#C084FC" : "#E5E7EB",
                                backgroundColor: selectedPeriod === "Custom" ? "#F5F3FF" : "#F9FAFB",
                                ...(selectedPeriod === "Custom"
                                    ? {
                                        background:
                                            "linear-gradient(169.7deg, #DD2A7B 1.49%, #9747FF 42.07%, #334CCA 99.84%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }
                                    : {}),
                            }}
                        >
                            <Calendar className="w-4 h-4" />
                            <span>Custom</span>
                        </button>
                    </div>
                </div>

                {/* Total Earnings */}
                <div className="bg-white rounded-2xl p-4 mb-6 border border-gray-200">
                    <h3 className="text-gray-600 font-medium mb-2">Total Earnings</h3>
                    <div className="text-3xl font-bold text-purple-600">$1,25,000</div>
                </div>

                {/* Payment Status Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-2xl p-4 border border-gray-200">
                        <h4 className="text-gray-600 font-medium mb-2">Payment Awaited</h4>
                        <div className="text-2xl font-bold text-purple-600">$25,000</div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 border border-gray-200">
                        <h4 className="text-gray-600 font-medium mb-2">Payment Overdue</h4>
                        <div className="text-2xl font-bold text-purple-600">$25,000</div>
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
      <YAxis
        yAxisId="right"
        orientation="right"
        stroke="#5A0C0C"   // ✅ makes axis & ticks maroon
      />
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
                        <div className="space-y-3">
  {invoices.map((invoice) => (
    <div
      key={invoice.id}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex justify-between items-center"
    >
      <div>
        <div className="font-medium text-gray-800">{invoice.clientName}</div>
        <div className="text-sm text-gray-500">
          {formatCurrency(invoice.amount)}, Due: {invoice.dueDate}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {invoice.id === 1 ? (
          <select
            value={statuses[invoice.id] ?? "Update Status"}
            onChange={(e) =>
              handleStatusChange(invoice.id, e.target.value as Invoice["status"])
            }
            className={`rounded-full text-sm font-medium cursor-pointer px-3 py-1 w-auto ${
              getStatusColor(statuses[invoice.id] ?? invoice.status)
            }`}
        
  style={{ width: "auto", minWidth: 0 }}
          >
            {[
              "Update Status",
              "paid",
              "unpaid",
              "disputed",
              "overdue",
              "partially-paid",
              "draft",
              "awaited",
            ].map((s) => (
              <option key={s} value={s}>
                {s === "partially-paid"
                  ? "Partially Paid"
                  : s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        ) : (
          <>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                invoice.status
              )}`}
            >
              {getStatusText(invoice.status)}
            </span>
            {(invoice.status === "overdue" || invoice.status === "awaited") && (
              <Bell className="w-4 h-4 text-gray-400" />
            )}
            {invoice.status === "draft" && (
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

                <div className="text-center mt-8 pb-6">
                    <div className="flex items-center justify-center mb-2 text-gray-600 font-semibold">
                        <span>Spark</span>

                        {/* Paw SVG replacing lightning ⚡ */}
                        <span className="inline-block relative mx-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    opacity: 1,
                                    display: 'inline-block',
                                    verticalAlign: 'middle',
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="pawGradient"
                                        gradientUnits="userSpaceOnUse"
                                        x1="0"
                                        y1="0"
                                        x2="512"
                                        y2="512"
                                    >
                                        <stop offset="1.49%" stopColor="#DD2A7B" />
                                        <stop offset="42.07%" stopColor="#9747FF" />
                                        <stop offset="99.84%" stopColor="#334CCA" />
                                    </linearGradient>
                                </defs>
                                <path
                                    fill="url(#pawGradient)"
                                    d="M490.39 182.75c-5.55-13.19-14.77-22.7-26.67-27.49l-.16-.06a46.5 46.5 0 0 0-17-3.2h-.64c-27.24.41-55.05 23.56-69.19 57.61c-10.37 24.9-11.56 51.68-3.18 71.64c5.54 13.2 14.78 22.71 26.73 27.5l.13.05a46.5 46.5 0 0 0 17 3.2c27.5 0 55.6-23.15 70-57.65c10.24-24.87 11.37-51.63 2.98-71.6M381.55 329.61c-15.71-9.44-30.56-18.37-40.26-34.41C314.53 250.8 298.37 224 256 224s-58.57 26.8-85.39 71.2c-9.72 16.06-24.6 25-40.36 34.48c-18.07 10.86-36.74 22.08-44.8 44.16a66.9 66.9 0 0 0-4.65 25c0 35.95 28 65.2 62.4 65.2c17.75 0 36.64-6.15 56.63-12.66c19.22-6.26 39.09-12.73 56.27-12.73s37 6.47 56.15 12.73C332.2 457.85 351 464 368.8 464c34.35 0 62.3-29.25 62.3-65.2a67 67 0 0 0-4.75-25c-8.06-22.1-26.74-33.33-44.8-44.19M150 188.85c11.9 14.93 27 23.15 42.52 23.15a43 43 0 0 0 6.33-.47c32.37-4.76 52.54-44.26 45.92-90C242 102.3 234.6 84.39 224 71.11C212.12 56.21 197 48 181.49 48a43 43 0 0 0-6.33.47c-32.37 4.76-52.54 44.26-45.92 90c2.76 19.2 10.16 37.09 20.76 50.38m163.16 22.68a43 43 0 0 0 6.33.47c15.53 0 30.62-8.22 42.52-23.15c10.59-13.29 17.95-31.18 20.75-50.4c6.62-45.72-13.55-85.22-45.92-90a43 43 0 0 0-6.33-.47C315 48 299.88 56.21 288 71.11c-10.6 13.28-18 31.19-20.76 50.44c-6.62 45.72 13.55 85.22 45.92 89.98M111.59 308.8l.14-.05c11.93-4.79 21.16-14.29 26.69-27.48c8.38-20 7.2-46.75-3.15-71.65C120.94 175.16 92.85 152 65.38 152a46.4 46.4 0 0 0-17 3.2l-.14.05c-11.9 4.75-21.13 14.29-26.66 27.48c-8.38 20-7.2 46.75 3.15 71.65C39.06 288.84 67.15 312 94.62 312a46.4 46.4 0 0 0 16.97-3.2"
                                />
                            </svg>
                        </span>

                        <span className='font-normal'>nomy</span>
                    </div>

                    <div className="text-gray-500 text-sm">
                        sparking the creator economy
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
                {/* <div className="text-center mt-8 pb-6">
                    <div className="text-gray-600 font-semibold">Spark⚡nomy</div>
                    <div className="text-gray-500 text-sm">sparking the creator economy</div>
                </div> */}
            </div>
        </div>
    );



    return currentView === 'dashboard' ? <DashboardView /> : <InvoicesView />;
};

export default InvoiceDashboard;