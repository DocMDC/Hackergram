"use client";
import { useState, useRef } from "react";
import { FaKeyboard } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { FaRegPlusSquare } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import useClickOutNav from "../hooks/useClickOutNav";
import { useTheme } from "../context/ThemeProvider";
import { clsx } from "clsx";
// import { signOut } from "next-auth/react";
import ToggleTheme from "./ui/ToggleTheme";

export default function DashboardNav() {
  const [toggleSignOut, setToggleSignOut] = useState(false);
  const hamburgerRef = useRef(null);
  const settingsRef = useRef(null);
  const { isLightTheme } = useTheme();

  //If user clicks outside of the settingsRef, make the pop up disappear
  useClickOutNav(hamburgerRef, settingsRef, () => {
    setToggleSignOut(false);
  });

  return (
    <div
      className={clsx(
        "flex h-full min-h-[500px] flex-col items-center overflow-y-scroll",
        {
          "bg-lightMode-primary text-black": isLightTheme,
          "bg-darkMode-primary text-100": !isLightTheme,
        },
      )}
    >
      <div className="h-1/6 py-4">
        <div
          className={clsx("cursor-pointer px-8 py-2", {
            "hover:bg-lightMode-highlight": isLightTheme,
            "hover:bg-darkMode-highlight": !isLightTheme,
          })}
        >
          <FaKeyboard />
        </div>
      </div>

      <div className="flex h-3/6 min-h-[300px] flex-col items-center justify-between py-4">
        <div
          className={clsx("cursor-pointer px-8 py-2", {
            "hover:bg-lightMode-highlight": isLightTheme,
            "hover:bg-darkMode-highlight": !isLightTheme,
          })}
        >
          <FaHome />
        </div>
        <div
          className={clsx("cursor-pointer px-8 py-2", {
            "hover:bg-lightMode-highlight": isLightTheme,
            "hover:bg-darkMode-highlight": !isLightTheme,
          })}
        >
          <FaSearch />
        </div>
        <div
          className={clsx("cursor-pointer px-8 py-2", {
            "hover:bg-lightMode-highlight": isLightTheme,
            "hover:bg-darkMode-highlight": !isLightTheme,
          })}
        >
          <FaMessage />
        </div>
        <div
          className={clsx("cursor-pointer px-8 py-2", {
            "hover:bg-lightMode-highlight": isLightTheme,
            "hover:bg-darkMode-highlight": !isLightTheme,
          })}
        >
          <FaRegPlusSquare />
        </div>
      </div>

      <div className="flex h-2/6 flex-col items-center justify-end py-4">
        <div
          className={clsx("cursor-pointer px-8 py-2", {
            "hover:bg-lightMode-highlight": isLightTheme,
            "hover:bg-darkMode-highlight": !isLightTheme,
          })}
          onClick={() => setToggleSignOut(!toggleSignOut)}
          ref={hamburgerRef}
        >
          <GiHamburgerMenu />
        </div>
        {toggleSignOut && (
          <div
            className={clsx(
              "absolute bottom-14 left-16 z-20 h-56 w-64 rounded-xl",
              {
                "text-black": isLightTheme,
                "text-white": !isLightTheme,
              },
            )}
            ref={settingsRef}
          >
            <div
              className={clsx(
                "mb-1 flex h-2/3 flex-col items-center justify-between rounded-t-xl px-2 py-7 shadow-2xl",
                {
                  "bg-lightMode-primary": isLightTheme,
                  "bg-darkMode-highlight": !isLightTheme,
                },
              )}
            >
              <Link
                className={clsx(
                  "flex h-10 w-full cursor-pointer items-center justify-center rounded-md",
                  {
                    "hover:bg-lightMode-highlight": isLightTheme,
                    "hover:bg-darkMode-alternate": !isLightTheme,
                  },
                )}
                href="/dashboard?showDialog=y"
                onClick={() => setToggleSignOut(false)}
              >
                Account
              </Link>

              <div className="flex items-center space-x-4">
                <span>Light</span>
                <ToggleTheme />
                <span>Dark</span>
              </div>
            </div>

            <div
              className={clsx(
                "flex h-1/3 items-center justify-center rounded-b-xl p-2 shadow-2xl",
                {
                  "bg-lightMode-primary": isLightTheme,
                  "bg-darkMode-highlight": !isLightTheme,
                },
              )}
            >
              <Link
                className={clsx(
                  "flex h-10 w-full cursor-pointer items-center justify-center rounded-md",
                  {
                    "hover:bg-lightMode-highlight": isLightTheme,
                    "hover:bg-darkMode-alternate": !isLightTheme,
                  },
                )}
                href="/api/auth/signout"
                // onClick={() => void signOut()}
              >
                Log Out
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
