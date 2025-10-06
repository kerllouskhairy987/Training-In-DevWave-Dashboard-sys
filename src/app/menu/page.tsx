// "use client"
import { menuData } from "../../data/data";
import { useState } from "react";
import { PenLine, Trash2, Dot } from "lucide-react";
import DashboardHeader from "@/components/dashboardHeader";
import img from "@/../public/image.png";
import Image from "next/image";
import { getAllCategories, getAllProducts } from "./_actions/products";
import { ProductsResponse } from "./types";
import { Button } from "@/components/ui/button";
import DialogModalAddProduct from "./_components/DialogModalAddProduct";
import { TCategoryResponse } from "../categories/_types";
import { DeleteProduct } from "./_components/DeleteProduct";
const menuPage = async () => {
  // const [filteredMenu, setFilteredMenu] = useState(menuData);
  // const [showAdd, setShowAdd] = useState(false);
  // const [editingId, setEditingId] = useState(null); // track editing item
  // const [newMenu, setNewMenu] = useState({
  //   id: null,
  //   image: "",
  //   product: "",
  //   category: "",
  //   price: 0,
  //   description: "",
  //   quantity: 0,
  //   availability: "Available",
  // });

  // // 🔎 search filter
  // const handleFilterChange = ({ search }) => {
  //   let result = [...menuData];
  //   if (search) {
  //     result = result.filter(
  //       (o) =>
  //         o.product.toLowerCase().includes(search.toLowerCase()) ||
  //         o.category.toLowerCase().includes(search.toLowerCase()) ||
  //         o.price == search ||
  //         o.quantity == search
  //     );
  //     setFilteredMenu(result);
  //   } else {
  //     setFilteredMenu(menuData);
  //   }
  // };

  // // ➕ Add or Update item
  // const handleConfirm = () => {
  //   if (!newMenu.product || !newMenu.category) {
  //     alert("Please fill all required fields");
  //     return;
  //   }

  //   if (editingId) {
  //     // update existing
  //     const updatedMenu = filteredMenu.map((item) =>
  //       item.id === editingId ? { ...newMenu, id: editingId } : item
  //     );
  //     setFilteredMenu(updatedMenu);
  //   } else {
  //     // add new
  //     const newItem = { ...newMenu, id: Date.now() };
  //     setFilteredMenu([...filteredMenu, newItem]);
  //   }

  //   // reset
  //   setNewMenu({
  //     id: null,
  //     image: "",
  //     product: "",
  //     category: "",
  //     price: 0,
  //     description: "",
  //     quantity: 0,
  //     availability: "Available",
  //   });
  //   setEditingId(null);
  //   setShowAdd(false);
  // };
  // // ❌ Remove item
  // const handleRemove = (id) => {
  //   const updatedMenu = filteredMenu.filter((item) => item.id !== id);
  //   setFilteredMenu(updatedMenu);
  // };

  // // 🖊 Edit item
  // const handleEdit = (item) => {
  //   setNewMenu(item);
  //   setEditingId(item.id);
  //   setShowAdd(true);
  // };

  // // ❌ clear all items
  // const handleClearMenu = () => {
  //   setFilteredMenu([]);
  // };

  const allProducts: ProductsResponse = await getAllProducts();
  const allCategories: TCategoryResponse = await getAllCategories();

  return (
    <>
      {/* Main Page */}
      <div>
        <main className="w-full mx-auto p-4 space-y-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
            <DashboardHeader
              title="Menu Management"
              noFilter={true}
            />

            {/* Buttons */}
            <div className="w-full flex justify-end px-10 items-center">
              <DialogModalAddProduct categories={allCategories.categories}>
                <Button
                  className="add bg-[#E63746] text-white px-3 py-1 rounded-md text-lg hover:bg-[#F87171] mb-3 ml-3"
                >
                  + New Item
                </Button>
              </DialogModalAddProduct>
              <Button
                // onClick={handleClearMenu}
                className="delete bg-[#447A9C] text-white px-3 py-1 rounded-md text-lg hover:bg-[#6CAEDB] mb-3 ml-3"
              >
                <Trash2 size={16} className="inline-block mr-2" />
                Delete All
              </Button>
            </div>

            {/* if menu is empty */}
            {allProducts.data.length === 0 ? (
              <div className="w-full flex flex-col justify-center items-center py-20 gap-4">
                <Image
                  src={img}
                  alt="no products found"
                  width={400}
                  height={400}
                  className="w-20 h-20 rounded-md object-cover"
                />
                <p className="text-lg text-gray-600">No menu items found</p>
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
                      <th className="p-3 text-end text-sm font-medium text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProducts.data.map((item) => (
                      <tr
                        key={item._id}
                        className="border-b border-[var(--fontgray)] hover:bg-gray-50"
                      >
                        {/* product + image */}
                        <td className="p-3 text-sm text-gray-700 flex items-center gap-2">
                          <Image
                            src={item.image || img}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="w-10 h-10 rounded-md object-cover"
                          />

                          {item.name}
                        </td>
                        <td className="p-3 text-sm text-gray-700">
                          {item.category}
                        </td>
                        <td className="p-3 text-sm text-gray-700">
                          ${item.price.toFixed(2)}
                        </td>
                        {/* Actions */}
                        <td className="p-3 text-sm text-gray-700 flex items-center justify-end gap-3">
                          <DeleteProduct id={item._id}>
                            <Button
                              className="text-[#E63746] bg-[#FEE2E2] hover:bg-[#FDCACA] p-2 rounded-lg cursor-pointer transition"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </DeleteProduct>
                          <Button
                            className="text-[#447A9C] bg-[#E1F0F6] hover:bg-[#B3D8E9] p-2 rounded-lg cursor-pointer transition"
                          >
                            <PenLine size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Table */}
            <div className="flex justify-between py-4 px-3">
              <p className="text-[#8c8c8c] font-semibold">all categories:</p>
              <p className="text-[#8c8c8c] font-semibold">{allProducts.data.length} category/ies</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default menuPage;
