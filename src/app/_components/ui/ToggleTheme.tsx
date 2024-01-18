"use client";

import { clsx } from "clsx";
import { useTheme } from "~/app/context/ThemeProvider";

export default function ToggleTheme() {
  const { isLightTheme, setIsLightTheme } = useTheme();

  return (
    <>
      <label className="relative mx-2 inline-block h-8 w-20">
        <input
          type="checkbox"
          name="themeCheck"
          id="themeCheck"
          className="hidden"
          onChange={() => setIsLightTheme((prev) => !prev)}
        />
        <span
          className={clsx(
            "absolute bottom-0 left-0 right-0 top-0 cursor-pointer rounded-full bg-500 duration-150 before:absolute before:bottom-1 before:left-1 before:h-6 before:w-6 before:rounded-full before:bg-100 before:duration-300",
            {
              "before:translate-x-12": !isLightTheme,
              "before:translate-x": isLightTheme,
            },
          )}
        ></span>
      </label>
    </>
  );
}
