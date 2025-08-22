"use client"

import { useState } from "react"
import { X, ChevronLeft } from "lucide-react"
import img from '../../assets/Home/shirt1.png'
import { Link } from "react-router-dom"
export default function SaveDesign() {
  const [designName, setDesignName] = useState("")
  const [email, setEmail] = useState("")

  const handleSave = () => {
    console.log("Saving design:", { designName, email })
    alert("Design Saved ✅")
  }

  return (
    <div className="  flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex">
        {/* Left side - Image */}
        <div className="flex-1 bg-gray-100">
          <img
            src={img}
            alt="Person wearing beige t-shirt"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side - Form */}
        <div className="flex-1 p-8 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <h2 className="text-lg font-medium text-gray-900">Save</h2>

            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Save your design
              </h3>
              <p className="text-gray-600">
                View it anywhere, and share it with others!
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6 mb-8">
              <div>
                <label
                  htmlFor="design-name"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Design name
                </label>
                <input
                  id="design-name"
                  type="text"
                  placeholder="Design name"
                  value={designName}
                  onChange={(e) => setDesignName(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500">
                By clicking 'Save Design', I agree to the{" "}
                <a href="#" className="text-gray-700 hover:underline">
                  terms of service
                </a>{" "}
                and{" "}
                <a href="#" className="text-gray-700 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>

            {/* Save Button */}
         <button
              onClick={handleSave}
              className="w-full bg-primary hover:bg-red-600 text-white py-3 rounded-lg font-medium transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
