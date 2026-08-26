/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#FDFBF7',
          100: '#F4EBE1',
          200: '#E6D3C1',
          300: '#D5B79A',
          400: '#C29871',
          500: '#A37244',
          600: '#84542B',
          700: '#653B1A',
          800: '#46240E',
          900: '#2C1305',
          950: '#1A0902',
        },
        espresso: '#1A0B05',
        caramel: '#C67C38',
        cream: '#F7EFE5',
        latte: '#E8D5C4',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px rgba(198, 124, 56, 0.25)',
        '3d': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
