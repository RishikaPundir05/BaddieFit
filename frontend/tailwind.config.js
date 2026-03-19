/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        pixel:  ['"Press Start 2P"', 'monospace'],
        vt323:  ['"VT323"', 'monospace'],
      },
      colors: {
        win: {
          gray:  '#c0c0c0',
          dark:  '#808080',
          blue:  '#000080',
          light: '#ffffff',
        },
        purple: {
          deep:  '#2d0050',
          dark:  '#4a0080',
          mid:   '#6a0dad',
          base:  '#7b2cbf',
          light: '#9d4edd',
          pale:  '#c77dff',
        },
      },
    },
  },
  plugins: [],
}

