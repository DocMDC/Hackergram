"use client"
import { useSearchParams } from 'next/navigation'
import { useRef, useEffect } from 'react'
import { AiFillCloseCircle } from "react-icons/ai";
import Image from 'next/image';
import { useSession } from 'next-auth/react'

type Props = {
    onClose: () => void,
}

export default function AccountModal({ onClose }: Props) {

    const searchParams = useSearchParams()

    const dialogRef = useRef<null | HTMLDialogElement>(null)
    const showDialog = searchParams.get('showDialog')
    const { data: session } = useSession();

    useEffect(() => {
        if (showDialog === 'y') {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
    }, [showDialog])

    const closeModal = () => {
        dialogRef.current?.close()
        onClose()
    }

    async function updateImage() {
      console.log('updating')
    }

    const dialog: JSX.Element | null = showDialog === 'y'
        ? (
            <dialog 
                ref={dialogRef} 
                className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10  rounded-xl backdrop:bg-gray-500/50">

                <div className="w-[325px] h-[500px] flex flex-col relative px-5">
                    <AiFillCloseCircle 
                      onClick={closeModal}
                      className="cursor-pointer rounded border-none w-8 h-8 font-bold absolute top-0 right-0 mt-2 mr-2 hover:text-gray-600"
                    />

                    <div className="flex flex-col justify-between pt-8 ">
                        <h1 className="text-3xl mb-3">Account</h1>
                        <h2 className="text-gray-500 mb-9 text-sm">Manage your account settings</h2>
                    </div>

                    <div className="pb-3 mb-3">
                      <h2 className="border-b border-gray-200 pb-2">Profile</h2>
                      <div className="flex items-center mt-4">
                        <Image
                          src={session?.user?.image as string}
                          alt="profile image"
                          width={50}
                          height={50}
                          className="rounded-full mr-10"
                          onClick={updateImage}
                        />
                      </div>
                    </div>

                    <div className="pb-3 mb-3">
                      <h2 className="border-b border-gray-200 pb-2">Username</h2>
                      <h3 className="mt-4 text-sm text-gray-500">{session?.user?.name}</h3>
                    </div>

                    <div>
                      <h2 className="border-b border-gray-200 pb-2">Email address</h2>
                      <h3 className="mt-4 text-sm text-gray-500">{session?.user?.email}</h3>
                    </div>
                </div>
            </dialog>
        ) : null


    return dialog
}