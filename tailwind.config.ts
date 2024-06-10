import type { Config } from "tailwindcss";
// const defaultTheme = require('tailwindcss/defaultTheme')


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
     "../styles/**/*.css"
  ],
  safelist: ['ProseMirror'],
  darkMode: ['class'],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens:{
        'xs': {'max': '380px'},
      },
      colors: {
        backgroundBlue: '#2065E1', // Example: Blue color for backgrounds
      },
      cursor: {
        auto: 'auto',
        default: 'default',
        pointer: 'pointer', // This line ensures the "cursor-pointer" class works
        // ... other cursor options
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        alegreya: "'Alegreya', sans-serif",
        arefRuqaa: "'Aref Ruqaa', serif" ,
        quintessential: "'Quintessential', cursive", // Adding Quintessential font
        petrona: "'Petrona', serif", 
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
export default config;
