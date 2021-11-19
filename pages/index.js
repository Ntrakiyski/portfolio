import React, { useState } from "react";
import Head from "next/head";
import { Hero } from "../components/sections/Hero";
import { GoodAt } from "../components/sections/GoodAt";
import { Footer } from "../components/global/footer";

// import Projects from "../components/sections/Projects";
import { Navbar } from "../components/global/navbar";
const HamburgerContent = dynamic(() =>
  import("../components/global/hamburger")
);

import dynamic from "next/dynamic";
const Projects = dynamic(() => import("../components/sections/Projects"));
import useInView from "react-cool-inview";

export default function Home() {
  const [isOpen, setOpen] = useState(false);
  const [lightMode, setLightMode] = useState(false);

  const [showProjects, setProjects] = useState(false);

  function HamburgerClicked() {
    setOpen(!isOpen);
    if (isOpen) {
      document.body.style.overflow = "scroll";
    } else document.body.style.overflow = "hidden";
  }

  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(),
  });
  return (
    <div className={!lightMode ? "dark-mode" : "light-mode"}>
      <Head>
        <title>Trakiyski`s Portfolio, </title>
        <meta
          name="description"
          content="Nikolay Trakiyski`s personal website"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav onClick={HamburgerClicked}>
        <Navbar />
      </nav>

      {isOpen && (
        <HamburgerContent
          setOpen={setOpen}
          setLightMode={setLightMode}
          lightMode={lightMode}
        />
      )}

      {/* Main content */}
      <main>
        <Hero />

        <div className="projects" ref={observe}></div>
        <GoodAt />

        {inView && <Projects />}
      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
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
