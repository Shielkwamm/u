import Home from "~/components/home";
//import { useForm } from "react-hook-form";
import Layout from "~/components/organization/layout";
import path from "path";
import { promises as fsPromises } from "fs";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import { muiMdComponents } from "~/components/layout/muiMdComponents";
import { useSpring, animated, config } from 'react-spring'

// inject both the custom components + default components like h1, p, etc.
const components = { ...muiMdComponents };
const HomePage = ({ source }) => {
  const randomDuration1 = Math.floor(Math.random() * 500) + 1000;
  const randomDuration2 = Math.floor(Math.random() * 500) + 1000;
  const randomDuration3 = Math.floor(Math.random() * 500) + 1000;
  const scaleX = useSpring({
    loop: true,
    to: [
      { scaleX: 0.95 },
      { scaleX: 1 },
    ],
    from: { scaleX: 1 },
    config: { 
      duration: randomDuration1,
      mass: 17,
      tension: 234,
      velocity: -1
    },
  })
  const skewX1 = useSpring({
    loop: true,
    to: [
      { skewX: 20 },
      { skewX: 0.5 },
    ],
    from: { skewX: 0.5 },
    config: { duration: randomDuration2 },
  })
  const skewX2 = useSpring({
    loop: true,
    to: [
      { skewX: 20 },
      { skewX: 0.5 },
    ],
    from: { skewX: 0.5 },
    config: { duration: randomDuration3 },
  })
  return (
    <Layout>
      <main>
      <animated.div style={scaleX}> 
        <h2> <a href="/u">⒰</a></h2>
      </animated.div>
      <animated.div style={skewX1}>
        <h2><a href="/organizations">organizations</a> </h2>
      </animated.div>
      <h2><a href="/products"><animated.div style={skewX2}>products</animated.div></a></h2>
      </main>
      <style jsx>{`
        main {
          
        }
      `}</style>
    </Layout>
  );
};

export default HomePage;