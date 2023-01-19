/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        ...require("daisyui/src/colors/themes")["[data-theme=light]"],
        primary: "#95a43c",
        secondary: "#e16120" 
      }
      }
    ],
  }
};
