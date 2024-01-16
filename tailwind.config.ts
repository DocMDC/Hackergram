import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        100: "white",
        200: "#f8f9fc", //light gray
        300: "#dce2f5", //light background gray
        400: "#636b7f", //text gray
        500: "#6d47ff", //purple
        600: "#0a0d3f", //dark blue 1
        700: "#0c0129", //dark blue 2
        hoverPrimary: "#492fb5",
        blueText: "#0395f6",
        lightMode: {
          primary: "white",
          highlight: "#f2f2f2",
          secondary: "#f8f9fc",
        },
        darkMode: {
          primary: "black",
          highlight: "#1a1a1a",
          secondary: "#3c3c3c",
          alternate: "#262626",
        },
      },
    },
    keyframes: {
      shimmer: {
        "100%": {
          transform: "translateX(100%)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

//light black #3c3c3c
//highlight black #1a1a1a
//medium black #262626
//black #000000
