import { IoEyeOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees, deleteEmployee } from "../redux/employeeSlice";
import { Link } from "react-router-dom";

const EmployeeList = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employees);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      dispatch(deleteEmployee(deleteId));
    }
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const handleCloseDialog = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.emp_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-gray-500 text-lg">
          <thead className="border-b-2 border-[#dedede]">
            <tr>
              <td className="py-3 px-3 text-center">Employee Name</td>
              <td className="py-3 px-4">Employee ID</td>
              <td className="py-3 px-4">Department</td>
              <td className="py-3 px-4">Designation</td>
              <td className="py-3 px-4">Project</td>
              <td className="py-3 px-4">Type</td>
              <td className="py-3 px-4">Status</td>
              <td className="py-3 px-9">Action</td>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-16 text-2xl font-semibold text-gray-700"
                >
                  No records found
                </td>
              </tr>
            )}

            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td className="py-2 px-4">
                  <div className="flex gap-2 items-center">
                    <img
                      src={employee.profileImg || "/image.jpg"}
                      alt=""
                      className="object-cover rounded-full w-[50px] h-[50px]"
                    />
                    <span>{employee.name}</span>
                  </div>
                </td>
                <td className="py-2 px-4">{employee.emp_id}</td>
                <td className="py-2 px-4">
                  {employee.department.charAt(0).toUpperCase() +
                    employee.department.slice(1)}
                </td>
                <td className="py-2 px-4">{employee.designation}</td>
                <td className="py-2 px-4">{employee.project}</td>
                <td className="py-2 px-4">
                  {employee.type.charAt(0).toUpperCase() +
                    employee.type.slice(1).toLowerCase()}
                </td>
                <td className="py-2 px-4">
                  {employee.status.charAt(0).toUpperCase() +
                    employee.status.slice(1).toLowerCase()}
                </td>
                <td className="py-2">
                  <div className="flex gap-4 justify-center cursor-pointer">
                    <Link to={`/employee/${employee.id}`}>
                      <IoEyeOutline size={26} />
                    </Link>
                    <Link to={`/employee/edit/${employee.id}`}>
                      <GoPencil size={21} />
                    </Link>
                    <button onClick={() => handleDeleteClick(employee.id)}>
                      <AiOutlineDelete size={21} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 gap-4 md:hidden p-4">
        {filteredEmployees.length === 0 && (
          <div className="text-center py-10 text-xl font-semibold text-gray-700">
            No records found
          </div>
        )}
        {filteredEmployees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white shadow rounded-lg p-4 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={employee.profileImg || "/image.jpg"}
                alt=""
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-lg">{employee.name}</p>
                <p className="text-sm text-gray-500">{employee.emp_id}</p>
              </div>
            </div>
            <p>
              <span className="font-medium">Department: </span>
              {employee.department}
            </p>
            <p>
              <span className="font-medium">Designation: </span>
              {employee.designation}
            </p>
            <p>
              <span className="font-medium">Project: </span>
              {employee.project}
            </p>
            <p>
              <span className="font-medium">Type: </span>
              {employee.type}
            </p>
            <p>
              <span className="font-medium">Status: </span>
              {employee.status}
            </p>
            <div className="flex justify-end gap-4">
              <Link to={`/employee/${employee.id}`}>
                <IoEyeOutline size={22} />
              </Link>
              <Link to={`/employee/edit/${employee.id}`}>
                <GoPencil size={20} />
              </Link>
              <button onClick={() => handleDeleteClick(employee.id)}>
                <AiOutlineDelete size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[320px] text-center">
            <div className="flex justify-center mb-4">
              <AiOutlineDelete className="text-blue-500" size={48} />
            </div>
            <p className="text-lg font-medium mb-4">
              Are you sure you want to Delete?
            </p>
            <div className="flex justify-between gap-3">
              <button
                onClick={handleCloseDialog}
                className="bg-red-500 text-white px-4 py-2 rounded-md w-full hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeList;
