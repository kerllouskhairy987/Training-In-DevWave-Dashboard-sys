"use client";
import { staffMembers as initialStaff } from "../../data/data";
import { useState } from "react";
import { Dot, PenLine, Trash2 } from "lucide-react";
import DashboardHeader from "@/components/dashboardHeader";
import img from "@/../public/image.png";
import Image from "next/image";

const StaffPage = () => {
  const [allStaff, setAllStaff] = useState(initialStaff);
  const [filteredStaff, setFilteredStaff] = useState(initialStaff);

  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newStaff, setNewStaff] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    role: "",
    salary: "",
  });

  // 🔎 Search logic
  const handleFilterChange = ({ search }) => {
    if (!search) {
      setFilteredStaff(allStaff);
      return;
    }

    const result = allStaff.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()) ||
        s.phone.toLowerCase().includes(search.toLowerCase()) ||
        s.role.toLowerCase().includes(search.toLowerCase()) ||
        s.salary.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredStaff(result);
  };

  // ➕ Add or Update
  const handleConfirm = () => {
    if (
      !newStaff.name ||
      !newStaff.email ||
      !newStaff.phone ||
      !newStaff.role ||
      !newStaff.salary
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (editingId) {
      const updated = allStaff.map((item) =>
        item.id === editingId ? { ...newStaff, id: editingId } : item
      );
      setAllStaff(updated);
      setFilteredStaff(updated);
    } else {
      const newItem = { ...newStaff, id: Date.now() };
      const updated = [newItem, ...allStaff];
      setAllStaff(updated);
      setFilteredStaff(updated);
    }

    // Reset
    setNewStaff({
      id: null,
      name: "",
      email: "",
      phone: "",
      role: "",
      salary: "",
    });
    setEditingId(null);
    setShowAdd(false);
  };

  // ❌ Remove staff
  const handleRemove = (id) => {
    const updated = allStaff.filter((item) => item.id !== id);
    setAllStaff(updated);
    setFilteredStaff(updated);
  };

  // 🖊 Edit
  const handleEdit = (item) => {
    setNewStaff(item);
    setEditingId(item.id);
    setShowAdd(true);
  };

  // ❌ Clear all
  const handleClearStaff = () => {
    setAllStaff([]);
    setFilteredStaff([]);
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

            <h2 className="text-2xl font-semibold text-start">
              {editingId ? "Edit Staff Member" : "Add Staff Member"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Name</label>
                <input
                  type="text"
                  value={newStaff.name}
                  placeholder="Enter staff name"
                  className="border-2 border-gray-300 px-4 py-2 rounded-lg"
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, name: e.target.value })
                  }
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Email</label>
                <input
                  type="text"
                  value={newStaff.email}
                  placeholder="Enter staff email"
                  className="border-2 border-gray-300 px-4 py-2 rounded-lg"
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, email: e.target.value })
                  }
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Phone</label>
                <input
                  type="text"
                  value={newStaff.phone}
                  placeholder="Enter phone number"
                  className="border-2 border-gray-300 px-4 py-2 rounded-lg"
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, phone: e.target.value })
                  }
                />
              </div>

              {/* Role */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Role</label>
                <input
                  type="text"
                  value={newStaff.role}
                  placeholder="Enter role (e.g. Chef)"
                  className="border-2 border-gray-300 px-4 py-2 rounded-lg"
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, role: e.target.value })
                  }
                />
              </div>

              {/* Salary */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Salary</label>
                <input
                  type="text"
                  value={newStaff.salary}
                  placeholder="Enter salary"
                  className="border-2 border-gray-300 px-4 py-2 rounded-lg"
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, salary: e.target.value })
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
              title="Staff"
              onFilterChange={handleFilterChange}
              noFilter={true}
            />

            {/* Buttons */}
            <div className="w-full flex justify-end px-10 items-center">
              <button
                onClick={() => setShowAdd(true)}
                className="add bg-[#E63746] text-white px-3 py-1 rounded-md text-lg hover:bg-[#F87171] mb-3 ml-3"
              >
                + New Staff
              </button>
              <button
                onClick={handleClearStaff}
                className="delete bg-[#447A9C] text-white px-3 py-1 rounded-md text-lg hover:bg-[#6CAEDB] mb-3 ml-3"
              >
                <Trash2 size={16} className="inline-block mr-2" />
                Delete All
              </button>
            </div>

            {/* Empty state */}
            {filteredStaff.length === 0 ? (
              <div className="w-full flex flex-col justify-center items-center py-20 gap-4">
                <Image
                  src={img}
                  alt=""
                  className="w-20 h-20 rounded-md object-cover"
                />
                <p className="text-lg text-gray-600">No staff members found</p>
                <button
                  onClick={() => setShowAdd(true)}
                  className="add bg-[#E63746] text-white px-3 py-1 rounded-md text-lg hover:bg-[#F87171] mb-3 ml-3"
                >
                  + New Staff
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
                        Role
                      </th>
                      <th className="p-3 text-sm font-medium text-gray-700">
                        Salary
                      </th>
                      <th className="p-3 text-sm font-medium text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStaff.map((member) => (
                      <tr
                        key={member.id}
                        className="border-b border-[var(--fontgray)] hover:bg-gray-50"
                      >
                        <td className="p-3 text-sm text-gray-700">
                          {member.name}
                        </td>
                        <td className="p-3 text-sm text-gray-700">
                          {member.email}
                        </td>
                        <td className="p-3 text-sm text-gray-700">
                          {member.phone}
                        </td>
                        <td className="p-3 text-sm text-gray-700">
                          {member.role}
                        </td>
                        <td className="p-3 text-sm text-gray-700">
                          <p
                            className={`px-2 py-1 max-w-30 justify-center rounded-2xl flex items-center gap-1 text-sm font-medium
    ${
    parseInt(member.salary.replace("$","")) >= 2000
        ? "text-[#15803D] bg-[#DCFCE7]" // 🟢 High-tier
        : parseInt(member.salary.replace("$",""))  >= 1000
        ? "text-[#FACC15] bg-[#FEF9C3]" // 🟡 Mid-tier
        : "text-[#B91C1C] bg-[#FEE2E2]" // 🔴 Entry-level
    }`}
                          >
                            <Dot size={20} />
                            {member.salary.toLocaleString()} $
                          </p>
                        </td>

                        {/* Actions */}
                        <td className="p-3 text-sm text-gray-700 flex items-center gap-3">
                          <button
                            onClick={() => handleEdit(member)}
                            className="text-[#E63746] bg-[#FEE2E2] hover:bg-[#FDCACA] p-2 rounded-lg cursor-pointer transition"
                          >
                            <PenLine size={16} />
                          </button>
                          <button
                            onClick={() => handleRemove(member.id)}
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

export default StaffPage;
