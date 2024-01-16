"use client";
import { useSearchParams } from "next/navigation";
import { useRef, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSession } from "next-auth/react";
//calling api from react is very different from calling it from server. React is the api on the frontend. Server is the api on the backend.
// import { api } from "~/trpc/react";
// import { useRouter } from "next/navigation";
import ProfileImage from "./ProfileImage";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { useTheme } from "../context/ThemeProvider";

type Props = {
  onClose: () => void;
};

export default function AccountModal({ onClose }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLightTheme } = useTheme();

  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const showDialog = searchParams.get("showDialog");
  const { data: session } = useSession();

  // Redirect to home page if there is no session
  // useEffect(() => {
  //   if (!session) {
  //     router.push("/");
  //   }
  // }, [session, router]);

  useEffect(() => {
    if (showDialog === "y") {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const closeModal = () => {
    dialogRef.current?.close();
    onClose();
  };

  const dialog: JSX.Element | null =
    showDialog === "y" ? (
      <dialog
        ref={dialogRef}
        className="top-50 left-50 -translate-x-50 -translate-y-50 fixed z-10  rounded-xl backdrop:bg-gray-500/50"
      >
        <div
          className={clsx("relative flex h-[500px] w-[325px] flex-col px-5", {
            "bg-100": isLightTheme,
            "bg-darkMode-secondary": !isLightTheme,
          })}
        >
          <AiFillCloseCircle
            onClick={closeModal}
            className={clsx(
              "absolute right-0 top-0 mr-2 mt-2 h-8 w-8 cursor-pointer rounded border-none font-bold",
              {
                "hover:text-gray-600": isLightTheme,
                "text-darkMode-primary hover:text-gray-500": !isLightTheme,
              },
            )}
          />

          <div className="flex flex-col justify-between pt-8">
            <h1
              className={clsx("mb-3 text-3xl", {
                "text-black": isLightTheme,
                "text-white": !isLightTheme,
              })}
            >
              Account
            </h1>
            <h2
              className={clsx("mb-9 text-sm", {
                "text-gray-500": isLightTheme,
                "text-gray-200": !isLightTheme,
              })}
            >
              Manage your account settings
            </h2>
          </div>

          <div className="mb-3 pb-3">
            <ProfileImage userId={session?.user.id} />
          </div>

          <div className="mb-3 pb-3">
            <h2
              className={clsx("border-b border-gray-200 pb-2", {
                "text-gray-500": isLightTheme,
                "text-gray-200": !isLightTheme,
              })}
            >
              Username
            </h2>
            <h3
              className={clsx("mt-4 text-sm", {
                "text-gray-500": isLightTheme,
                "text-gray-400": !isLightTheme,
              })}
            >
              {session?.user.name}
            </h3>
          </div>

          <div>
            <h2
              className={clsx("border-b border-gray-200 pb-2", {
                "text-gray-500": isLightTheme,
                "text-gray-200": !isLightTheme,
              })}
            >
              Email address
            </h2>
            <h3
              className={clsx("mt-4 text-sm", {
                "text-gray-500": isLightTheme,
                "text-gray-400": !isLightTheme,
              })}
            >
              {session?.user.email}
            </h3>
          </div>
        </div>
      </dialog>
    ) : null;

  return <>{session && <>{dialog}</>}</>;
}
