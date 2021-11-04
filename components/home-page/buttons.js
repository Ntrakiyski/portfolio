import { motion } from "framer-motion";

export const Buttons = () => {
  return (
    <div className="CTA mb-20">
      <span className="cursor-pointer hover:text-whitefont transition-all">
        Contact with me
      </span>
      <div className="mainBtn cursor-pointer hover:bg-darkgreen transition-all ">
        Preview projects
      </div>
    </div>
  );
};
