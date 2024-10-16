"use client";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearch, IoHome } from "react-icons/io5";
import { FaBook, FaBookBookmark, FaBookJournalWhills } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Anton } from "next/font/google";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useContext } from "react";
import { AuthContext } from "@/app/(auth)/contexts/auth-context";
import UserMenu from "./UserMenu";
import { ModeToggle } from "../ui/themeSwitcher";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });

const Navbar = () => {
  const authenticated = useContext(AuthContext);

  const menuItems = [
    { href: "/", icon: <IoHome className="w-4 h-4" />, label: "หน้าหลัก" },
    {
      href: "/category/manhwa",
      icon: <FaBook className="w-4 h-4" />,
      label: "อ่านมังฮวา",
    },
    {
      href: "/category/manga",
      icon: <FaBookJournalWhills className="w-4 h-4" />,
      label: "อ่านมังงะ",
    },
  ];

  return (
    <div
      className={` bg-white/60 dark:bg-black/60 backdrop-blur-md top-0 w-full h-14 shadow-md border-muted-foreground flex items-center transition-transform duration-300 `}
    >
      <div className="max-w-7xl p-2 mx-auto w-full">
        <div className="w-full h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="lg:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="p-1" variant="ghost">
                    <GiHamburgerMenu className="w-6 h-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>
                    <p className="text-base font-semibold text-muted-foreground">
                      เมนู
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {menuItems.map((item, index) => (
                    <DropdownMenuItem
                      key={index}
                      className="gap-0.5 items-center"
                    >
                      {item.icon}
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                  {authenticated && (
                    <DropdownMenuItem className="gap-0.5 items-center">
                      <FaBookBookmark className="w-4 h-4" />
                      <Link href="/user/bookmark">
                        {authenticated ? "บุ๊คมาร์ค" : ""}
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link href="/">
              <h1
                className={`text-2xl font-bold ${anton.className} tracking-[0.5px]`}
              >
                Nexamanga
              </h1>
            </Link>
            <div className="ml-4 hidden lg:flex items-center gap-2">
              <Link href="/category/manga">
                <Button
                  variant="ghost"
                  className="text-base font-semibold text-muted-foreground"
                >
                  อ่านมังงะ
                </Button>
              </Link>
              <Link href="/category/manhwa">
                <Button
                  variant="ghost"
                  className="text-base font-semibold text-muted-foreground"
                >
                  อ่านมังฮวา
                </Button>
              </Link>
              {authenticated && (
                <Link href="/user/bookmark">
                  <Button
                    variant="ghost"
                    className="text-base font-semibold text-muted-foreground"
                  >
                    บุ๊คมาร์ค
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button className="p-2" variant="ghost">
              <IoSearch className="w-6 h-6" />
            </Button>
            <ModeToggle />
            {authenticated ? (
              <UserMenu />
            ) : (
              <Link href="/login">
                <Button className="p-2" variant="ghost">
                  <p className="text-base font-semibold text-muted-foreground">
                    เข้าสู่ระบบ
                  </p>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
