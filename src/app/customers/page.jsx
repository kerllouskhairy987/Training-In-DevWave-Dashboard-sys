"use client";
import { customers as initialCustomers } from "../../data/data";
import { useState } from "react";
import { PenLine, Trash2, Dot } from "lucide-react";
import DashboardHeader from "@/components/dashboardHeader";
import img from "@/../public/image.png";
import Image from "next/image";

const CustomerPage = () => {
  // ✅ Two states: one for all data, one for filtered
  const [allCustomers, setAllCustomers] = useState(initialCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState(initialCustomers);

  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    ordersMade: null,
    loyaltyPoints: null,
  });
  // 🔎 Search / Filter logic
  const handleFilterChange = ({ search }) => {
    if (!search) {
      setFilteredCustomers(allCustomers);
      return;
    }

    const result = allCustomers.filter(
      (o) =>
        o.name.toLowerCase().includes(search.toLowerCase()) ||
        o.email.toLowerCase().includes(search.toLowerCase()) ||
        o.phone.toLowerCase().includes(search.toLowerCase()) ||
        o.ordersMade === Number(search) ||
        o.loyaltyPoints === Number(search)
    );

    setFilteredCustomers(result);
  };

  // ➕ Add or Update item
  const handleConfirm = () => {
    if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
      alert("Please fill all required fields");
      return;
    }

    if (editingId) {
      // ✏️ Update
      const updated = allCustomers.map((item) =>
        item.id === editingId ? { ...newCustomer, id: editingId } : item
      );
      setAllCustomers(updated);
      setFilteredCustomers(updated);
    } else {
      // ➕ Add new
      const newItem = { ...newCustomer, id: Date.now() };
      const updated = [newItem, ...allCustomers];
      setAllCustomers(updated);
      setFilteredCustomers(updated);
    }

    // reset
    setNewCustomer({
      id: null,
      name: "",
      email: "",
      phone: "",
      ordersMade: 0,
      loyaltyPoints: 0,
    });
    setEditingId(null);
    setShowAdd(false);
  };

  // ❌ Remove item
  const handleRemove = (id) => {
    const updated = allCustomers.filter((item) => item.id !== id);
    setAllCustomers(updated);
    setFilteredCustomers(updated);
  };

  // 🖊 Edit item
  const handleEdit = (item) => {
    setNewCustomer(item);
    setEditingId(item.id);
    setShowAdd(true);
  };

  // ❌ Clear all
  const handleClearCustomer = () => {
    setAllCustomers([]);
    setFilteredCustomers([]);
  };

  return (
    <>
      {/* Add/Edit Modal */}
      {showAdd && (
        <div className="fixed top-0 left-0 w-full bg-[#00000080] backdrop-blur-sm z-50 h-dvh flex justify-center items-center">
          <div className="bg-white flex flex-col text-black p-6 rounded-md w-11/12 md:w-2/3 lg:w-1/2 min-h-80 relative space-y-6">
            {/* Close button */}
            <button
              onClick={() => {
                setShowAdd(false);
                setEditingId(null);
              }}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-start">
              {editingId ? "Edit Customer" : "Add Customer"}
            </h2>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Customer's Name</label>
                <input
                  placeholder="Enter customer's name"
                  type="text"
                  value={newCustomer.name}
                  className="border-2 border-gray-300 px-4 py-2 rounded-lg"
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, name: e.target.value })
                  }
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Customer's Email</label>
                <input
                  type="text"
                  value={newCustomer.email}
                  placeholder="Enter customer's email"
                  className="border-2 border-gray-300 px-4 py-2 rounded-lg focus:border-blue-500 outline-0 transition"
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, email: e.target.value })
                  }
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Customer's Phone</label>
                <input
                  type="text"
                  value={newCustomer.phone}
                  placeholder="Enter customer's phone"
                  className="border-2 border-gray-300 px-4 py-2 rounded-lg focus:border-blue-500 outline-0 transition"
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, phone: e.target.value })
                  }
                />
              </div>

              {/* Orders */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Orders Made</label>
                <input
                  type="number"
                  value={newCustomer.ordersMade}
                  placeholder="Enter number of orders"
                  className="border-2 border-gray-300 px-4 py-2 rounded-lg focus:border-blue-500 outline-0 transition"
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      ordersMade: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>

              {/* Loyalty */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Loyalty Points</label>
                <input
                  type="number"
                  value={newCustomer.loyaltyPoints}
                  placeholder="Enter loyalty points"
                  className="border-2 border-gray-300 px-4 py-2 rounded-lg focus:border-blue-500 outline-0 transition"
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      loyaltyPoints: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleConfirm}
                className="bg-[#E63746] text-white px-5 py-2 rounded-md text-md hover:bg-[#F87171] transition"
              >
                {editingId ? "Update" : "Confirm"}
              </button>
              <button
                onClick={() => {
                  setShowAdd(false);
                  setEditingId(null);
                }}
                className="text-gray-600 border-2 border-gray-300 px-5 py-2 rounded-md text-md hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Page */}
      <div>
        <main className="w-full mx-auto p-4 space-y-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
            <DashboardHeader
              title="Customers"
              onFilterChange={handleFilterChange}
              noFilter={true}
            />

            {/* Buttons */}
            <div className="w-full flex justify-end px-10 items-center">
              <button
                onClick={() => setShowAdd(true)}
                className="add bg-[#E63746] text-white px-3 py-1 rounded-md text-lg hover:bg-[#F87171] mb-3 ml-3"
              >
                + New Customer
              </button>
              <button
                onClick={handleClearCustomer}
                className="delete bg-[#447A9C] text-white px-3 py-1 rounded-md text-lg hover:bg-[#6CAEDB] mb-3 ml-3"
              >
                <Trash2 size={16} className="inline-block mr-2" />
                Delete All
              </button>
            </div>

            {/* Empty state */}
            {filteredCustomers.length === 0 ? (
              <div className="w-full flex flex-col justify-center items-center py-20 gap-4">
                <Image
                  src={img}
                  alt=""
                  className="w-20 h-20 rounded-md object-cover"
                />
                <p className="text-lg text-gray-600">No customers found</p>
                <button
                  onClick={() => setShowAdd(true)}
                  className="add bg-[#E63746] text-white px-3 py-1 rounded-md text-lg hover:bg-[#F87171] mb-3 ml-3"
                >
                  + New Item
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto my-scroll-container pb-5">
                <table className="w-full border-collapse min-w-[820px]">
                  <thead>
                    <tr className="text-left border-b border-[var(--fontgray)] bg-gray-50">
                      <th className="p-3 text-sm font-medium text-gray-700">
                        Name
                      </th>
                      <th className="p-3 text-sm font-medium text-gray-700">
                        Email
                      </th>
                      <th className="p-3 text-sm font-medium text-gray-700">
                        Phone
                      </th>
                      <th className="p-3 text-sm font-medium text-gray-700">
                        Orders Made
                      </th>
                      <th className="p-3 text-sm font-medium text-gray-700">
                        Loyalty Points
                      </th>
                      <th className="p-3 text-sm font-medium text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((customer) => (
                      <tr
                        key={customer.id}
                        className="border-b border-[var(--fontgray)] hover:bg-gray-50"
                      >
                        <td className="p-3 text-sm text-gray-700">
                          {customer.name}
                        </td>
                        <td className="p-3 text-sm text-gray-700">
                          {customer.email}
                        </td>
                        <td className="p-3 text-sm text-gray-700">
                          {customer.phone}
                        </td>
                        <td className="p-3 text-sm text-gray-700">
                          {customer.ordersMade}
                        </td>

                        {/* loyalty */}
                        <td className="p-3 text-sm ">
                          <p
                            className={`px-2 py-1 max-w-30 justify-center rounded-2xl flex items-center gap-1 text-sm font-medium 
           ${
             customer.loyaltyPoints >= 1800
               ? "text-[#15803D] bg-[#DCFCE7]" // 🟢 VIP
               : customer.loyaltyPoints >= 800
               ? "text-[#FACC15] bg-[#FEF9C3]" // 🟡 Regular
               : "text-[#B91C1C] bg-[#FEE2E2]" // 🔴 New/Low
           }`}
                          >
                            <Dot size={20} />
                            {customer.loyaltyPoints}
                          </p>
                        </td>

                        {/* Actions */}
                        <td className="p-3 text-sm text-gray-700 flex items-center gap-3">
                          <button
                            onClick={() => handleEdit(customer)}
                            className="text-[#E63746] bg-[#FEE2E2] hover:bg-[#FDCACA] p-2 rounded-lg cursor-pointer transition"
                          >
                            <PenLine size={16} />
                          </button>
                          <button
                            onClick={() => handleRemove(customer.id)}
                            className="text-[#447A9C] bg-[#E1F0F6] hover:bg-[#B3D8E9] p-2 rounded-lg cursor-pointer transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default CustomerPage;
