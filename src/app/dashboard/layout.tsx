"use client"

import clsx from "clsx"
import DashboardNav from "../_components/DashboardNav"
import { useTheme } from "../context/ThemeProvider"
import { createPortal } from "react-dom"

export default function Layout({ children }: {children: React.ReactNode}) {
    const { isLightTheme } = useTheme()

  return (
    <>
        <div className={clsx("absolute left-0 top-0 bottom-0 h-full w-20 border-r", {
            "border-gray-200": isLightTheme,
            "border-gray-700": !isLightTheme
        })}>
            <DashboardNav />
        </div>

        <div className="absolute left-20 top-0 right-0 bottom-0 overflow-y-scroll z-10">
            {children}
        </div>
    </>
  )
}