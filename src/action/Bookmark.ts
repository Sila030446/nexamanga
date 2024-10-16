"use server";

import API_URL from "@/common/constants/api";
import { getErrorMessage } from "@/utils/error";
import { cookies } from "next/headers";

// Helper function to perform fetch requests
async function fetchWithCookie(url: string, options: RequestInit = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Cookie: cookies().toString(),
    },
  });

  if (!response.ok) {
    const errorMessage = await getErrorMessage(response);
    throw new Error(errorMessage);
  }

  return response.json(); // Parse the JSON response
}

export async function getBookmarks() {
  try {
    return await fetchWithCookie(`${API_URL}/bookmark`);
  } catch (err) {
    console.error("Error fetching bookmarks:", err);
    throw err;
  }
}

export async function postBookmark(mangaManhwaId: number) {
  if (mangaManhwaId == null) {
    throw new Error("mangaManhwaId cannot be null or undefined");
  }

  try {
    return await fetchWithCookie(`${API_URL}/bookmark/${mangaManhwaId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.warn(`Manga with ID ${mangaManhwaId} is already bookmarked.`);
    console.error("Error posting bookmark:", err);
    throw err;
  }
}

export async function deleteBookmark(mangaManhwaId: number) {
  if (mangaManhwaId == null) {
    throw new Error("mangaManhwaId cannot be null or undefined");
  }

  try {
    return await fetchWithCookie(`${API_URL}/bookmark/${mangaManhwaId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Error deleting bookmark:", err);
    throw err;
  }
}
