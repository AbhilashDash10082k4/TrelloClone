"use client";

import React, { useEffect } from "react";
import StoreProvider, { useAppSelector } from "../../state/redux";
import { Navbar } from "../Navbar";
import { Sidebar } from "../Sidebar";

/**
 * Internal Layout Component consuming Redux Global State for theme & sidebar layout calculations.
 */
const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // Sync dark class on html document root element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Sidebar />
      <main
        className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg transition-all duration-300 ${
          isSideBarCollapsed ? "" : "md:pl-64"
        }`}
      >
        <Navbar />
        <div className="flex-1 p-6">{children}</div>
      </main>
    </div>
  );
};

/**
 * DashboardWrapper component wrapping children with Redux StoreProvider.
 */
export const DashboardWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
