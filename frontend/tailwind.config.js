export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050507",
        glass: "rgba(255,255,255,0.06)",
        accent: "#8b5cf6",
      },
      boxShadow: {
        glow: "0 0 30px rgba(139,92,246,0.35)",
      },
      backdropBlur: {
        xl: "20px",
      },
    },
  },
  plugins: [],
};
