import React from "react";
import { Navbar } from "../shared/Navbar";
import { Outlet } from "react-router-dom";
import { Footer } from "../shared/Footer";

export const Root = () => {
  return (
    <div>
      <div className=" flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <div className="flex-grow bg-gray-50">
          <Outlet />
        </div>

        {/* Footer always at bottom */}
        <Footer />
      </div>
    </div>
  );
};
