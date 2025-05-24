module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        main: "#5932EA",
      },
      colors: {
        region: "#E5E7EB",
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "24px",
        "2xl": "32px",
      },
      fontFamily: {
        pre: ["Pretendard", "sans-serif"],
      },
    },
  },
  plugins: [],
};