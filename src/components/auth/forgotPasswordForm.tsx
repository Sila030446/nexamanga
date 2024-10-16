"use client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IoMdMail } from "react-icons/io";

const ForgotPasswordForm = () => {
  return (
    <form action="" className="flex flex-col gap-4">
      <div className="w-full h-12 relative">
        <IoMdMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        <Input
          className="w-full h-full pl-10 pr-4 py-2 text-md"
          type="email"
          placeholder="อีเมล"
        />
      </div>

      <Button
        className="w-full bg-emerald-500 text-white px-4 text-base transition-all duration-300 ease-in-out transform hover:bg-emerald-600 hover:scale-105 active:scale-95"
        type="submit"
        size={"lg"}
      >
        ตกลง
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
