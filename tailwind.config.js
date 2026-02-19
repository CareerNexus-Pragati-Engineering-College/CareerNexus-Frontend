/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        softHeading: "#4A4A7B",
        softPrimary: "#7A5DE3",
        softBody: "#5C5C80",
        softMuted: "#7D7D9F",
        pastelPink: '#F8E5EB',
        pastelLavender: '#E4EBFE',
      },
      backgroundImage: {
        "soft-glow": "linear-gradient(to right, #F8E5EB, #E4EBFE)",
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        poppins: ["Poppins", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
}
