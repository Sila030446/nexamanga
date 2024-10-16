/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import logout from "@/app/(auth)/logout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProfileData } from "@/app/user/profile/profile";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { IoIosNotificationsOutline } from "react-icons/io";

const UserMenu = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileTypes>();
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to manage error messages

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await fetchProfileData();
        setProfile(profileData);
      } catch (err: any) {
        setError("Failed to fetch profile data.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProfile(); // Call the function to fetch profile data
  }, []);

  // Optional: render loading or error state
  if (loading) {
    return <Skeleton className="h-12 w-12 rounded-full" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Button size={"icon"} variant={"ghost"}>
        <IoIosNotificationsOutline className="w-6 h-6" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src={profile?.image || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>{profile?.name || "CN"}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Account Menu</DropdownMenuLabel>
          <DropdownMenuLabel className="text-sm">
            ยินดีต้อนรับ {profile?.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              router.push("/user/profile");
            }}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push("/user/settings");
            }}
          >
            Settings
          </DropdownMenuItem>
          {profile?.role === "ADMIN" && (
            <DropdownMenuItem
              onClick={() => {
                router.push("/admin");
              }}
            >
              Admin
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserMenu;
