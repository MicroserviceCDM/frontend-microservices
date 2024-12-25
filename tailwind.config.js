/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs' : '350px',
      // =>
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: theme => ({
        'banner-texture': "url('https://res.cloudinary.com/droondbdu/image/upload/v1702314723/360_F_460444211_E7j3njYE705Rk1guKz9LKh58gFgiTybV_lpp3kr.jpg)",
      })
    }
  },
  plugins: [],
}
