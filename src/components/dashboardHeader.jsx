"use client";
import { Search, CalendarDays, Filter } from "lucide-react";
import { useState } from "react";

const DashboardHeader = ({ title, onFilterChange, noFilter }) => {
  const today = new Date().toISOString().split("T")[0];
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(today);
  const [filterOption, setFilterOption] = useState("all");

  // Trigger parent on every change
  const handleFilterChange = (type, value) => {
    if (type === "search") setSearchTerm(value);
    if (type === "startDate") setStartDate(value);
    if (type === "endDate") setEndDate(value);
    if (type === "status") setFilterOption(value);

    onFilterChange({
      search: type === "search" ? value : searchTerm,
      startDate: type === "startDate" ? value : startDate,
      endDate: type === "endDate" ? value : endDate,
      status: type === "status" ? value : filterOption,
    });
  };

  return (
    <div className="w-full bg-white p-5">
      <h2 className="font-medium text-2xl">{title}</h2>

      <div className="flex flex-col md:flex-row md:items-center my-6 md:justify-between gap-4 w-full">
        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full min-w-40 border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {noFilter ? null : (
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative ">
              <CalendarDays
                className="absolute left-3 top-1/2  -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  handleFilterChange("startDate", e.target.value)
                }
                className="border rounded-lg pl-10 pr-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <CalendarDays
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => handleFilterChange("endDate", e.target.value)}
                className="border rounded-lg pl-10 pr-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Filter */}
        <div className="relative">
          <Filter
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <select
            value={filterOption}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="appearance-none border rounded-lg pl-10 pr-8 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {noFilter ? (
              <option value="all" disabled>
                {" "}
                Filter
              </option>
            ) : (
              <>
                <option disabled>Filter by status</option>
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </>
            )}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
