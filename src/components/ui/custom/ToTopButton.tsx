"use client";
import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "../button";

const ToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      // Adjust this value to control when the button appears
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Button
      size={"icon"}
      onClick={scrollToTop}
      className={`flex fixed z-50 items-center justify-center text-white w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-black bg-opacity-40 hover:bg-opacity-60 hover:bg-black bottom-8 right-8 shadow-md transition duration-300 ease-in-out ${
        isVisible ? "flex" : "hidden"
      }`}
    >
      <ArrowUp className="w-6 h-6" />
    </Button>
  );
};

export default ToTopButton;
