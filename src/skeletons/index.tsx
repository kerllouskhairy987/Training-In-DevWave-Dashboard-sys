"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, Filter, Search } from "lucide-react";

export default function CategoriesSkeleton() {
    return (
        <main className="w-full mx-auto p-4 space-y-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
                <div className="w-full bg-white p-5">
                    <h2 className="font-medium text-2xl">
                        <Skeleton className="h-6 w-40" />
                    </h2>

                    {/* Search + Filter Section */}
                    <div className="flex flex-col md:flex-row md:items-center my-6 md:justify-between gap-4 w-full">
                        {/* Search */}
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                            <Skeleton className="w-full h-10 rounded-lg" />
                        </div>

                        {/* Date Filters */}
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="relative">
                                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                                <Skeleton className="w-40 h-10 rounded-lg" />
                            </div>
                            <div className="relative">
                                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                                <Skeleton className="w-40 h-10 rounded-lg" />
                            </div>
                        </div>

                        {/* Filter Dropdown */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                            <Skeleton className="w-36 h-10 rounded-lg" />
                        </div>
                    </div>
                </div>

                {/* Add Button */}
                <div className="w-full flex justify-end px-10 items-center">
                    <Skeleton className="w-32 h-10 rounded-md mb-3 ml-3" />
                </div>

                {/* Table Skeleton */}
                <div className="my-scroll-container pb-5">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left border-b border-gray-200 bg-gray-50">
                                <th className="p-3 text-sm font-medium text-gray-700">
                                    <Skeleton className="h-4 w-24" />
                                </th>
                                <th className="p-3 text-sm font-medium text-gray-700">
                                    <Skeleton className="h-4 w-24" />
                                </th>
                                <th className="p-3 text-sm font-medium text-end text-gray-700">
                                    <Skeleton className="h-4 w-24 ml-auto" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 6 }).map((_, i) => (
                                <tr
                                    key={i}
                                    className="not-last:border-b border-gray-200 hover:bg-gray-50"
                                >
                                    <td className="p-3">
                                        <Skeleton className="h-4 w-40" />
                                    </td>
                                    <td className="p-3 flex items-center gap-2">
                                        <Skeleton className="w-10 h-10 rounded-full" />
                                        <Skeleton className="h-4 w-32" />
                                    </td>
                                    <td className="p-3 flex justify-end gap-2">
                                        <Skeleton className="w-8 h-8 rounded-sm" />
                                        <Skeleton className="w-8 h-8 rounded-sm" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="flex justify-between py-4 px-3">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
        </main>
    );
}
