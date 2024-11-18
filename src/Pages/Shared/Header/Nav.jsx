import { Link } from "react-router-dom";
import { useState } from "react";
import { FaCar } from "react-icons/fa";
import AuthContext from "../../../AuthProvider/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error.message);
      });
    setIsOpen(false);
  };

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" },
    {
      path: user ? "/" : "/login",
      label: user ? "Logout" : "Login",
      onClick: user ? handleLogout : null,
      className: "btn btn-outline btn-primary px-6",
    },
  ];

  const navItems = (
    <>
      {menuItems.map((item, index) => (
        <li key={index} onClick={handleMenuClick}>
          <Link
            to={item.path}
            className={item.className}
            onClick={item.onClick}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </>
  );
  return (
    <div className="sticky top-0 z-50 shadow-lg bg-base-100">
      <div className="navbar container mx-auto">
        <div className="navbar-start space-x-2 w-2/3">
          <FaCar className="text-primary text-2xl" />
          <Link to="/" className="text-xl font-bold text-primary uppercase">
            Car Doctor
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2 items-center">
            {navItems}
          </ul>
        </div>
        <div className="navbar-end lg:hidden w-1/3">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost relative lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className={`absolute right-0 menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-2 ${
                isOpen ? "" : "hidden"
              }`}
            >
              {navItems}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
