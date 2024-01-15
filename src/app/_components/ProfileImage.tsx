"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { storage } from "../../firebase/config";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { clsx } from "clsx";
import { useTheme } from "../context/ThemeProvider";

type ProfileImageProps = {
  userId: string;
};

export default function ProfileImage({ userId }: ProfileImageProps) {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoadingProfileImage, setIsLoadingProfileImage] = useState(false);
  const { isLightTheme } = useTheme();

  //Get a reference to the user's profile image in a folder in firebase as follows: userId/profile-image/'<fileName-userId>'
  const imageRef = ref(storage, `${userId}/profile-image/${userId}`);

  //Get the user's current image from firebase storage if it exists
  useEffect(() => {
    async function getCurrentImage() {
      try {
        const exisitingProfileImage = await getDownloadURL(imageRef);
        setProfileImage(exisitingProfileImage);
      } catch (err) {
        console.error("Error getting image:", err);
      }
    }

    void getCurrentImage();
  }, []);

  //Upload profile image to firebase storage
  async function handleUpdateImage(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;
    if (!userId) return;

    try {
      setIsLoadingProfileImage(true);
      //Check if old profile image exists
      const exisitingProfileImage = await getDownloadURL(imageRef);

      //Delete old image if present
      if (exisitingProfileImage) {
        await deleteObject(imageRef);
      }

      //Upload new profile image
      const snapshot = await uploadBytes(imageRef, selectedFile);
      const url = await getDownloadURL(snapshot.ref);
      setProfileImage(url);
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
          {profileImage && (
            <div>
              <img
                src={profileImage}
                alt="profile image"
                className="h-16 w-16 rounded-full object-cover"
              />
            </div>
          )}
        </div>

        <label
          htmlFor="file-upload"
          className="flex h-8 w-36 cursor-pointer items-center justify-center rounded-md bg-blue-500 text-sm text-white hover:bg-blue-600"
        >
          {isLoadingProfileImage ? (
            <LoadingSpinner height={6} width={6} />
          ) : (
            "Change photo"
          )}
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
