import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  Menu,
} from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Drawer } from "antd";
import logo from "../assets/logo.png";
import { FaTwitter, FaYoutube } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";
import { RiInstagramFill } from "react-icons/ri";
import { useGetCategoryQuery } from "../Pages/redux/api/categoryApi";

export const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const { data: category } = useGetCategoryQuery();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/", isHighlighted: true },
    {
      label: "Custom Apparel",
      path: "/allProduct",
      children: [],
    },
    { label: "My Product", path: "/individual_product" },
    { label: "Order", path: "/allProduct", badge: 2 },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contactUs" },
    { label: "Blog", path: "/blog" },
  ];

  // ✅ Mega Menu (Desktop)
  const renderMegaMenu = () => {
    if (!category?.data?.length) return null;

    return (
      <div className="absolute left-0 top-full w-[1000px] text-sm bg-white shadow-lg rounded-md border py-4 px-8 grid grid-cols-2 md:grid-cols-4 gap-4 z-50">
        {category.data.map((cat) => (
          <div
            key={cat._id}
            className="cursor-pointer text-black hover:text-blue-600 transition-colors"
            onClick={() => navigate(`/category/subCategory/${cat._id}`)}
          >
            {cat.name}
          </div>
        ))}
      </div>
    );
  };

const DrawerItem = ({ item, level = 0 }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {

    if (item.label === "Custom Apparel") {
      setOpen(!open);
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div>

      <div
        className={`flex justify-between items-center px-4 py-2 hover:bg-gray-700 cursor-pointer transition-all`}
        style={{ paddingLeft: `${16 + level * 16}px` }}
        onClick={handleClick}
      >
        <span
          className={`flex-1 ${
            item.label === "Custom Apparel" ? "text-white" : "text-white"
          }`}
        >
          {item.label}
        </span>


        {item.label === "Custom Apparel" && (
          <ChevronDown
            className={`w-4 h-4 text-white transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        )}
      </div>


      {item.label === "Custom Apparel" && (
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out bg-[#2b3a57] ${
            open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {open &&
            category?.data?.length > 0 &&
            category.data.map((cat) => (
              <div
                key={cat._id}
                className="pl-10 py-2 text-sm text-gray-300 hover:text-blue-400 cursor-pointer transition"
                onClick={() => navigate(`/category/subCategory/${cat._id}`)}
              >
                {cat.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

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
    <header className="w-full">
      {/* 🔝 Top Banner */}
      <div className="bg-primary border-b border-gray-400 text-white py-3 hidden md:block">
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

      {/* 🔹 Main Header */}
      <div className="bg-white border-b">
        <div className="bg-primary px-4 lg:px-0">
          <div className="container mx-auto py-4 flex items-center justify-between gap-4">
            {/* Hamburger + Logo */}
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

            {/* Search (Desktop Only) */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const searchInput = e.target.elements.searchInput;
                    const query = searchInput.value.trim();
                    if (query) {
                      navigate(
                        `/allProduct?search=${encodeURIComponent(query)}`
                      );
                    }
                  }}
                >
                  <input
                    type="text"
                    name="searchInput"
                    placeholder="Search for anything..."
                    className="w-full pl-4 pr-12 py-2 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent rounded-md"
                  />
                  <button type="submit" className="absolute right-2 top-2">
                    <Search className="w-5 h-5 text-gray-600" />
                  </button>
                </form>
              </div>
            </div>

            {/* Auth Buttons */}
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

            {/* Cart + Profile (Mobile) */}
            <div className="block lg:hidden">
              <div className="flex gap-3">
                <Link to={"/cart"}>
                  <div className="relative cursor-pointer">
                    <ShoppingCart className="w-6 h-6 text-white" />
                    <span className="absolute -top-2 -right-2 bg-white text-black text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                      5
                    </span>
                  </div>
                </Link>
                <Link to={"/profilePage"}>
                  <User className="w-6 h-6 text-white cursor-pointer" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 🖥 Desktop Nav */}
        <div className="hidden md:block">
          <div className="container mx-auto">
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
                            ? "bg-secondary text-black font-medium"
                            : "text-gray-600 hover:text-gray-900"
                        }`
                      }
                    >
                      {item.label}
                      {item.label === "Custom Apparel" && (
                        <ChevronDown className="w-4 h-4" />
                      )}
                      {item.badge && (
                        <span className="ml-1 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>

                    {/* Mega Menu */}
                    {item.label === "Custom Apparel" &&
                      openDropdown === "Custom Apparel" &&
                      renderMegaMenu()}
                  </div>
                ))}
              </div>

              {/* Cart + Profile (Desktop) */}
              <div className="hidden lg:block">
                <div className="flex gap-3">
                  <Link to={"/cart"}>
                    <div className="relative cursor-pointer">
                      <ShoppingCart className="w-6 h-6 text-black" />
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                        5
                      </span>
                    </div>
                  </Link>
                  <Link to={"/profilePage"}>
                    <User className="w-6 h-6 text-black cursor-pointer" />
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* 📱 Drawer (Mobile Menu) */}
      <Drawer
        style={{ backgroundColor: "#1D3557", color: "white" }}
        title={<img src={logo} alt="Logo" className="w-[120px] mx-auto block" />}
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        {/* 🔍 Search */}
        <div className="mb-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const searchInput = e.target.elements.searchInput;
              const query = searchInput.value.trim();
              if (query) {
                navigate(`/allProduct?search=${encodeURIComponent(query)}`);
              }
            }}
          >
            <div className="relative">
              <input
                type="text"
                name="searchInput"
                placeholder="Search..."
                className="w-full pl-4 pr-12 py-2 border border-gray-300 focus:ring-2 focus:ring-red-500 rounded-md"
              />
              <button type="submit" className="absolute right-2 top-2">
                <Search className="w-5 h-5 text-black" />
              </button>
            </div>
          </form>
        </div>

        {/* Drawer Menu Items */}
        <div className="flex flex-col space-y-2">
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
