import { Outlet, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import MenuBar from "./Components/MenuBar";
import { useState } from "react";

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="bg-white min-h-screen flex flex-col">
      {!isLoginPage && (
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      )}
      <div className="flex flex-1">
        {!isLoginPage && (
          <MenuBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}
        <div className="flex-1 p-4 md:p-8">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default App;
