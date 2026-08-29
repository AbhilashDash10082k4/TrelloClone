"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, Moon, Search, Settings, Sun, LogOut } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import { setIsDarkMode, setIsSideBarCollapsed } from "@/state";

/**
 * Navbar component for main application shell.
 * Controls sidebar collapse toggle, global dark theme toggle, search, and user profile menu.
 */
export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // State for profile menu dropdown
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between bg-white dark:bg-dark-secondary border-b border-gray-200 dark:border-stroke-dark px-4 py-3 transition-colors duration-200">
      {/* Search Input & Hamburger Toggle */}
      <div className="flex items-center gap-3 md:gap-4">
        {isSideBarCollapsed && (
          <button
            onClick={() => dispatch(setIsSideBarCollapsed(!isSideBarCollapsed))}
            className="rounded p-1.5 hover:bg-gray-100 dark:hover:bg-dark-tertiary text-gray-700 dark:text-gray-200 cursor-pointer transition-colors"
            aria-label="Toggle Sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <div className="relative flex w-48 sm:w-64 md:w-80 items-center">
          <Search className="absolute left-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <input
            className="w-full rounded-md bg-gray-100 dark:bg-dark-bg py-1.5 pl-9 pr-4 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-primary"
            type="search"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Actions & Profile Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Dark / Light Theme Toggle Icon */}
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className="rounded p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-tertiary cursor-pointer transition-colors"
          aria-label="Toggle Theme Mode"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-amber-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-600" />
          )}
        </button>

        {/* Settings Navigation */}
        <Link
          href="/settings"
          className="rounded p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-tertiary cursor-pointer transition-colors"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </Link>

        <div className="h-5 w-px bg-gray-200 dark:bg-stroke-dark mx-1" />

        {/* Profile Avatar & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen((prev) => !prev)}
            className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-primary text-white font-medium text-sm cursor-pointer shadow-sm hover:opacity-90 transition-opacity"
            aria-label="User Profile Menu"
          >
            U
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md bg-white dark:bg-dark-secondary shadow-lg border border-gray-200 dark:border-stroke-dark py-1 z-50">
              <div className="px-4 py-2 border-b border-gray-100 dark:border-stroke-dark">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  Demo User
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  user@demo.com
                </p>
              </div>
              <button
                onClick={() => setIsProfileMenuOpen(false)}
                aria-label="Sign Out"
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-dark-tertiary cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
