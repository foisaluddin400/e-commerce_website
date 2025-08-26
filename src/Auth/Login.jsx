import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Login = () => {
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onFinish = (values) => {
    console.log("Form Values:", values);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 lg:px-0">
      <div className="w-full max-w-lg  lg:p-8 p-4 border">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Sign In</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Enter your email address or choose a different way to sign in to
          Custom Ink.
        </p>

        {/* Ant Design Form */}
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Email */}
          <Form.Item
            label="Enter Email Address"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input
              style={{ height: "50px" }}
              placeholder="Enter Email Address"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              style={{ height: "50px" }}
              className=""
              placeholder="••••••••"
            />
          </Form.Item>

          <div className="flex items-center justify-between mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-gray-700">Remember me</Checkbox>
            </Form.Item>
            <Link
              to={"/auth/forgot-password"}
              className="text-sm text-[#2F799E] hover:underline focus:outline-none"
            >
              Forget password?
            </Link>
          </div>

          {/* Continue Button */}
          <Form.Item>
            <button
              htmlType="submit"
              className="w-full bg-primary py-3 text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Continue
            </button>
          </Form.Item>
        </Form>

        {/* Terms */}
        <p className="text-xs text-gray-600 mb-6 text-center">
          By Clicking Continue, I agree to the{" "}
          <span className="text-blue-600 cursor-pointer">Terms of Service</span>{" "}
          and{" "}
          <span className="text-blue-600 cursor-pointer">Privacy Policy</span>
        </p>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google */}
        <Button
          style={{ height: "50px" }}
          block
          className="flex items-center justify-center border border-gray-300 mb-3"
        >
          <FaGoogle className="text-red-500 mr-2" /> Continue With Google
        </Button>

        {/* Facebook */}
        <Button
          style={{ height: "50px" }}
          block
          className="flex items-center justify-center border border-gray-300"
        >
          <FaFacebookF className="text-blue-600 mr-2" /> Continue With Facebook
        </Button>

        {/* Sign In Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don.t have an account?{" "}
          <Link to={"/auth/signUp"}>
            {" "}
            <span className="text-blue-600 cursor-pointer">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};
