import { Paragraph } from "./paragraph";

import { Bullet } from "./bullet";
import { Buttons } from "./buttons";

export const Landing = () => {
  return (
    <div className="p-5 h-screen flex flex-col justify-between ">
      <div className="container mt-8">
        <span className="text-3xl ">👋Hi!</span>
        <h1 className="text-5xl text-whitefont mt-4">I am Nik</h1>
        <div className="sequal mt-8 mb-8 ">
          <Paragraph
            delayDuration="1"
            paragraphContent={
              "🗣 Product owner and 🕵️ Scrum master leading and improving Scrum teams "
            }
          />
          <Paragraph
            delayDuration="1.7"
            paragraphContent={"Finished more than 5 real life projects as a: "}
          />
        </div>
        <Bullet
          bulletContent={"UI/UX Designer using Figma"}
          colorFont="text-orange"
        />
        <Bullet
          bulletContent={"Frontend developer using Next"}
          colorFont="text-blue"
        />
      </div>
      <Buttons />
    </div>
  );
};
