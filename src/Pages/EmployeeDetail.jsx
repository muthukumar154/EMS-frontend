import { Link, useParams } from "react-router-dom";
import { IoIosContact } from "react-icons/io";
import { IoChevronBackSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getEmployee } from "../redux/employeeSlice";

const EmployeeDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedEmployee } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(getEmployee(id));
  }, [id, dispatch]);

  if (!selectedEmployee) {
    return (
      <div className="py-9 px-4 sm:px-7 w-full min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading employee details...</p>
      </div>
    );
  }

  return (
    <div className="py-9 px-4 sm:px-7 w-full min-h-screen">
      {/* Header */}
      <div className="flex gap-3 items-center mb-7">
        <Link to="/employee">
          <IoChevronBackSharp size={30} className="sm:hidden" />
          <IoChevronBackSharp size={40} className="hidden sm:block" />
        </Link>
        <h1 className="text-2xl sm:text-4xl font-semibold">View Employee Details</h1>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <IoIosContact size={20} className="sm:hidden" color="#0085ff" />
        <IoIosContact size={25} className="hidden sm:block" color="#0085ff" />
        <h4 className="text-lg sm:text-xl text-blue-500 font-semibold">
          Personal Information
        </h4>
      </div>
      <div className="relative flex items-center mb-4">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-200 -translate-y-1/2" />
        <div className="relative h-[3px] bg-blue-500 w-40 sm:w-60" />
      </div>
      <div className="w-[100px] sm:w-[130px] rounded-lg mb-5">
        <img
          src={selectedEmployee.profileImg || "/image.jpg"}
          alt="Profile"
          className="h-[100px] sm:h-[130px] w-[100px] sm:w-[130px] object-cover rounded-lg"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <h5 className="text-sm text-gray-500 mb-1">Name</h5>
          <p className="text-lg">{selectedEmployee.name}</p>
        </div>
        <div>
          <h5 className="text-sm text-gray-500 mb-1">Employee ID</h5>
          <p className="text-lg">{selectedEmployee.emp_id}</p>
        </div>
      </div>
      <div className="w-full border-b-2 border-gray-300 mb-4"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <h5 className="text-sm text-gray-500 mb-1">Department</h5>
          <p className="text-lg">{selectedEmployee.department}</p>
        </div>
        <div>
          <h5 className="text-sm text-gray-500 mb-1">Designation</h5>
          <p className="text-lg">{selectedEmployee.designation}</p>
        </div>
      </div>
      <div className="w-full border-b-2 border-gray-300 mb-4"></div> 
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <h5 className="text-sm text-gray-500 mb-1">Project</h5>
          <p className="text-lg">{selectedEmployee.project}</p>
        </div>
        <div>
          <h5 className="text-sm text-gray-500 mb-1">Type</h5>
          <p className="text-lg">{selectedEmployee.type.toLowerCase()}</p>
        </div>
      </div>
      <div className="w-full border-b-2 border-gray-300 mb-4"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <h5 className="text-sm text-gray-500 mb-1">Status</h5>
          <p className="text-lg">{selectedEmployee.status.toLowerCase()}</p>
        </div>
      </div>
      <div className="w-full border-b-2 border-gray-300 mb-4"></div>
    </div>
  );
};

export default EmployeeDetail;
