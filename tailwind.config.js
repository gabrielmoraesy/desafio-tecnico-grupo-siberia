/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-be-vietnam-pro)', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#00218F',
        secondary: '#2ad2c9',
        background: '#F5F7FD',
        accent: '#F6F7FB',
        dark: '#1B1D28', 
        gray: {
          50: '#F5F7FD',
          100: '#f6f7fb',
          200: '#e5e7eb',
          400: '#9ca3af',
          500: '#6b7280',
          700: '#374151',
          900: '#111827',
        },
      },
      borderRadius: {
        xl: '18px',
      },
    },
  },
  plugins: [],
}; 