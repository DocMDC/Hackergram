'use client'
import {useState, useRef} from "react"
import { FaKeyboard } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { FaRegPlusSquare } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import useClickOutNav from "../hooks/useClickOutNav";
import { useTheme } from "../context/ThemeProvider";
import { clsx } from "clsx"

export default function DashboardNav() {
    const [toggleSignOut, setToggleSignOut] = useState(false)
    const hamburgerRef = useRef(null)
    const settingsRef = useRef(null)
    const { isLightTheme, setIsLightTheme } = useTheme()

    useClickOutNav(hamburgerRef, settingsRef, () => {
        setToggleSignOut(false)
    })

  return (
    <div className={clsx("flex flex-col items-center h-full overflow-y-scroll min-h-[500px]", {
        "bg-lightMode-primary text-black": isLightTheme,
        "bg-darkMode-primary text-100": !isLightTheme
    })}>
      
        <div className="py-4 h-1/6">
            <div className={clsx("px-8 py-2 cursor-pointer", {
                "hover:bg-lightMode-highlight": isLightTheme,
                "hover:bg-darkMode-highlight": !isLightTheme
            })}>
                <FaKeyboard/>
            </div>
        </div>

        <div className="flex flex-col items-center h-3/6 justify-between py-4 min-h-[300px]">
        <div className={clsx("px-8 py-2 cursor-pointer", {
                "hover:bg-lightMode-highlight": isLightTheme,
                "hover:bg-darkMode-highlight": !isLightTheme
            })}>
                <FaHome/>
            </div>
            <div className={clsx("px-8 py-2 cursor-pointer", {
                "hover:bg-lightMode-highlight": isLightTheme,
                "hover:bg-darkMode-highlight": !isLightTheme
            })}>
                <FaSearch />
            </div>
            <div className={clsx("px-8 py-2 cursor-pointer", {
                "hover:bg-lightMode-highlight": isLightTheme,
                "hover:bg-darkMode-highlight": !isLightTheme
            })}>
                <FaMessage/>
            </div>
            <div className={clsx("px-8 py-2 cursor-pointer", {
                "hover:bg-lightMode-highlight": isLightTheme,
                "hover:bg-darkMode-highlight": !isLightTheme
            })}>
                <FaRegPlusSquare/>
            </div>
        </div>

        <div className="h-2/6 flex flex-col items-center justify-end py-4">
            <div 
                className={clsx("px-8 py-2 cursor-pointer", {
                    "hover:bg-lightMode-highlight": isLightTheme,
                    "hover:bg-darkMode-highlight": !isLightTheme
                })}
                onClick={() => setToggleSignOut(!toggleSignOut)}
                ref={hamburgerRef}
            >
                <GiHamburgerMenu/>
            </div>
            {
            toggleSignOut &&
            <div 
                className={clsx("h-56 w-64 absolute left-16 bottom-14 rounded-xl z-20", {
                    "text-black": isLightTheme,
                    "text-white": !isLightTheme
                })} 
                ref={settingsRef}
            >
                <div className={clsx("h-2/3 mb-1 shadow-2xl rounded-t-xl px-2 py-7 flex flex-col items-center justify-between", {
                    "bg-lightMode-primary": isLightTheme,
                    "bg-darkMode-highlight": !isLightTheme
                })}>
                    <Link 
                        className={clsx("w-full flex items-center justify-center cursor-pointer rounded-md h-10", {
                        "hover:bg-lightMode-highlight": isLightTheme,
                        "hover:bg-darkMode-alternate": !isLightTheme
                    })}
                        href="/dashboard?showDialog=y"
                        onClick={() => setToggleSignOut(false)} 
                    >
                        Account
                    </Link>
                    
                    

                    <div 
                        className={clsx("w-full flex items-center justify-center cursor-pointer rounded-md h-10", {
                        "hover:bg-lightMode-highlight": isLightTheme,
                        "hover:bg-darkMode-alternate": !isLightTheme
                    })}
                        onClick={() => setIsLightTheme(prev => !prev)}
                    >
                        {isLightTheme ? "Enable Dark Mode" : "Disable Dark Mode"}
                    </div>
                </div>

                <div className={clsx("h-1/3 shadow-2xl rounded-b-xl p-2 flex items-center justify-center", {
                     "bg-lightMode-primary": isLightTheme,
                     "bg-darkMode-highlight": !isLightTheme
                })}>
                    <Link 
                        href={"/api/auth/signout"}
                        className={clsx("w-full flex items-center justify-center cursor-pointer rounded-md h-10", {
                            "hover:bg-lightMode-highlight": isLightTheme,
                            "hover:bg-darkMode-alternate": !isLightTheme
                        })}
                    >
                        Sign out
                    </Link>
                </div>
            </div>
            }
        </div>

    </div>
  )
}
