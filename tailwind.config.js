/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: 'var(--background-primary)',
          secondry: 'var(--background-secondry)',
          codeblock: 'var(--background-codeblock)',
          code: 'var(--background-code)',
          th: 'var(--background-th)',
          hover: 'var(--background-hover)',
          highlight: 'var(--background-highlight)',
        },
        foreground: {
          primary: 'var(--foreground-primary)',
          secondry: 'var(--foreground-secondry)',
        },
        border: {
          primary: 'var(--border-primary)',
        },
      },
      boxShadow: {
        codeblock: 'var(--shadow-default) 0px 3px 6px 0px !important',
      },
      outlineColor: {
        primary: 'var(--outline-primary)',
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    },
  ],
};
