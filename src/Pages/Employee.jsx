import { CiCirclePlus } from "react-icons/ci";
import EmployeeList from "../Components/EmployeeList";
import { Link } from "react-router-dom";
import { useState } from "react";

const Employee = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="py-6 px-4 md:py-9 md:px-7 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-7">
        <h1 className="text-2xl md:text-4xl font-semibold">Employee</h1>

        {/* Search + Add */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name, ID"
            className="border-2 border-gray-300 px-4 py-2 rounded-lg outline-gray-300 flex-1"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link
            to="/employee/new"
            className="bg-blue-500 font-semibold py-2 px-6 sm:px-10 lg:px-14 flex items-center justify-center gap-2 text-white cursor-pointer rounded-lg w-full sm:w-auto"
          >
            <CiCirclePlus size={24} />
            <span className="hidden sm:inline">Add new employee</span>
            <span className="sm:hidden">Add</span>
          </Link>
        </div>
      </div>
      <div className="min-w-[200px] min-h-[300px] border-2 border-[#dedede] rounded-2xl overflow-x-auto">
        <EmployeeList searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Employee;
