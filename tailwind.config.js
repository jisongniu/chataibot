module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'apple-blue': '#007AFF',
        'apple-gray': '#F5F5F7',
      },
      fontFamily: {
        sans: ['SF Pro Text', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}