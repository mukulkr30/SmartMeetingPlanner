import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ token, setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();   
    setToken(null);          
    // navigate("/login", { replace: true }); 
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow h-[10%] min-h-[60px]">

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-white font-bold">
          <img className="w-10 h-10" src="/l2.png" alt="" />
        </div>
        <div>
          <h1 className="text-lg font-bold">SmartMeetPlanner</h1>
          <p className="text-xs text-gray-500">
            AI-Powered Meeting Analysis
          </p>
        </div>
      </div>

      <div>
        {token ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center">
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/Login"
            className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;