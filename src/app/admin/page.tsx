import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Admin Page",
  description: "Admin Control Panel",
  robots: {
    index: false,
    follow: false,
  },
};

const AdminPage = () => {
  return <div>AdminPage</div>;
};

export default AdminPage;
