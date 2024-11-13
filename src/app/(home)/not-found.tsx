import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-155px)]  text-center">
      <h1 className="text-5xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mt-4">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/">
        <button className="mt-6 px-6 py-2 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700">
          Go Back Home
        </button>
      </Link>
    </div>
  );
}
