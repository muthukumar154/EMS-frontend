import { IoGrid } from "react-icons/io5";
import { IoMdContacts } from "react-icons/io";
import { FaCalendar } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const MenuBar = ({ open, onClose }) => {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1];

  const menuItems = [
    { name: "dashboard", label: "Dashboard", icon: IoGrid, to: "/dashboard" },
    { name: "employee", label: "Employee", icon: IoMdContacts, to: "/employee" },
    { name: "calendar", label: "Calendar", icon: FaCalendar, to: "/calendar" },
    { name: "message", label: "Messages", icon: MdMessage, to: "/message" },
  ];

  return (
    <>
      <aside className="hidden md:block bg-[#fafafa] min-h-screen w-[280px] border-r-2 border-[#dedede] py-10">
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const isActive = currentPath === item.name;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.to}
                className={`w-[220px] py-2.5 px-8 flex items-center gap-3 rounded-r-full mb-2 cursor-pointer transition ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "bg-transparent text-gray-500 hover:bg-gray-100"
                }`}
              >
                <Icon size={22} color={isActive ? "white" : "gray"} />
                <h4 className="text-lg">{item.label}</h4>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={onClose}
      ></div>

      <aside
        className={`fixed top-0 left-0 z-50 bg-[#fafafa] w-[260px] h-full border-r-2 border-[#dedede] py-8 px-6 transform transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-2 mt-6">
          {menuItems.map((item) => {
            const isActive = currentPath === item.name;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.to}
                onClick={onClose}
                className={`w-full py-2.5 px-6 flex items-center gap-3 rounded-md mb-2 cursor-pointer transition ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "bg-transparent text-gray-500 hover:bg-gray-100"
                }`}
              >
                <Icon size={22} color={isActive ? "white" : "gray"} />
                <h4 className="text-lg">{item.label}</h4>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default MenuBar;
