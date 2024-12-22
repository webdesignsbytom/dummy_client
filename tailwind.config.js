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
      },
      colors: {
        'main-background': '#f8fafc',
        'main-background-dark': '#11121a',
        'nav-background': '#334155',
        'alt-background': '#334155',
        'alt-colour': '#dcbc90',
        'text-colour': '#dcbc90',
        'text-colour-dark': '#e6e6ef',
        'hover-colour': '#222533',
        'hover-colour-dark': '#222533',
        'border-main': '#cbd5e1',
        'border-main-dark': '#42434a',
        'active-colour': '#42434a',
        'active-colour-dark': '#5e63ff',
        'error-red': '#dc2626',
        'success-green': '#16a34a',
        'hyperlink-blue': '#2563EB',
        'colour1': '#2563EB',
        'colour2': '#FB8500',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
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
