"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Clock,
  Home,
  Layers3,
  Lock,
  Search,
  Settings,
  ShieldAlert,
  X,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../state/redux";
import { setIsSideBarCollapsed } from "../../state";

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

/**
 * Reusable Sidebar Navigation Link with dynamic active route styling.
 */
const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  icon: Icon,
  label,
}) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex items-center gap-3 px-8 py-3 transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-tertiary ${
          isActive
            ? "bg-gray-100 dark:bg-dark-secondary text-blue-primary font-semibold"
            : "text-gray-700 dark:text-gray-300"
        }`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-full w-1.25 bg-blue-primary" />
        )}
        <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
};

// Main navigation links array
const mainLinks = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: TimelineIcon, label: "Timeline", href: "/timeline" },
  { icon: Search, label: "Search", href: "/search" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

// Priority navigation items
const priorityLinks = [
  { icon: AlertCircle, label: "Urgent", href: "/priority/urgent" },
  { icon: ShieldAlert, label: "High", href: "/priority/high" },
  { icon: AlertTriangle, label: "Medium", href: "/priority/medium" },
  { icon: AlertOctagon, label: "Low", href: "/priority/low" },
  { icon: Layers3, label: "Backlog", href: "/priority/backlog" },
];

/**
 * Sidebar component for primary navigation, project panels, and priority routes.
 */
export const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed,
  );

  // Panel collapse states
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const sidebarClassNames = `fixed flex flex-col justify-between h-full shadow-xl transition-all duration-300 z-40 bg-white dark:bg-dark-bg border-r border-gray-200 dark:border-stroke-dark overflow-y-auto ${
    isSideBarCollapsed ? "w-0 hidden" : "w-64"
  }`;

  return (
    <aside className={sidebarClassNames}>
      <div className="flex h-full w-full flex-col justify-between">
        {/* Top Header & Logo */}
        <div>
          <div className="flex h-14 w-64 items-center justify-between px-6 border-b border-gray-200 dark:border-stroke-dark">
            <div className="text-xl font-bold text-gray-800 dark:text-white tracking-wide">
              PROJECTS
            </div>
            <button
              onClick={() =>
                dispatch(setIsSideBarCollapsed(!isSideBarCollapsed))
              }
              className="rounded p-1 hover:bg-gray-100 dark:hover:bg-dark-tertiary text-gray-600 dark:text-gray-300 cursor-pointer transition-colors"
              aria-label="Close Sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Team / Workspace Banner */}
          <div className="flex items-center gap-3 border-b border-gray-200 dark:border-stroke-dark px-8 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-primary text-white font-bold text-sm">
              T
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wide text-gray-800 dark:text-gray-200">
                TEAM VAULT
              </h3>
              <div className="mt-0.5 flex items-center gap-1">
                <Lock className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Private
                </span>
              </div>
            </div>
          </div>

          {/* Main Links */}
          <nav className="mt-2 flex flex-col">
            {mainLinks.map((link) => (
              <SidebarLink
                key={link.label}
                icon={link.icon}
                label={link.label}
                href={link.href}
              />
            ))}
          </nav>

          {/* Projects Section */}
          <div className="mt-4 border-t border-gray-200 dark:border-stroke-dark pt-2">
            <button
              onClick={() => setShowProjects((prev) => !prev)}
              className="flex w-full items-center justify-between px-8 py-3 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer"
            >
              <span className="text-xs font-semibold uppercase tracking-wider">
                Projects
              </span>
              {showProjects ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {showProjects && (
              <div className="flex flex-col">
                {/* TODO: Connect with RTK Query getProjects API */}
                <SidebarLink
                  icon={Layers3}
                  label="Sample Project"
                  href="/projects/1"
                />
              </div>
            )}
          </div>

          {/* Priority Section */}
          <div className="mt-2 border-t border-gray-200 dark:border-stroke-dark pt-2 mb-6">
            <button
              onClick={() => setShowPriority((prev) => !prev)}
              className="flex w-full items-center justify-between px-8 py-3 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer"
            >
              <span className="text-xs font-semibold uppercase tracking-wider">
                Priority
              </span>
              {showPriority ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {showPriority && (
              <div className="flex flex-col">
                {priorityLinks.map((link) => (
                  <SidebarLink
                    key={link.label}
                    icon={link.icon}
                    label={link.label}
                    href={link.href}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

// Helper Icon alias for Timeline
function TimelineIcon(props: React.SVGProps<SVGSVGElement>) {
  return <Clock className="h-5 w-5" {...props} />;
}
