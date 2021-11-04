import { motion } from "framer-motion";

export const Bullet = ({ imgSrc, bulletContent, colorFont }) => {
  let addClass = `text-lg ${colorFont}`;
  return (
    <div className="flex">
      <img src={imgSrc} alt={imgSrc} />
      <p className={addClass}>{bulletContent}</p>
    </div>
  );
};
