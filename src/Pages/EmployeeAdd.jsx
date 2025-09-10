import { Link, useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { IoIosContact } from "react-icons/io";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../redux/employeeSlice";
import EmployeeForm from "../Components/EmployeeForm";
import { toast } from "react-toastify";

const EmployeeAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.employees);

  const [employee, setEmployee] = useState({
    name: "",
    emp_id: "",
    department: "",
    designation: "",
    project: "",
    type: "",
    status: "",
    profileImg: "",
  });
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("emp_id", employee.emp_id);
    formData.append("department", employee.department);
    formData.append("designation", employee.designation);
    formData.append("project", employee.project);
    formData.append("type", employee.type.toUpperCase());
    formData.append("status", employee.status.toUpperCase());
    if (employee.profileImg) {
      formData.append("profileImg", employee.profileImg);
    }

    try {
      await dispatch(addEmployee(formData)).unwrap();
      toast.success("Employee added successfully!");
      navigate("/employee");
    } catch (err) {
      toast.error(err || "Failed to add employee");
      console.error("Failed to add employee:", err);
    }
  };

  return (
    <div className="py-6 px-4 md:py-7 md:px-7 w-full">
      {/* Header */}
      <div className="flex gap-3 items-center mb-6">
        <Link to="/employee">
          <IoChevronBackSharp size={32} className="md:size-10" />
        </Link>
        <h1 className="text-2xl md:text-4xl font-semibold">
          Add new Employee
        </h1>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <IoIosContact size={22} className="md:size-10" color="#0085ff" />
        <h4 className="text-lg md:text-xl text-blue-500 font-semibold">
          Personal Information
        </h4>
      </div>
      <div className="relative flex items-center mb-4">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-200 -translate-y-1/2" />
        <div className="relative h-[3px] bg-blue-500 w-40 md:w-60" />
      </div>
      <EmployeeForm
        employee={employee}
        setEmployee={setEmployee}
        preview={preview}
        setPreview={setPreview}
        handleSubmit={handleSubmit}
        submitText={status === "loading" ? "Loading..." : "Confirm"}
        cancelPath="/employee"
      />
    </div>
  );
};

export default EmployeeAdd;
