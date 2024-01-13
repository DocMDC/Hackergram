"use client";
import { useSearchParams } from "next/navigation";
import { useRef, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Image from "next/image";
import { useSession } from "next-auth/react";

type Props = {
  onClose: () => void;
};

export default function AccountModal({ onClose }: Props) {
  const searchParams = useSearchParams();

  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const showDialog = searchParams.get("showDialog");
  const { data: session } = useSession();

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

  async function updateImage() {
    console.log("updating");
  }

  const dialog: JSX.Element | null =
    showDialog === "y" ? (
      <dialog
        ref={dialogRef}
        className="top-50 left-50 -translate-x-50 -translate-y-50 fixed z-10  rounded-xl backdrop:bg-gray-500/50"
      >
        <div className="relative flex h-[500px] w-[325px] flex-col px-5">
          <AiFillCloseCircle
            onClick={closeModal}
            className="absolute right-0 top-0 mr-2 mt-2 h-8 w-8 cursor-pointer rounded border-none font-bold hover:text-gray-600"
          />

          <div className="flex flex-col justify-between pt-8 ">
            <h1 className="mb-3 text-3xl">Account</h1>
            <h2 className="mb-9 text-sm text-gray-500">
              Manage your account settings
            </h2>
          </div>

          <div className="mb-3 pb-3">
            <h2 className="border-b border-gray-200 pb-2">Profile</h2>
            <div className="mt-4 flex items-center">
              <Image
                src={session?.user?.image!}
                alt="profile image"
                width={50}
                height={50}
                className="mr-10 rounded-full"
                onClick={updateImage}
              />
            </div>
          </div>

          <div className="mb-3 pb-3">
            <h2 className="border-b border-gray-200 pb-2">Username</h2>
            <h3 className="mt-4 text-sm text-gray-500">
              {session?.user?.name}
            </h3>
          </div>

          <div>
            <h2 className="border-b border-gray-200 pb-2">Email address</h2>
            <h3 className="mt-4 text-sm text-gray-500">
              {session?.user?.email}
            </h3>
          </div>
        </div>
      </dialog>
    ) : null;

  return dialog;
}
