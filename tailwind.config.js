module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      height: {
        '164': '164px',
        '106':'106px',
        '350': '350px',
      },
      width: {
        '133':'133px',
        '84':'84px',
        '283':'283px'
      },
      minWidth: {
        '209':'209px',
      },
      spacing: {
        '7': '7.5px',
        '5': '5px',
        '133':'133px',
      },
      colors: {
        'customGray':'#BCC4CC'
      },
      fontSize: { 
        '10' : '10px'
      },
    },
  },
  plugins: [],
}