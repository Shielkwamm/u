import Head from "next/head";

const ShLayout = (props) => (
  <>
    <Head>
      <title>=== {props.title} ===</title>
      {props.style ? (
        props.style.fonts.map((font, index) => (
          <link 
            key={index}
            href={font.src}
            rel="stylesheet"
          />
        ))
      ): null}
    </Head>
    {props.children}
    {/*<Footer />*/}
    {props.style ? (
      <StyleSheet style={props.style}/>
    ): null};
  </>
);

export default ShLayout;

const StyleSheet = ({ style }) => (
  <style jsx global>{`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        color:  ${style.colors[5 % style.colors.length].hex };
        background-color: ${style.colors[4 % style.colors.length].hex};
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji",
          "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      }
      h1 {
        color: ${style.colors[0].hex};
        font-family: ${style.fonts[0].family};
      }
      h2 {
        color: ${style.colors[1].hex};
        font-family: ${style.fonts[1].family};
      }
      h3 {
        color: ${style.colors[2 % style.colors.length].hex};
      }
      a {
        color: ${style.colors[3 % style.colors.length].hex};
      }
      .container {
        margin: 0 auto;
        padding: 2rem 1.25rem;
      }
    `}</style>
)