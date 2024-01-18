"use client";

import clsx from "clsx";
import DashboardNav from "../_components/DashboardNav";
import { useTheme } from "../context/ThemeProvider";
// import { createPortal } from "react-dom"

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLightTheme } = useTheme();

  return (
    <>
      <div
        className={clsx("absolute bottom-0 left-0 top-0 h-full w-20 border-r", {
          "border-gray-200": isLightTheme,
          "border-gray-700": !isLightTheme,
        })}
      >
        <DashboardNav />
      </div>

      <div className="absolute bottom-0 left-20 right-0 top-0 z-10 overflow-y-scroll">
        {children}
      </div>
    </>
  );
}
