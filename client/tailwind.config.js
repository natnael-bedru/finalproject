/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
      },
      backgroundImage: {
        "hero-pattern":
          " url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
        wellcomeimg: "url('./assets/homepage3.jpg')",
        wellcomeimg2: "url('./assets/homepage2.jpg')",
        meetimg: "url('./assets/homepage.jpg')",
        newsimg: "url('./assets/cards/news.jpg')",
        newsimg2: "url('./assets/cards/info.png')",
        newsimg3: "url('./assets/cards/info2.png')",
        newsimg4: "url('./assets/cards/info3.png')",
        newsimg5: "url('./assets/cards/info4.jpg')",
        newsimg6: "url('./assets/cards/info5.jpg')",
        newsimg7: "url('./assets/cards/info6.jpg')",
        newsimg8: "url('./assets/cards/info7.jpg')",
      },
    },
  },
  plugins: [],
};
