/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'bg': "url('../assets')",
      },
      boxShadow: {
        input: 'inset 1px 1px 6px 1px #00000014'
      },
      colors: {
        'main-background': '#f8fafc',
        'nav-background': '#334155',
        'alt-background': '#334155',
        'alt-colour': '#dcbc90',
        'border-main': '#cbd5e1',
        'error-red': '#dc2626',
        'success-green': '#16a34a',
        'hyperlink-blue': '#2563EB',
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
      zIndex: {
        max: '999'
      }
    },
  },
  plugins: [],
};
