/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'bg': "url('../assets')",
      },
      boxShadow: {
        input: 'inset 1px 1px 6px 1px #00000014',
        cardShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        cardShadowBold: 'rgba(0, 0, 0, 0.34) 5px 4px 16px',
      },
      colors: {
        'colour1': '#ffffff',
        'colour2': '#000000',
        'colour3': '#fdf7f6',
        'colour4': '#faebe7',
        'colour5': '#3b82f6',
        'colour6': '#f2ab9b',
        'colour7': '#374151', // Dark text
        'colour8': '#4b5563', // Light Text
        'colour9': '#d1d5db', // Input bg
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        titleFont: ['Poppins'],
        fancyFont: ['Poppins'],
      },
      fontSize: {
        'xxs': '0.6rem',
      },
      gridTemplateRows: {
        reg: 'auto 1fr',
        rev: '1fr auto',
        a1a: 'auto 1fr auto',
      },
      gridTemplateColumns: {
        reg: 'auto 1fr',
        rev: '1fr auto',
        a1a: 'auto 1fr auto',
      },
      screens: {
        xxs: '390px',
        xs: '422px',
      },
      zIndex: {
        '100': '100',
        max: '999'
      }
    },
  },
  plugins: [],
};
