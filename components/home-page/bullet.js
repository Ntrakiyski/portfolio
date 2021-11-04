import { motion } from "framer-motion";
import Image from "next/image";

export const Bullet = ({ imgSrc, bulletContent, additClass }) => {
  let addClass = `text-lg ${additClass} ml-3`;
  return (
    <div className="flex items-center">
      <Image src={imgSrc} width={22} height={22} placeholder="blur" />
      <p className={addClass}>{bulletContent}</p>
    </div>
  );
};
