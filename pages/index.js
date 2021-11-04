import Head from "next/head";
import { Landing } from "../components/home-page/landing";

import useInView from "react-cool-inview";
import dynamic from "next/dynamic";
const Projects = dynamic(() => import("../components/home-page/projects"));

import { Cursor } from "../components/global/cursor";
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
        <title>Trakiyski`s Portfolio</title>
        <meta
          name="description"
          content="Nikolay Trakiyski`s personal website"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Cursor />
        <Landing />
        {/* <div ref={observe}>{inView && <Projects />}</div> */}
      </main>

      <footer></footer>
    </div>
  );
}

// import axios from "axios";

// //create component with pre-generated data from the function below
// function Component({ data }) {
//   return <></>;
// }

// //get the data from the api
// export async function getStaticProps() {
//   const { data } = await axios.get("http://localhost:3000/api/projects");

//   return {
//     props: {
//       data: data || {},
//     },

//     revalidate: 1,
//   };
// }
