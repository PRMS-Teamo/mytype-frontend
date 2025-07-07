module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#5932EA",
        region: "#E5E7EB",
        purple:"#9B51E0",
        gray10:"#5D5D5D",
        gray20:"#AAA",
        gray30:"#E6E6E6",
        black: "#181D18",
      },
      textColor: {
        main: "#5932EA",
        white: "#FFFFFF",
        gray: "#6B7280",
        dark: "#374151",

      },
      backgroundColor: {
        main: "#5932EA",
        white: "#FFFFFF",
        purple:"#9B51E0",
        purple10:"#8363EF",
        gray: "#F3F4F6",
        "gray-hover": "#E5E7EB",
      },
      fontFamily: {
        pre: ["Pretendard", "sans-serif"],
      },
    },
    fontSize: {
      xxx:"10px",
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "24px",
      "2xl": "32px",
      "3xl": "48px",
      "4xl": "64px",
      "5xl": "80px",
      "6xl": "96px",
      "7xl": "112px",
      "8xl": "128px",
      "9xl": "144px",
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0', transform: 'translateY(20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
    animation: {
      fadeIn: 'fadeIn 0.5s ease-out forwards',
    },
  
  },
  plugins: [],
};