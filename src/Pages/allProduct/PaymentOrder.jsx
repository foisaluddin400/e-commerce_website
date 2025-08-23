import React, { useState } from 'react'
import img from '../../assets/Home/shirt.png'
const PaymentOrder = () => {
     const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : v;
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) return v.substring(0, 2) + "/" + v.substring(2, 4);
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.length <= 5) setExpiryDate(formatted);
  };
  return (
    <div>
         <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 py-16">
      {/* Payment Method Section */}
      <div className=" ">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Payment Method</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <input type="radio" id="credit-card" name="payment" defaultChecked />
              <label htmlFor="credit-card" className="text-base font-medium">
                Credit card
              </label>
            </div>
            <div className="flex space-x-2">
              <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">AE</span>
              </div>
              <div className="w-8 h-5 bg-gray-400 rounded"></div>
              <div className="w-8 h-5 bg-blue-800 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">V</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Card Number */}
            <div>
              <label htmlFor="card-number" className="text-sm font-medium text-gray-700 block mb-1">
                Card Number
              </label>
              <input
                id="card-number"
                type="text"
                placeholder="1111 1111 1111 1111"
                value={cardNumber}
                onChange={handleCardNumberChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            {/* Expiry, CVC, Postal */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="expiry" className="text-sm font-medium text-gray-700 block mb-1">
                  Expiration date
                </label>
                <input
                  id="expiry"
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={handleExpiryChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div>
                <label htmlFor="cvc" className="text-sm font-medium text-gray-700 block mb-1">
                  CVC
                </label>
                <input
                  id="cvc"
                  type="text"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").substring(0, 4))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div>
                <label htmlFor="postal" className="text-sm font-medium text-gray-700 block mb-1">
                  Postal Code
                </label>
                <input
                  id="postal"
                  type="text"
                  placeholder="4567"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value.substring(0, 10))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>
          </div>

          <button className="w-full bg-primary hover:bg-red-600 text-white py-2 text-base font-medium rounded-md">
            Continue to Payment
          </button>
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="   ">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>

        <div className="relative mb-4">
          <span className="absolute -top-2 -right-2 bg-primary text-white px-2 py-1 text-xs font-medium rounded">
            Best Sell
          </span>
          <div className="bg-gray-100 rounded-lg p-6 flex justify-center">
            <img
              src={img}
              alt="Gildean Softstyle Jersey T shirt"
              className="object-contain w-32 h-32"
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">Gildean Softstyle Jersey T shirt</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            These T-shirts are dominating the fashion scene with their unique designs and top-quality fabric. Pick your favorite now!
          </p>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Size: XL</span>
            <span className="text-gray-600">Price: $200</span>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <div className="flex justify-between">
            <span className="text-gray-700">Subtotal</span>
            <span className="font-semibold">$200</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Shipping & Handling</span>
            <span className="font-semibold">$141.90</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total</span>
            <span>$709.00</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default PaymentOrder