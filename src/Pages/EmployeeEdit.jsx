import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosContact } from "react-icons/io";
import { IoChevronBackSharp } from "react-icons/io5";
import EmployeeForm from "../Components/EmployeeForm";
import { useEffect, useState } from "react";
import { getEmployee, updateEmployee } from "../redux/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const EmployeeEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedEmployee, status } = useSelector((state) => state.employees);
    const [employee, setEmployee] = useState({ name: "", emp_id: "", department: "", designation: "", project: "", type: "", status: "", profileImg: "" });
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        dispatch(getEmployee(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (selectedEmployee) {
            setEmployee(selectedEmployee);
            setPreview(selectedEmployee.profileImg || null);
        }
    }, [selectedEmployee]);

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", employee.name);
        formData.append("emp_id", employee.emp_id);
        formData.append("department", employee.department);
        formData.append("designation", employee.designation);
        formData.append("project", employee.project);
        formData.append("type", employee.type.toUpperCase());
        formData.append("status", employee.status.toUpperCase());
        if (employee.profileImg instanceof File) {
            formData.append("profileImg", employee.profileImg);
        }
        try {
            await dispatch(updateEmployee({ id, formData })).unwrap();
            toast.success("Employee updated successfully!");
            navigate("/employee");
        } catch (err) {
            toast.error(err || "Failed to update employee");
            console.error("Failed to update employee:", err);
        }
    };

    return (
        <div className="py-6 px-4 sm:px-7 w-full min-h-screen">
            <div className="flex gap-3 items-center mb-6">
                <Link to="/employee">
                    <IoChevronBackSharp size={30} className="sm:hidden" />
                    <IoChevronBackSharp size={40} className="hidden sm:block" />
                </Link>
                <h1 className="text-2xl sm:text-4xl font-semibold">Edit Employee Details</h1>
            </div>
            <div className="flex items-center gap-2 mb-2">
                <IoIosContact size={20} className="sm:hidden" color="#0085ff" />
                <IoIosContact size={25} className="hidden sm:block" color="#0085ff" />
                <h4 className="text-lg sm:text-xl text-blue-500 font-semibold">Personal Information</h4>
            </div>
            <div className="relative flex items-center mb-4">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-200 -translate-y-1/2" />
                <div className="relative h-[3px] bg-blue-500 w-40 sm:w-60" />
            </div>
            <EmployeeForm
                employee={employee}
                setEmployee={setEmployee}
                preview={preview}
                setPreview={setPreview}
                handleSubmit={handleEditSubmit}
                submitText={status === "loading" ? "Updating..." : "Update"}
                cancelPath="/employee"
            />
        </div>
    );
};

export default EmployeeEdit;
