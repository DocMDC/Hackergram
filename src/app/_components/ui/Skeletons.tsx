import { MdAccountCircle } from "react-icons/md";
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function ProfileSkeleton() {
  return (
    <div
      className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-gray-400`}
    >
      <MdAccountCircle className="h-3/4 w-3/4 text-white" />
    </div>
  );
}

// export function AccountSkeleton() {
//   console.log("loading account skeleton");
//   return (
//     <div className="top-50 left-50 -translate-x-50 -translate-y-50 fixed z-10  rounded-xl backdrop:bg-gray-500/50">
//       <div className="relative flex h-[500px] w-[325px] flex-col bg-red-200 px-5"></div>
//     </div>
//   );
// }
