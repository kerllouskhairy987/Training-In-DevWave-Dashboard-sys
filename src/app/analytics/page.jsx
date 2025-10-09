"use client";
import { stockAlerts,stats } from "@/data/data";
import SalesSwiper from "@/components/SalesSwipper"
import { Crown, Dot } from "lucide-react";
const AnalyticsPage = () => {
  const handleRefill = (id) => {
    alert("Refill action triggered!"+id);
  };
  return (
    <main className="w-full  mx-auto p-4 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white p-5 rounded-lg shadow-sm flex items-center gap-4"
          >
            <div className="icon bg-blue-500 text-white p-3 rounded-full">
              {stat.icon}
            </div>
            <div>
              <p className="text-xl font-semibold">{stat.number}</p>
              <p className="text-sm text-gray-500">{stat.text}</p>
            </div>
          </div>
        ))}
      </div>
            {/* analytics + Best Seller */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/*analytics slider */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-5">
  <h2 className="font-medium text-2xl">Analytics / Reports</h2>
          <div className="overflow-x-auto my-scroll-container pb-5">
            <SalesSwiper></SalesSwiper>
          </div>
        </div>

        {/* Best Seller */}
        <div className="bg-white rounded-lg shadow-sm flex flex-col max-h-100 justify-center items-center p-6">
          <div className="mb-4 bg-[var(--secondarycolor)] p-4 rounded-full">
            <Crown size={40} className="text-white" />
          </div>
          <h3 className="md:text-2xl text-lg font-semibold mb-2">
            Today’s Best Seller
          </h3>
          <p className="text-gray-500">Big Mac Combo Large</p>
        </div>
      </div>
      {/* stock alerts */}
      <div className="bg-white rounded-lg shadow-sm p-5">
        <h2 className="font-medium text-2xl mb-4">Stock Alerts</h2>
        <div className="overflow-x-auto my-scroll-container">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="text-left border-b border-[var(--fontgray)] bg-gray-50">
                <th className="p-3 text-sm font-medium text-gray-700">
                  Product
                </th>
                <th className="p-3 text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="p-3 text-sm font-medium text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {stockAlerts.map((alert) => (
                <tr
                  key={alert.id}
                  className="not-last:border-b border-[var(--fontgray)] hover:bg-gray-50"
                >
                  <td className="p-3 text-sm text-gray-700">{alert.product}</td>
                  <td className="p-3 text-sm">
                    <p
                      className={`px-2 py-1 justify-center rounded-full flex items-center gap-1 text-sm font-medium 
                        ${
                          alert.status === "Running low"
                            ? "text-[#D97706] bg-[#FEF3C7]"
                            : alert.status === "out of stock"
                            ? "text-[#B91C1C] bg-[#FEE2E2]"
                            : "text-[#15803D] bg-[#DCFCE7]"
                        }`}
                    >
                      <Dot size={20} />
                      {alert.status.charAt(0).toUpperCase() +
                        alert.status.slice(1)}
                    </p>
                  </td>
                  <td className="p-3 text-sm">
                    {alert.status === "restocked" ? (
                      <div></div>
                    ) : (
                      <button
                        onClick={()=>handleRefill(alert.id)}
                        className="bg-[#E63746] text-white rounded-md px-3 py-1 text-xs font-medium hover:bg-[#C5303E] transition cursor-pointer"
                      >
                        {alert.action}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};
export default AnalyticsPage;
