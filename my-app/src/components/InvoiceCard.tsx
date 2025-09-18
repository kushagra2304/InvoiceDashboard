import React, { useState } from "react";
import { Bell, Edit } from "lucide-react";

interface Invoice {
  id: number;
  clientName: string;
  amount: number;
  dueDate: string;
  status:
    | "Update Status"
    | "paid"
    | "unpaid"
    | "disputed"
    | "overdue"
    | "partially-paid"
    | "draft"
    | "awaited";
}

interface InvoiceCardProps {
  invoice: Invoice;
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-green-400 text-white";
    case "unpaid":
      return "bg-gray-300 text-gray-700";
    case "disputed":
      return "bg-red-400 text-white";
    case "overdue":
      return "bg-red-400 text-white";
    case "partially-paid":
      return "bg-yellow-400 text-white";
    case "draft":
      return "bg-gray-400 text-white";
    case "awaited":
      return "bg-yellow-400 text-white";
    default:
      return "bg-gray-300 text-gray-700";
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case "paid":
      return "Paid";
    case "unpaid":
      return "Unpaid";
    case "disputed":
      return "Disputed";
    case "overdue":
      return "Overdue";
    case "partially-paid":
      return "Partially Paid";
    case "draft":
      return "Draft";
    case "awaited":
      return "Awaited";
    default:
      return status;
  }
};

const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;

const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice }) => {
  const [status, setStatus] = useState<Invoice["status"]>();

  return (
    <div className="flex justify-between items-center py-2">
      <div>
        <div className="font-medium text-gray-800">{invoice.clientName}</div>
        <div className="text-sm text-gray-500">
          {formatCurrency(invoice.amount)}, Due: {invoice.dueDate}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {invoice.id === 1 ? (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Invoice["status"])}
            className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer"
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
            {invoice.status === "draft" && <Edit className="w-4 h-4 text-gray-400" />}
          </>
        )}
      </div>
    </div>
  );
};

export default InvoiceCard;
