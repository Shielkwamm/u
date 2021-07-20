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
 
  return (
    <Layout>
      <main>
      <Home/>
      </main>
      <style jsx>{`
        main {
          
        }
      `}</style>
    </Layout>
  );
};

export default HomePage;