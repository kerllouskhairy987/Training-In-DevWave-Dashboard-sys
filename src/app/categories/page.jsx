"use client";
import { useState } from "react";
import { categories } from "@/data/data";
import DashboardHeader from "@/components/dashboardHeader";
import { PenLine, X } from "lucide-react";
const CategoriesPage = () => {
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [showAdd, setShowAdd] = useState(false);
  const [newCategory, setNewCategory] = useState({
    id: null,
    category: "",
    numberOfItems: null,
  });
  // add or edit category
  const handleAdd = () => {
    alert(newCategory.category + " " + newCategory.numberOfItems);
  };
  const handleEdit = (id) => {
    alert("Refill action triggered!");
  };
  // Trigger parent on every change
  const handleFilterChange = ({ search }) => {
    let result = [...categories];
    if (search) {
      result = result.filter(
        (o) =>
          o.category.toLowerCase().includes(search.toLowerCase()) ||
          o.numberOfItems == search
      );
      setFilteredCategories(result);
    } else {
      setFilteredCategories(categories);
    }
  };
  return (
    <>
      {showAdd && (
        <div className="fixed top-0 left-0 w-full bg-[#00000080] backdrop-blur-sm text-white p-3 text-center z-50 h-dvh flex justify-center items-center">
          {/*add or edit catigory */}
          <div className="bg-white flex flex-col justify-between text-black p-6 rounded-md w-11/12 md:w-2/3 min-h-80 relative space-y-4">
            <button
              onClick={() => setShowAdd(false)}
              className="absolute top-3 right-3 size-8 z-60 text-black hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold text-start">{`Add / Edit Category`}</h2>
            <div className="flex flex-col md:flex-row  gap-6">
              <div className="group flex-1 flex text-start flex-col gap-2 font-bold text-sm">
                <label htmlFor="name ">Item’s Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Category Name"
                  className=" border-2 border-[var(--fontgray)] px-4 py-2 rounded-lg focus:border-blue-500 focus:border-3 outline-0 transition"
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, category: e.target.value })
                  }
                />
              </div>
              <div className="group flex-1 flex text-start flex-col gap-2 font-bold text-sm">
                <label htmlFor="number">Item’s number</label>
                <input
                  id="number"
                  type="text"
                  placeholder="Number of Items"
                  className="border-2 border-[var(--fontgray)] px-4 py-2 rounded-lg focus:border-blue-500 focus:border-3 outline-0  transition"
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      numberOfItems: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowAdd(false);
                  handleAdd();
                }}
                className="
                  bg-[#E63746] text-white px-3 py-1 rounded-md text-lg hover:bg-[#F87171] mb-3 ml-3 flex items-center gap-1"
              >
                confirm
              </button>
              <button onClick={() => setShowAdd(false)} className="
                  text-[var(--fontgray)] border-2  px-3 py-1 rounded-md text-lg  mb-3 ml-3 flex items-center gap-1">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <main className="w-full  mx-auto p-4 space-y-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm ">
          <DashboardHeader
            title="Menu Management"
            onFilterChange={handleFilterChange}
            noFilter={true}
          />
          <div className="w-full flex justify-end px-10 items-center">
            <button
              onClick={() => setShowAdd(true)}
              className="add bg-[#E63746] text-white px-3 py-1 rounded-md text-lg hover:bg-[#F87171] mb-3 ml-3"
            >
              + New Item
            </button>
          </div>
          <div className=" my-scroll-container pb-5">
            <table className="w-full border-collapse ">
              <thead>
                <tr className="text-left border-b border-[var(--fontgray)] bg-gray-50">
                  <th className="p-3 text-sm font-medium text-gray-700">
                    Category
                  </th>
                  <th className="p-3 text-sm font-medium text-gray-700">
                    Number of Items
                  </th>
                  <th className="p-3 text-sm font-medium text-gray-700">
                    actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr
                    key={category.id}
                    className="not-last:border-b border-[var(--fontgray)] hover:bg-gray-50"
                  >
                    <td className="p-3 text-sm text-gray-700">
                      {category.category}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {category.numberOfItems}
                    </td>
                    <td className="p-3 text-sm">
                      <button
                        onClick={() => handleEdit(category.id)}
                        className="text-[#B91C1C] bg-[#FEE2E2] px-3 py-3 rounded-sm text-sm hover:bg-[#FECACA] flex items-center gap-1"
                      >
                        <PenLine size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};
export default CategoriesPage;
