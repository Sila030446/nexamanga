// bookmarkButton
"use client";

import { FaBookBookmark } from "react-icons/fa6";
import { Button } from "../button";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/(auth)/contexts/auth-context";
import { useRouter } from "next/navigation";
import { deleteBookmark, getBookmarks, postBookmark } from "@/action/Bookmark";

interface BookmarkButtonProps {
  className?: string;
  mangaManhwaId: number;
}

const BookmarkButton = ({ className, mangaManhwaId }: BookmarkButtonProps) => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!authContext) return;

      try {
        const bookmarks = await getBookmarks();
        const bookmarkedIds = bookmarks.map(
          (bookmark: { mangaManhwaId: number }) => bookmark.mangaManhwaId
        );
        setIsBookmarked(bookmarkedIds.includes(mangaManhwaId));
      } catch (error) {
        console.error("Failed to fetch bookmark status:", error);
      }
    };

    fetchBookmarks();
  }, [authContext, mangaManhwaId]);

  const handleBookmarkToggle = async () => {
    if (!authContext) {
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      if (isBookmarked) {
        await deleteBookmark(mangaManhwaId);
        setIsBookmarked(false);
      } else {
        await postBookmark(mangaManhwaId);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className={className}
      size="lg"
      onClick={handleBookmarkToggle}
      disabled={loading}
    >
      <FaBookBookmark className="w-4 h-4 mr-2" />
      <span className="text-sm">
        {loading ? "Loading..." : isBookmarked ? "Unbookmark" : "Bookmark"}
      </span>
    </Button>
  );
};

export default BookmarkButton;
