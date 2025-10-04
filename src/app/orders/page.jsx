"use client";
import { useState } from "react";
import { orders } from "@/data/data";
import DashboardHeader from "@/components/dashboardHeader";
import { Dot } from "lucide-react";
const OrdersPage = () => {
    const [filteredOrders, setFilteredOrders] = useState(orders);
  const handleFilterChange = ({ search, startDate, endDate, status }) => {
    let result = [...orders];

    // Search
    if (search) {
      result = result.filter(
        (o) =>
          o.customer.toLowerCase().includes(search.toLowerCase()) ||
          o.product.toLowerCase().includes(search.toLowerCase()) ||
          o.orderNumber.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Date filter
    if (startDate || endDate) {
      result = result.filter((o) => {
        const orderDate = new Date(o.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        return (!start || orderDate >= start) && (!end || orderDate <= end);
      });
    }

    // Status filter
    if (status !== "all") {
      result = result.filter((o) => o.status === status);
    }
    setFilteredOrders(result);
  };

    return(
            <main className="w-full  mx-auto p-4 space-y-6">

              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm ">
          <DashboardHeader
            title="Recent Orders"
            onFilterChange={handleFilterChange}
          />

          <div className="overflow-x-auto my-scroll-container pb-5">
            <table className="w-full border-collapse min-w-[820px]">
              <thead>
                <tr className="text-left border-b border-[var(--fontgray)] bg-gray-50">
                  <th className="p-3 text-sm font-medium text-gray-700">
                    Customer
                  </th>
                  <th className="p-3 text-sm font-medium text-gray-700">
                    Product
                  </th>
                  <th className="p-3 text-sm font-medium text-gray-700">
                    Order Number
                  </th>
                  <th className="p-3 text-sm font-medium text-gray-700">
                    Date
                  </th>
                  <th className="p-3 text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="p-3 text-sm font-medium text-gray-700">
                    Confirmation
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="not-last:border-b border-[var(--fontgray)] hover:bg-gray-50">
                    <td className="p-3 text-sm text-gray-700">
                      {order.customer}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {order.product}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {order.orderNumber}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {new Date(order.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-3 text-sm">
                      <p
                        className={`px-2 py-1  justify-center rounded-full flex items-center gap-1 text-sm font-medium 
                        ${
                          order.status === "pending"
                            ? "text-[#FACC15] bg-[#FEF9C3]"
                            : order.status === "completed"
                            ? "text-[#15803D] bg-[#DCFCE7]"
                            : "text-[#B91C1C] bg-[#FEE2E2]"
                        }`}
                      >
                        <Dot size={20} />
                        {order.status}
                      </p>
                    </td>
                    <td className="p-3 text-sm">
                      {order.confirmation ? (
                        <span className="flex justify-center bg-[#15803D] text-white rounded-md px-3 py-1 text-xs font-medium">
                          Confirmed
                        </span>
                      ) : (
                        <span className="flex justify-center bg-[#E63746] whitespace-nowrap text-white rounded-md px-3 py-1 text-xs font-medium">
                          Not Confirmed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </main>
    )
}
export default OrdersPage;