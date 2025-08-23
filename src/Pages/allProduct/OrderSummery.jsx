import React, { useState } from 'react'
import img from '../../assets/Home/shirt.png'
import { Link } from 'react-router-dom';
const OrderSummery = () => {
      const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    aptSuite: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContinueToPayment = () => {
    console.log("Continue to payment with data:", formData);
  };
  return (
    <div className="container mx-auto py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className=" rounded-lg p-6 h-fit  ">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

          {/* Product Card */}
          <div className="rounded-lg p-4 mb-6">
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-gradient-to-b from-orange-200 to-orange-500 rounded-lg flex items-center justify-center relative overflow-hidden">
                <img
                  src={img}
                  alt="Gildan Softstyle Jersey T shirt"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-start gap-2 mb-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Best Sell</span>
                  <span className="text-sm text-gray-600">Gildan Softstyle Jersey T shirt</span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2">Gildan Softstyle Jersey T shirt</h3>

                <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                  These T-shirts are dominating the fashion scene with their unique designs and top-quality fabric. Pick
                  your favorite now!
                </p>

                <div className="flex gap-4 text-sm">
                  <span>
                    <strong>Size:</strong> XL
                  </span>
                  <span>
                    <strong>Price:</strong> $200
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">$200</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Shipping & Handling</span>
              <span className="font-semibold">$141.90</span>
            </div>

            <div className="flex justify-between text-lg font-bold border-t pt-3">
              <span>Total</span>
              <span>$709.00</span>
            </div>
          </div>
        </div>

        {/* Shipping Form */}
        <div className=" p-6 ">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping</h2>

          <form className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700 block mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="text-sm font-medium text-gray-700 block mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>

            {/* Address Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="streetAddress" className="text-sm font-medium text-gray-700 block mb-1">
                  Street address
                </label>
                <input
                  id="streetAddress"
                  type="text"
                  placeholder="Enter Street name"
                  value={formData.streetAddress}
                  onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div>
                <label htmlFor="aptSuite" className="text-sm font-medium text-gray-700 block mb-1">
                  Apt. / Suite
                </label>
                <input
                  id="aptSuite"
                  type="text"
                  placeholder="Apt. / Suite"
                  value={formData.aptSuite}
                  onChange={(e) => handleInputChange("aptSuite", e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>

            {/* City and Postal Code */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="text-sm font-medium text-gray-700 block mb-1">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div>
                <label htmlFor="postalCode" className="text-sm font-medium text-gray-700 block mb-1">
                  Postal code
                </label>
                <input
                  id="postalCode"
                  type="text"
                  placeholder="Zip"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700 block mb-1">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="tel"
                placeholder="Phone number"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            {/* Continue Button */}
            <Link to={'/allProduct/productDetails/design/getPrice/chooseOrder/orderSummery/paymentOrder'}><button
              type="button"
              onClick={handleContinueToPayment}
              className="w-full bg-primary hover:bg-red-600 text-white py-2 mt-6 rounded-md text-lg font-medium"
            >
              Continue to Payment
            </button></Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OrderSummery