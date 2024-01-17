"use client";

import { useTheme } from "../context/ThemeProvider";
import { clsx } from "clsx";
import BoxOfFewFriends from "../_components/BoxOfFewFriends";
import FriendsFeed from "../_components/FriendsFeed";
// import { redirect } from "next/navigation"
import AccountModal from "../_components/AccountModal";
import { useRouter } from "next/navigation";

// import { storage } from "../../firebase/config";
// import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

export default function DashboardPage() {
  const router = useRouter();

  const { isLightTheme } = useTheme();

  function onClose() {
    router.push("/dashboard");
  }

  return (
    <div
      className={clsx("flex h-full flex-col", {
        "bg-lightMode-primary text-black": isLightTheme,
        "bg-darkMode-primary text-white": !isLightTheme,
      })}
    >
      {/* <div className="min-h-[100px] bg-500">
        <BoxOfFewFriends />
      </div> */}

      <div className="grow bg-400">
        <FriendsFeed />
      </div>
      <AccountModal onClose={onClose} />
    </div>
  );
}
