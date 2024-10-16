import Navbar from "@/components/home/Navbar";

import React from "react";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <>
      <Navbar />

      <div className="max-w-7xl p-0 md:p-2 mx-auto">{children}</div>

      <footer className="w-full h-20">
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-sm text-center text-muted-foreground">
            © 2025 Nexamanga | All rights reserved
          </p>
        </div>
      </footer>
    </>
  );
};

export default HomeLayout;
