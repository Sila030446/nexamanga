"use client";
import API_URL from "@/common/constants/api";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";

const GoogleLoginButton = () => {
  return (
    <Button
      onClick={() => {
        window.location.href = `${API_URL}/auth/google`;
      }}
      className="w-full bg-red-500 text-white px-4 text-base transition-all duration-300 ease-in-out transform hover:bg-red-600 hover:scale-105 active:scale-95"
      type="button"
      size={"lg"}
    >
      <FaGoogle className="mr-2 h-5 w-5" />
      สมัคร / เข้าสู่ระบบด้วย Google
    </Button>
  );
};

export default GoogleLoginButton;
