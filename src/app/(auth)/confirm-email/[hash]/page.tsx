"use client";
import API_URL from "@/common/constants/api";
import { getErrorMessage } from "@/utils/error";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ConfirmEmail = ({ params }: { params: { hash: string } }) => {
  const router = useRouter();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/confirm-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: params.hash }),
        });

        if (!res.ok) {
          const errorMessage = getErrorMessage(res);
          toast.error(errorMessage);
        } else {
          toast.success("Email confirmed successfully!");
        }
      } catch (error) {
        toast.error(`An error occurred while confirming email: ${error}`);
      } finally {
        router.push("/login");
      }
    };

    confirmEmail();
  }, [params.hash, router]);

  return null;
};

export default ConfirmEmail;
