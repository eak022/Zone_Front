// Navbar.js
import Header from "./Header";
import UserProfile from "./UserProfile";
import RegisterButton from "./RegisterButton";
import LoginButton from "./LoginButton"; // เปลี่ยนจาก loginButton เป็น LoginButton
import { useAuthContext } from "../contexts/StoreContext";

const Navbar = () => {
  const { currentUser, logout } = useAuthContext(); // ใช้ currentUser แทน user

  const handleLogout = () => {
    logout(); 
  };

  return (
    <nav
      className="navbar bg-[#9DBDFF] text-white shadow-lg px-4 py-2 fixed w-full top-3 left-0 z-50"
      style={{ backgroundColor: "#ffff" }}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle text-white"
            style={{ color: "#008163" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ stroke: "#008163" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-[#008163] text-[#F7F7F8] rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
          >
            <li>
              <a href="/" className="hover:bg-[#EE2526]">
                Home Page
              </a>
            </li>
            <li>
              <a href="/add" className="hover:bg-[#EE2526]">
                Add Store
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-center">
        <a href="/home" className="text-2xl font-bold">
          <Header />
        </a>
      </div>

      <div className="navbar-end flex items-center space-x-4">
        {currentUser ? ( 
          <>
            <div className="text-lg" style={{ color: "#008163" }}>
              <span>Welcome, </span>
              <span className="text-lg font-semibold text-[#008163]">{currentUser.userName}</span>
              {/* ชื่อของผู้ใช้ที่เข้าสู่ระบบ */}
              {currentUser.roles.map((role, index) => (
                <span
                  key={index}
                  className="ml-2 px-2 py-1 bg-indigo-700 text-white rounded-full text-xs"
                  style={{ backgroundColor: "#EE2526", color: "#F7F7F8" }}
                >
                  {role}
                </span>
              ))}
            </div>

            <UserProfile />
            <button
              onClick={handleLogout}
              className="get-location-btn"
              >
              Logout
            </button>
          </>
        ) : (
          <div className="space-x-2">
            <RegisterButton />
            <LoginButton />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
