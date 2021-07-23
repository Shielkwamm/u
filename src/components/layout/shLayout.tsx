import Head from "next/head";

const ShLayout = (props) => (
  <>
    <Head>
      <title>Auth</title>
    </Head>

    <main>
      <div className="container">
        {process.env.NEXT_PUBLIC_IS_USING_DEMO_DATABASE ? (
          <div>
            <p>You are using LBKE read-only demo database.</p>
            <p>
              To enable authentication features, please setup your own local
              database.
            </p>
            <p>
              See <a href="/">home README </a> for relevant instructions.
            </p>
          </div>
        ) : (
          props.children
        )}
      </div>
    </main>

    {/*<Footer />*/}

    <style jsx global>{`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        color: #333;
        background-color: ${props?.style?.backgroundColor};
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji",
          "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      }
      h1 {
        color: ${props?.style?.['1']};
      }
      h2 {
        color: ${props?.style?.['2']};
      }
      h3 {
        color: ${props?.style?.['3']};
      }
      a {
        color: ${props?.style?.['4']};
      }
      .container {
        margin: 0 auto;
        padding: 2rem 1.25rem;
      }
    `}</style>
  </>
);

export default ShLayout;
