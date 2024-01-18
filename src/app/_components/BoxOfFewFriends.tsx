"use client";
import { api } from "~/trpc/react";

// import LoadingSpinner from "./LoadingSpinner";

export default function BoxOfFewFriends() {
  // const { data: friendImages } = api.friends.getFriendsProfileImages.useQuery();
  // console.log(friendImages);
  return (
    <div className="flex items-center justify-center">
      {/* <LoadingSpinner height={8} width={8} /> */}
    </div>
  );
}
