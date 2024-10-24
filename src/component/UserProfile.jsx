import React from "react";
import { useAuthContext } from "../contexts/StoreContext";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const { currentUser, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to the login page or another page
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="dropdown dropdown-end">
        <div
          tabIndex="0"
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="User Avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabIndex="0"
          className="menu menu-sm dropdown-content bg-[#008163] shadow-lg rounded-box z-[1] mt-3 w-52 p-2"
        >
          <li>
            <a className="flex justify-between items-center p-2 hover:bg-[#EE2526]">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li>
            <a className="p-2 hover:bg-[#EE2526]">Settings</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserProfile;
