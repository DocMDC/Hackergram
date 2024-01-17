"use client";

import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { useTheme } from "../context/ThemeProvider";
import { ProfileSkeleton } from "./ui/Skeletons";
import { api } from "~/trpc/react";

type ProfileImageProps = {
  userId: string | undefined;
};

export default function ProfileImage({ userId }: ProfileImageProps) {
  const router = useRouter();
  //   const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoadingProfileImage, setIsLoadingProfileImage] = useState(false);
  const { isLightTheme } = useTheme();

  const updateImage = api.account.updateProfileImage.useMutation();
  const { data: currentProfileImage, refetch } =
    api.account.getCurrentProfileImage.useQuery();

  //Get a reference to the user's profile image in a folder in firebase as follows: userId/profile-image/'<fileName-userId>'
  const imageRef = ref(storage, `${userId}/profile-image/${userId}`);

  //Upload profile image to firebase storage
  async function handleUpdateImage(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile || !userId) return;

    try {
      setIsLoadingProfileImage(true);

      //Upload new image to firebase storage
      const snapshot = await uploadBytes(imageRef, selectedFile);
      const url = await getDownloadURL(snapshot.ref);

      //save firebase URL to postgresql database
      await updateImage.mutateAsync({ url });
      //refetch updated profile image from database
      await refetch();
    } catch (err) {
      console.error("Error uploading image:", err);
    } finally {
      setIsLoadingProfileImage(false);
      router.refresh();
    }
  }

  return (
    <>
      <h2
        className={clsx("border-b border-gray-200 pb-2", {
          "text-gray-500": isLightTheme,
          "text-gray-200": !isLightTheme,
        })}
      >
        Profile
      </h2>
      <div className="mt-4 flex items-center">
        <div className="mr-auto max-w-36">
          {currentProfileImage ? (
            <div>
              <img
                src={currentProfileImage}
                alt="profile image"
                className="h-16 w-16 rounded-full object-cover"
              />
            </div>
          ) : (
            <ProfileSkeleton />
          )}
        </div>

        <label
          htmlFor="file-upload"
          className="flex h-8 w-36 cursor-pointer items-center justify-center rounded-md bg-blue-500 text-sm text-white hover:bg-blue-600"
        >
          {isLoadingProfileImage ? <LoadingSpinner size={6} /> : "Change photo"}
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={(e) => handleUpdateImage(e)}
          className="hidden"
        />
      </div>
    </>
  );
}
