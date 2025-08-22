import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
export const ContuctUsPage = () => {
  return (
     <div className="min-h-screen bg-white">
      {/* Our Location Section */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Our Location</h2>
        <div className="w-full h-80 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src="/us-map-mint-green.png"
            alt="United States Map"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Contact Form and Business Info Section */}
      <section className="px-6 pb-12 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Form</h2>
            <p className="text-gray-600 mb-8">
              We'd love to hear from you! Whether it's a question, feedback, or just a hello — drop us a message.
            </p>

            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your email address"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Message"
                  rows={6}
                  className="w-full border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-primary text-white font-semibold px-4 py-2 rounded-md  "
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Business Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">Business Phone, Hours, Address, and Email</h2>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">+15244122643</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">hridoy@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Dhaka, Bangladesh Road 12, House 24</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
