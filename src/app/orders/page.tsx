import DashboardHeader from "@/components/dashboardHeader";
import { Dot } from "lucide-react";
import { OrdersResponse } from "./types";
import { getAllOrders } from "./_actions/orders";

const OrdersPage = async () => {
  const ordersItemsResponse: OrdersResponse = await getAllOrders("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTZkOTgyYTAyZTdlYTVlYTE2MjJiZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1OTk1OTQ1N30.XWrU8c0-ZQdhKPV6cHg6rgjWZAlrPW0nSQh8G39cWI8")

  if (ordersItemsResponse.success === false) {
    return <p>something went wrong white fetching orders</p>
  }

  return (
    <main className="w-full  mx-auto p-4 space-y-6">

      <div className="lg:col-span-2 bg-white rounded-lg shadow-sm ">
        <DashboardHeader
          title="Recent Orders"
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
                  Amount
                </th>
                <th className="p-3 text-sm font-medium text-gray-700">
                  Date
                </th>
                <th className="p-3 text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="p-3 text-sm font-medium text-gray-700">
                  Payment
                </th>
              </tr>
            </thead>
            <tbody>
              {ordersItemsResponse.data.map((order) => (
                <tr key={order._id} className="not-last:border-b border-[var(--fontgray)] hover:bg-gray-50">
                  <td className="p-3 text-sm text-gray-700">
                    {order.userId}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {order.items.map((item) => item.name).join(", ")}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {order.amount}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {
                      new Date(order.date).toLocaleString()
                    }
                  </td>
                  <td className="py-3  text-sm whitespace-nowrap">
                    <p
                      className={`px-2 py-1 flex justify-center rounded-2xl  items-center gap-1 text-sm font-medium 
                        ${order.status === "pending"
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
                    {order.payment === true ? (
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