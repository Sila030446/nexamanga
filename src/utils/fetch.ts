import API_URL from "@/common/constants/api";
import { cookies } from "next/headers";
import { getErrorMessageSignUp } from "./error";

interface FetchOptions {
  path: string;
  formData: FormData;
  errorOptions?: boolean;
}

const getHeaders = () => ({
  Cookie: cookies().toString(),
});

export const postRegister = async ({
  path,
  formData,
  errorOptions,
}: FetchOptions) => {
  try {
    const res = await fetch(`${API_URL}/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getHeaders(),
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    const parseRes = await res.json();
    if (!res.ok) {
      return { error: getErrorMessageSignUp(parseRes) };
    }

    if (errorOptions && res.status === 422) {
      return { error: parseRes };
    }

    return { error: "" };
  } catch (err) {
    console.log(err);
    return { error: "Unknown error occurred." };
  }
};

export const get = async (path: string) => {
  try {
    const res = await fetch(`${API_URL}/${path}`, {
      headers: { ...getHeaders() },
    });
    return res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
};
