import Head from "next/head";
import { Hero } from "../components/sections/Hero";
import { GoodAt } from "../components/sections/GoodAt";

import useInView from "react-cool-inview";
import dynamic from "next/dynamic";
const Projects = dynamic(() => import("../components/home-page/projects"));

import { Navbar } from "../components/global/navbar";

export default function Home() {
  //watching if the section is in view
  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => {
      unobserve();
    },
  });

  return (
    <div className="bg-background text-greyfont">
      <Head>
        <title>Trakiyski`s Portfolio, </title>
        <meta
          name="description"
          content="Nikolay Trakiyski`s personal website"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav>
        <Navbar />
      </nav>

      {/* Main content */}
      <main>
        <Hero />

        <GoodAt />
        {/* <div ref={observe}>{inView && <Projects />}</div> */}
      </main>

      {/* Footer */}
      <footer></footer>
    </div>
  );
}

// //get the data from the api
// export async function getStaticProps() {
//   const { data } = await axios.get("http://localhost:3000/api/homepage");

//   return {
//     props: {
//       data: data || {},
//     },

//     revalidate: 1,
//   };
// }
