/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        Dark: "#212121",
        AccentPrimary: "#7842FF",
        AccentSecondary: "#FF426B",
        DarkPrimary: "#F4F4F4",
        DarkSecondary: "#DADADA",
        White: "#F9F9F9",
        LightPrimary: "#000000",
        LightSecondary: "#393E46",
        lightGreen: "#86C8BC",
      },
      boxShadow: {
        DarkNueShadow: "12px 12px 16px #191919,-12px -12px 16px #292929",
        LightNueShadow: "20px 20px 60px #e8e8e8,-20px -20px 60px #ffffff",
      },
    },
  },
  plugins: [],
};
