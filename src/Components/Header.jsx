import { IoSettingsOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";
import { IoGrid } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Header = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between bg-[#fafafa] border-b-2 border-[#dedede]">
      <div className="flex items-center px-6 py-4 md:px-[79.5px] md:py-6 border-r-2 border-[#dedede]">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-blue-500 whitespace-nowrap">
          RS-TECH
        </h1>
      </div>

      <div className="flex items-center gap-3 md:gap-5 px-4 md:px-8">
        {/* Hamburger menu (mobile only) */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg border border-gray-300"
        >
          <IoGrid size={22} />
        </button>

        <div className="hidden md:flex w-10 h-10 md:w-11 md:h-11 bg-[#e3e3e3] rounded-full justify-center items-center cursor-pointer">
          <IoSettingsOutline size={20} />
        </div>

        {/* Notifications */}
        <div className="hidden md:flex w-10 h-10 md:w-11 md:h-11 bg-[#e3e3e3] rounded-full justify-center items-center cursor-pointer">
          <FaRegBell size={20} />
        </div>

        <div className="relative" ref={dropdownRef}>
          <div
            className="cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="profile"
                className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover"
              />
            ) : (
              <img
                src="/image.jpg"
                alt="default"
                className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover"
              />
            )}
          </div>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
