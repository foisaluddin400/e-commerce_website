import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

// Button Component
const Button = ({ children, className, ...props }) => (
  <button
    className={`px-3 py-2 rounded ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Input Component
const Input = ({ className, ...props }) => (
  <input
    className={`px-3 py-2 border rounded ${className}`}
    {...props}
  />
);
export const Footer = () => {
  return (
 <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Exclusive Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4">Exclusive</h3>
            <h4 className="text-lg font-medium mb-3">Subscribe</h4>
            <p className="text-gray-300 mb-4">Get 10% off your first order</p>
            <div className="flex">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-gray-600 text-white placeholder:text-gray-400 rounded-r-none"
              />
              <Button className="bg-transparent border border-gray-600 border-l-0 rounded-l-none hover:bg-gray-700">
                →
              </Button>
            </div>
          </div>

          {/* Support Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4">Support</h3>
            <div className="space-y-2 text-gray-300">
              <p>111 Mohakhali, Dhaka,</p>
              <p>DH 1515, Bangladesh.</p>
              <p>bdcalling@gmail.com</p>
              <p>+88015-88888-9999</p>
            </div>
          </div>

          {/* Account Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4">Account</h3>
            <div className="space-y-2">
              <a href="/profilePage" className="block text-gray-300 hover:text-white transition-colors">
                My Account
              </a>
              <a href="/auth/login" className="block text-gray-300 hover:text-white transition-colors">
                Login / Register
              </a>
              <a href="/cart" className="block text-gray-300 hover:text-white transition-colors">
                Cart
              </a>
            </div>
          </div>

          {/* Quick Link Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4">Quick Link</h3>
            <div className="space-y-2">
              <a href="/privecyPolicy" className="block text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/termsAndCondition" className="block text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/faq" className="block text-gray-300 hover:text-white transition-colors">
                FAQ
              </a>
            </div>
          </div>

          {/* Download App Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4">Download App</h3>
            <p className="text-sm text-gray-300 mb-4">Save $3 with App New User Only</p>

            <div className="flex gap-3 mb-4">
              {/* QR Code placeholder */}
              <div className="w-20 h-20 bg-white rounded flex items-center justify-center">
                <div className="w-16 h-16 bg-black rounded grid grid-cols-4 gap-px p-1">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className={`${Math.random() > 0.5 ? "bg-white" : "bg-black"} rounded-sm`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {/* Google Play Store */}
                <div className="bg-black rounded px-3 py-1 flex items-center gap-2 text-xs">
                  <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                    <span className="text-black font-bold text-xs">▶</span>
                  </div>
                  <div>
                    <div className="text-gray-300">GET IT ON</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </div>

                {/* App Store */}
                <div className="bg-black rounded px-3 py-1 flex items-center gap-2 text-xs">
                  <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                    <span className="text-black font-bold text-xs">🍎</span>
                  </div>
                  <div>
                    <div className="text-gray-300">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              <Facebook className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
