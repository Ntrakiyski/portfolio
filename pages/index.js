import Head from "next/head";
import { Hero } from "../components/sections/Hero";
import { GoodAt } from "../components/sections/GoodAt";
import  {Footer}  from "../components/global/footer";

import Projects from "../components/sections/Projects";

import { Navbar } from "../components/global/navbar";

export default function Home() {
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

        <Projects />
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
