"use client";
import { menuData } from "../../data/data";
import { useState } from "react";
import { PenLine, Trash2, Dot } from "lucide-react";
import DashboardHeader from "@/components/dashboardHeader";
import img from "@/../public/image.png";
import Image from "next/image";
const menuPage = () => {
  const [filteredMenu, setFilteredMenu] = useState(menuData);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState(null); // track editing item
  const [newMenu, setNewMenu] = useState({
    id: null,
    image: "",
    product: "",
    category: "",
    price: 0,
    description: "",
    quantity: 0,
    availability: "Available",
  });

  // 🔎 search filter
  const handleFilterChange = ({ search }) => {
    let result = [...menuData];
    if (search) {
      result = result.filter(
        (o) =>
          o.product.toLowerCase().includes(search.toLowerCase()) ||
          o.category.toLowerCase().includes(search.toLowerCase()) ||
          o.price == search ||
          o.quantity == search
      );
      setFilteredMenu(result);
    } else {
      setFilteredMenu(menuData);
    }
  };

  // ➕ Add or Update item
  const handleConfirm = () => {
    if (!newMenu.product || !newMenu.category) {
      alert("Please fill all required fields");
      return;
    }

    if (editingId) {
      // update existing
      const updatedMenu = filteredMenu.map((item) =>
        item.id === editingId ? { ...newMenu, id: editingId } : item
      );
      setFilteredMenu(updatedMenu);
    } else {
      // add new
      const newItem = { ...newMenu, id: Date.now() };
      setFilteredMenu([...filteredMenu, newItem]);
    }

    // reset
    setNewMenu({
      id: null,
      image: "",
      product: "",
      category: "",
      price: 0,
      description: "",
      quantity: 0,
      availability: "Available",
    });
    setEditingId(null);
    setShowAdd(false);
  };
  // ❌ Remove item
  const handleRemove = (id) => {
    const updatedMenu = filteredMenu.filter((item) => item.id !== id);
    setFilteredMenu(updatedMenu);
  };

  // 🖊 Edit item
  const handleEdit = (item) => {
    setNewMenu(item);
    setEditingId(item.id);
    setShowAdd(true);
  };

  // ❌ clear all items
  const handleClearMenu = () => {
    setFilteredMenu([]);
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
              {editingId ? "Edit Item" : "Add Item"}
            </h2>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upload image */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Item’s Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="border-2 border-gray-300 px-4 py-2 rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 hover:file:bg-gray-200"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const previewUrl = URL.createObjectURL(file);
                      setNewMenu({ ...newMenu, image: previewUrl });
                    }
                  }}
                />
                {newMenu.image && (
                  <img
                    src={newMenu.image}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded-md mt-2"
                  />
                )}
              </div>

              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Item’s Name</label>
                <input
                  type="text"
                  value={newMenu.product}
                  placeholder="Write a name for the item"
                  className="border-2 border-gray-300 px-4 py-2 rounded-lg focus:border-blue-500 outline-0 transition"
                  onChange={(e) =>
                    setNewMenu({ ...newMenu, product: e.target.value })
                  }
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Category</label>
                <select
                  value={newMenu.category}
                  className="border-2 border-gray-300 px-4 py-2 rounded-lg focus:border-blue-500 outline-0 transition"
                  onChange={(e) =>
                    setNewMenu({ ...newMenu, category: e.target.value })
                  }
                >
                  <option value="">Choose item’s category</option>
                  <option value="Burgers">Burgers</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Drinks">Drinks</option>
                </select>
              </div>

              {/* Price */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Price</label>
                <input
                  type="number"
                  value={newMenu.price}
                  placeholder="Enter the price"
                  className="border-2 border-gray-300 px-4 py-2 rounded-lg focus:border-blue-500 outline-0 transition"
                  onChange={(e) =>
                    setNewMenu({
                      ...newMenu,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2 md:col-span-1">
                <label className="text-sm font-bold">Description</label>
                <textarea
                  value={newMenu.description}
                  placeholder="Write some details about this item"
                  className="border-2 border-gray-300 px-4 py-2 rounded-lg focus:border-blue-500 outline-0 transition resize-none"
                  onChange={(e) =>
                    setNewMenu({ ...newMenu, description: e.target.value })
                  }
                />
              </div>

              {/* Quantity */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Quantity</label>
                <input
                  type="number"
                  value={newMenu.quantity}
                  placeholder="Enter amount in stock"
                  className="border-2 border-gray-300 px-4 py-2 rounded-lg focus:border-blue-500 outline-0 transition"
                  onChange={(e) => {
                    const qty = parseInt(e.target.value) || 0;
                    let status = "Available";
                    if (qty > 0 && qty <= 10) status = "Low Stock";
                    if (qty === 0) status = "Out of Stock";

                    setNewMenu({
                      ...newMenu,
                      quantity: qty,
                      availability: status,
                    });
                  }}
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
              title="Menu Management"
              onFilterChange={handleFilterChange}
              noFilter={true}
            />

            {/* Buttons */}
            <div className="w-full flex justify-end px-10 items-center">
              <button
                onClick={() => setShowAdd(true)}
                className="add bg-[#E63746] text-white px-3 py-1 rounded-md text-lg hover:bg-[#F87171] mb-3 ml-3"
              >
                + New Item
              </button>
              <button
                onClick={handleClearMenu}
                className="delete bg-[#447A9C] text-white px-3 py-1 rounded-md text-lg hover:bg-[#6CAEDB] mb-3 ml-3"
              >
                <Trash2 size={16} className="inline-block mr-2" />
                Delete All
              </button>
            </div>

            {/* if menu is empty */}
            {filteredMenu.length === 0 ? (
              <div className="w-full flex flex-col justify-center items-center py-20 gap-4">
                <Image
                  src={img}
                  alt=""
                  className="w-20 h-20 rounded-md object-cover"
                />
                <p className="text-lg text-gray-600">No menu items found</p>
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
                        Product
                      </th>
                      <th className="p-3 text-sm font-medium text-gray-700">
                        Category
                      </th>
                      <th className="p-3 text-sm font-medium text-gray-700">
                        Price
                      </th>
                      <th className="p-3 text-sm font-medium text-gray-700">
                        Quantity
                      </th>
                      <th className="p-3 text-sm font-medium text-gray-700">
                        Availability
                      </th>
                      <th className="p-3 text-sm font-medium text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMenu.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-[var(--fontgray)] hover:bg-gray-50"
                      >
                        {/* product + image */}
                        <td className="p-3 text-sm text-gray-700 flex items-center gap-2">
                          <Image
                            src={/*item.image ||*/ img}
                            alt=""
                            className="w-10 h-10 rounded-md object-cover"
                          />

                          {item.product}
                        </td>
                        <td className="p-3 text-sm text-gray-700">
                          {item.category}
                        </td>
                        <td className="p-3 text-sm text-gray-700">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="p-3 text-sm text-gray-700">
                          {item.quantity}
                        </td>

                        {/* Availability */}
                        <td className="p-3 text-sm ">
                          <p
                            className={`px-2 py-1 max-w-30 justify-center rounded-2xl flex items-center gap-1 text-sm font-medium 
                        ${
                          item.availability === "Low Stock"
                            ? "text-[#FACC15] bg-[#FEF9C3]"
                            : item.availability === "Available"
                            ? "text-[#15803D] bg-[#DCFCE7]"
                            : "text-[#B91C1C] bg-[#FEE2E2]"
                        }`}
                          >
                            <Dot size={20} />
                            {item.availability}
                          </p>
                        </td>

                        {/* Actions */}
                        <td className="p-3 text-sm text-gray-700 flex items-center gap-3">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-[#E63746] bg-[#FEE2E2] hover:bg-[#FDCACA] p-2 rounded-lg cursor-pointer transition"
                          >
                            <PenLine size={16} />
                          </button>
                          <button
                            onClick={() => handleRemove(item.id)}
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

            {/* Table */}
          </div>
        </main>
      </div>
    </>
  );
};

export default menuPage;
