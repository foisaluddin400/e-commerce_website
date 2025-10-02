import { useState } from "react";
import { X, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SaveDesign() {
  const [designName, setDesignName] = useState("");
  const [email, setEmail] = useState("");
  const { frontPreview, backPreview } = useSelector((state) => state.design);
  console.log("SaveDesign Previews:", { frontPreview, backPreview });

  const handleSave = () => {
    if (!designName || !email) {
      alert("Please enter a design name and email.");
      return;
    }
    console.log("Saving design:", { designName, email, frontPreview, backPreview });
    alert("Design Saved ✅");
    // Optionally, reset form
    setDesignName("");
    setEmail("");
  };

  const placeholderImage = "https://via.placeholder.com/300x300?text=No+Design";

  return (
    <div className="flex items-center justify-center p-4 min-h-screen">
      <div className="bg-white grid grid-cols-2 rounded-lg w-full max-w-4xl">
        {/* Left side - Images */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="border">
              <img
                src={frontPreview || placeholderImage}
                alt="Front Design"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="border">
              <img
                src={backPreview || placeholderImage}
                alt="Back Design"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/allProduct/productDetails/design">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            </Link>

            <h2 className="text-lg font-medium text-gray-900">Save</h2>

            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div>
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
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}