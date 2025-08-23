import React, { useState } from "react";
import { Search, ShoppingCart, User, ChevronDown, Menu } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Drawer } from "antd";
import logo from "../assets/logo.png";
import { FaTwitter, FaYoutube } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";
import { RiInstagramFill } from "react-icons/ri";

export const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/", isHighlighted: true },
    {
      label: "Service",
      path: "/allProduct",
      children: [
        {
          label: "Custom Apparel",
          path: "/allProduct",
          children: [
            { label: "T-Shirts", path: "/allProduct" },
            { label: "Hoodies", path: "/allProduct" },
          ],
        },
        { label: "Accessories & Gifts", path: "/allProduct" },
        { label: "Prints & Labels", path: "/allProduct" },
      ],
    },
    { label: "Individual Product", path: "/individual_product" },
    { label: "Order", path: "/allProduct", badge: 2 },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contactUs" },
    { label: "Blog", path: "/blog" },
  ];

  // Recursive Drawer Item
  const DrawerItem = ({ item, level = 0 }) => {
    const [open, setOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div>
        <div
          className={`flex justify-between items-center px-4 py-2 hover:bg-gray-700 cursor-pointer`}
          style={{ paddingLeft: `${16 + level * 16}px` }}
          onClick={() => hasChildren && setOpen(!open)}
        >
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `flex-1 ${
                isActive ? "font-medium text-yellow-400" : "text-white "
              }`
            }
          >
            {item.label}
          </NavLink>
          {hasChildren && (
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          )}
        </div>
        {hasChildren && open && (
          <div>
            {item.children.map((child, idx) => (
              <DrawerItem key={idx} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  // Desktop recursive dropdown
  const renderDropdown = (items) => (
    <div className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-md border py-2 z-50">
      {items.map((child, idx) => (
        <div key={idx} className="relative group">
          <NavLink
            to={child.path}
            className={({ isActive }) =>
              `block px-4 py-2 ${
                isActive
                  ? "bg-yellow-400 text-black font-medium"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            {child.label}
            {child.children && <ChevronDown className="inline w-4 h-4 ml-1" />}
          </NavLink>
          {child.children && (
            <div className="absolute top-0 left-full hidden group-hover:block w-56 bg-white shadow-lg rounded-md border py-2 z-50">
              {renderDropdown(child.children)}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const isPathActive = (item) => {
    if (location.pathname === item.path) return true;
    if (item.children) {
      return item.children.some(
        (child) =>
          location.pathname.startsWith(child.path) || isPathActive(child)
      );
    }
    return false;
  };

  return (
    <header className="w-full ">
      {/* Top Banner */}
      <div className="bg-primary  border-b border-gray-400 text-white py-3 hidden md:block">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <span>Welcome to Shop Name online eCommerce store.</span>
          <div className="flex items-center gap-2">
            <span>Follow us:</span>
            <FaTwitter />
            <SiFacebook />
            <FaYoutube />
            <RiInstagramFill />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b">
        <div className="bg-primary px-4 lg:px-0">
          <div className="container mx-auto py-4 flex items-center justify-between gap-4">
            {/* Logo & Hamburger */}
            <div className="flex items-center gap-3">
              <button
                className="md:hidden text-white"
                onClick={() => setDrawerOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <NavLink to="/" className="text-2xl font-bold">
                <img className="w-[130px] md:w-[160px]" src={logo} alt="" />
              </NavLink>
            </div>

            {/* Search (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for anything..."
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent rounded-md"
                />
                <button className="absolute right-2 top-2">
                  <Search className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Auth + Cart */}
            <div className="flex items-center gap-3">
              <NavLink
                to="/auth/signUp"
                className="hidden md:block border text-white px-4 py-2 rounded-md"
              >
                Sign Up
              </NavLink>
              <NavLink
                to="/auth/login"
                className="hidden md:block bg-gradient-to-r from-indigo-200 via-blue-400 to-blue-700 text-white px-4 py-2 rounded-md"
              >
                Log In
              </NavLink>
            </div>
            <div className="block lg:hidden">
                <div className="flex gap-3">
                  <Link to={'/cart'}><div className="relative cursor-pointer">
                    <ShoppingCart className="w-6 h-6 text-white" />
                    <span className="absolute -top-2 -right-2 bg-white text-black text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                      5
                    </span>
                  </div></Link>
                  <Link to={'/profilePage'}><User className="w-6 h-6 text-white cursor-pointer" /></Link>
                </div>
              </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:block">
          <div className="container mx-auto ">
            <nav className="flex items-center justify-between py-3 relative">
              <div className="flex items-center space-x-8">
                {navItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-1 px-2 py-1 rounded ${
                          isActive || isPathActive(item)
                            ? "bg-yellow-400 text-black font-medium"
                            : "text-gray-600 hover:text-gray-900"
                        }`
                      }
                    >
                      {item.label}
                      {item.children && <ChevronDown className="w-4 h-4" />}
                      {item.badge && (
                        <span className="ml-1  bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                    {item.children &&
                      openDropdown === item.label &&
                      renderDropdown(item.children)}
                  </div>
                ))}
              </div>
              <div className="hidden lg:block">
                <div className="flex gap-3">
                  <Link to={'/cart'}><div className="relative cursor-pointer">
                    <ShoppingCart className="w-6 h-6 text-black" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                      5
                    </span>
                  </div></Link>
                  <Link to={'/profilePage'}><User className="w-6 h-6 text-black cursor-pointer" /></Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Drawer */}
      <Drawer
        style={{ backgroundColor: "#1D3557", color: "white" }}
        title={
          <img src={logo} alt="Logo" className="w-[120px]  mx-auto block" />
        }
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-4 pr-12 py-2 border border-gray-300 focus:ring-2 focus:ring-red-500 rounded-md"
            />
            <button className="absolute right-2 top-2">
              <Search className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>

        {/* Drawer Nav Items */}
        <div className="flex flex-col space-y-2 ">
          {navItems.map((item, idx) => (
            <DrawerItem key={idx} item={item} />
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="mt-6 flex gap-3">
          <NavLink
            to="/auth/signUp"
            className="border px-4 py-2 rounded-md text-white flex-1 text-center"
            onClick={() => setDrawerOpen(false)}
          >
            Sign Up
          </NavLink>
          <NavLink
            to="/auth/login"
            className="bg-gradient-to-r from-indigo-200 via-blue-400 to-blue-700 text-white px-4 py-2 rounded-md flex-1 text-center"
            onClick={() => setDrawerOpen(false)}
          >
            Log In
          </NavLink>
        </div>
      </Drawer>
    </header>
  );
};
