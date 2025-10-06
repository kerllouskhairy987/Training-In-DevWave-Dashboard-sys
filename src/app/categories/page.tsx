// "use client";
import { useState } from "react";
import { categories } from "@/data/data";
import DashboardHeader from "@/components/dashboardHeader";
import { PenLine, Trash, X } from "lucide-react";
import { deleteCategory, getAllCategories } from "./_actions/category";
import { TCategoryDeleteResponse, TCategoryResponse } from "./_types";
import Image from "next/image";
import { DialogModalEdit } from "./_components/DialogModalEdit";
import { Button } from "@/components/ui/button";
import { AlertDialogDelete } from "@/components/AlertDialog";
import { DialogModalAdd } from "./_components/DialogModalAdd";
import { ErrorMes } from "@/messages/ErrorMes";
import { SuccessMes } from "@/messages/SuccessMes";
const CategoriesPage = async () => {
  const allCategories: TCategoryResponse = await getAllCategories();

  const handleDeleteCategory = async (id: string) => {
    const deleteCategoryRes: TCategoryDeleteResponse =
      await deleteCategory(id, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDQ0MjNlYmM5MDA2YmZkN2QyZDc5YSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU5Nzc1MzMyfQ.3gHSdcAvIx_KavDUruobeAE0REl6S0nv8rBlF_mMYR0");
    if (deleteCategoryRes.success === false) {
      ErrorMes({ message: deleteCategoryRes.message })
      return;
    }
    SuccessMes({ message: deleteCategoryRes.message })
  }

  return (

    <main className="w-full  mx-auto p-4 space-y-6">
      <div className="lg:col-span-2 bg-white rounded-lg shadow-sm ">
        <DashboardHeader
          title="Menu Management"
          noFilter={true}
        />
        <div className="w-full flex justify-end px-10 items-center">
          <DialogModalAdd >
            <Button
              className="add bg-[#E63746] text-white px-3 py-1 rounded-md text-lg hover:bg-[#F87171] mb-3 ml-3"
            >
              + New Item
            </Button>
          </DialogModalAdd>
        </div>

        <div className=" my-scroll-container pb-5">
          <table className="w-full border-collapse ">
            <thead>
              <tr className="text-left border-b border-[var(--fontgray)] bg-gray-50">
                <th className="p-3 text-sm font-medium text-gray-700">
                  Category Id
                </th>
                <th className="p-3 text-sm font-medium text-gray-700">
                  Title
                </th>
                <th className="p-3 text-sm font-medium text-end text-gray-700">
                  actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allCategories.categories.map((category) => (
                <tr
                  key={category._id}
                  className="not-last:border-b border-[var(--fontgray)] hover:bg-gray-50"
                >
                  <td className="p-3 text-sm text-gray-700">
                    {category._id}
                  </td>
                  <td className="p-3 text-sm text-gray-700 flex items-center gap-1">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover object-center w-10 h-10"
                    />
                    <span className="ms-2">{category.name}</span>
                  </td>
                  <td className="p-3 text-sm gap-1">
                    <div className="flex items-center justify-end gap-1">
                      <DialogModalEdit id={category._id}>
                        <Button
                          className="text-success bg-accent-foreground/40 px-3 py-3 rounded-sm text-sm hover:bg-accent flex items-center gap-1"
                          variant={"outline"}
                          size={"icon"}
                        >
                          <PenLine size={16} />
                        </Button>
                      </DialogModalEdit>

                      <AlertDialogDelete id={category._id}>
                        <Button
                          className="text-[#B91C1C] bg-[#FEE2E2] px-3 py-3 rounded-sm text-sm hover:bg-[#FECACA] flex items-center gap-1"
                          variant={"destructive"}
                          size={"icon"}
                        >
                          <Trash size={16} />
                        </Button>
                      </AlertDialogDelete>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between py-4 px-3">
          <p className="text-[#8c8c8c] font-semibold">all categories:</p>
          <p className="text-[#8c8c8c] font-semibold">{allCategories.categories.length} category/ies</p>
        </div>
      </div>
    </main>
  );
};
export default CategoriesPage;
