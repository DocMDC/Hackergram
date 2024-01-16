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
