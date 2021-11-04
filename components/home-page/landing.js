import { Paragraph } from "./paragraph";

import { Bullet } from "./bullet";
import { Buttons } from "./buttons";

import figma from "../../public/assets/images/figma.png";
import next from "../../public/assets/images/next.png";
import brain from "../../public/assets/images/brain.png";
import laptop from "../../public/assets/images/laptop.png";

export const Landing = () => {
  return (
    <div className="p-5 h-screen flex flex-col ">
      <div className="container mt-8 w-[85%]">
        <span className="text-3xl ">👋Hi!</span>
        <h1 className="text-5xl text-whitefont mt-4">I am Nik</h1>
        <div className="sequal mt-8 mb-2 ">
          <Paragraph
            delayDuration="1"
            paragraphContent={
              "🗣 Product owner and 🕵️ Scrum master leading and improving Scrum teams "
            }
          />
          <Paragraph
            delayDuration="1.7"
            paragraphContent={"Finished more than 5 real life projects as:"}
          />
        </div>
        {/* <Bullet
          bulletContent={"UI/UX Designer using"}
          additClass="text-orange "
          imgSrc={figma}
        />
        <Bullet
          bulletContent={"Frontend developer using"}
          additClass="text-blue mr-4"
          imgSrc={next}
        /> */}
        <Bullet
          bulletContent={"UI/UX Designer using Figma"}
          additClass="text-orange"
          imgSrc={brain}
        />
        <Bullet
          bulletContent={"Frontend developer using"}
          additClass="text-blue"
          imgSrc={laptop}
        />
      </div>
      <Buttons />
    </div>
  );
};
