import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterLoginMutation } from "../Pages/redux/api/userApi";

export const SignUp = () => {
  const [form] = Form.useForm();
   const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const[registerLogin]=useRegisterLoginMutation()
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onFinish = async (values) => {
    console.log(values);
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,}
    try {
      const payload = await registerLogin(data).unwrap();
      console.log(payload);
      if (payload) {
      
        message.success(payload?.message);
        navigate("/auth/login");
      } else {
        message.error(payload?.message );
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error(error?.data?.message || "Server is down");
    } finally {
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 lg:px-0">
      <div className="w-full max-w-lg  lg:p-8 p-4 border">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Create An Account
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          Secure your account by creating a password and verifying your email.
        </p>

        {/* Ant Design Form */}
        <Form form={form} layout="vertical" onFinish={onFinish}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Form.Item

            label="Enter First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please Enter First Name!" },
           
            ]}
          >
            <Input style={{height:'50px'}} placeholder="Enter First Name" />
          </Form.Item>

           <Form.Item

            label="Enter Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please enter Enter Last Name!" },
           
            ]}
          >
            <Input style={{height:'50px'}} placeholder="Enter Enter Last Name" />
          </Form.Item>
          </div>
          {/* Email */}
          <Form.Item

            label="Enter Email Address"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input style={{height:'50px'}} placeholder="Enter Email Address" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Enter New Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input
            style={{height:'50px'}}
              type={showPassword ? "text" : "password"}
              placeholder="Enter New Password"
              suffix={
                <span
                  className="cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              }
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input
            style={{height:'50px'}}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              suffix={
                <span
                  className="cursor-pointer text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              }
            />
          </Form.Item>

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
        style={{height:'50px'}}
          block
          className="flex items-center justify-center border border-gray-300 mb-3"
        >
          <FaGoogle className="text-red-500 mr-2" /> Continue With Google
        </Button>

 

        {/* Sign In Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
         <Link to={'/auth/login'}> <span className="text-blue-600 cursor-pointer">Sign in</span></Link>
        </p>
      </div>
    </div>
  );
};
