import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import Label from "./Label";

const EmployeeForm = ({
  employee,
  setEmployee,
  preview,
  setPreview,
  handleSubmit,
  submitText,
  cancelPath = "/employee",
}) => {
  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEmployee({ ...employee, profileImg: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex-col">
        <div className="relative w-[100px] h-[100px] md:w-[130px] md:h-[130px] mb-5">
          <img
            src={preview || "/profile.webp"}
            alt="profile"
            className="w-full h-full rounded-lg object-cover"
          />
          <input
            type="file"
            id="profileUpload"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="profileUpload"
            className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-600"
          >
            <FaPen size={14} />
          </label>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
          <div className="flex-col w-full md:w-1/2">
            <Label name="Name*" />
            <input
              name="name"
              type="text"
              value={employee.name}
              className="border border-gray-200 w-full py-3 px-4 rounded-xl outline-gray-200"
              onChange={handleChange}
            />
          </div>
          <div className="flex-col w-full md:w-1/2">
            <Label name="Employee ID*" />
            <input
              name="emp_id"
              type="text"
              value={employee.emp_id}
              className="border border-gray-200 w-full py-3 px-4 rounded-xl outline-gray-200"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
          <div className="flex-col w-full md:w-1/2">
            <Label name="Department*" />
            <select
              name="department"
              value={employee.department}
              className="w-full rounded-xl border border-gray-300 bg-white py-3 px-4 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              onChange={handleChange}
            >
              <option value="" disabled hidden>
                Select department
              </option>
              <option value="design">Design</option>
              <option value="development">Development</option>
              <option value="marketing">Marketing</option>
              <option value="hr">HR</option>
            </select>
          </div>
          <div className="flex-col w-full md:w-1/2">
            <Label name="Designation*" />
            <select
              name="designation"
              value={employee.designation}
              className="w-full rounded-xl border border-gray-300 bg-white py-3 px-4 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              onChange={handleChange}
            >
              <option value="" disabled hidden>
                Select designation
              </option>
              <option value="Design Lead">Design Lead</option>
              <option value="Team Lead">Team Lead</option>
              <option value="Project Head">Project Head</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
          <div className="flex-col w-full md:w-1/2">
            <Label name="Project" />
            <input
              name="project"
              type="text"
              value={employee.project}
              className="border border-gray-200 w-full py-3 px-4 rounded-xl outline-gray-200"
              onChange={handleChange}
            />
          </div>
          <div className="flex-col w-full md:w-1/2">
            <Label name="Type*" />
            <select
              name="type"
              value={employee.type}
              className="w-full rounded-xl border border-gray-300 bg-white py-3 px-4 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              onChange={handleChange}
            >
              <option value="" disabled hidden>
                Select type
              </option>
              <option value="Office">Office</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full mb-6">
          <div className="flex-col w-full md:w-1/2">
            <Label name="Status*" />
            <select
              name="status"
              value={employee.status}
              className="w-full rounded-xl border border-gray-300 bg-white py-3 px-4 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              onChange={handleChange}
            >
              <option value="" disabled hidden>
                Select status
              </option>
              <option value="Permanent">Permanent</option>
              <option value="Temporary">Temporary</option>
            </select>
          </div>
          <div className="flex-col w-full md:w-1/2">
            <input type="hidden" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 text-white justify-end px-2">
          <Link
            to={cancelPath}
            className="bg-gray-400 hover:bg-gray-500 px-4 py-3 rounded-lg text-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-lg"
          >
            {submitText}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EmployeeForm;
