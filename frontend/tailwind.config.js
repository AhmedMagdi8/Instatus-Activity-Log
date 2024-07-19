/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-a": "linear-gradient(135deg, #ffaf7b, #d76d77, #3a1c71)",
        "gradient-b": "linear-gradient(135deg, #ffaf7b, #d76d77, #ff6347)",
        "gradient-o": "linear-gradient(135deg, #ffaf7b, #d76d77, #834dff)",
      },
    },
  },
  plugins: [],
};
