import { motion } from "framer-motion";
import styled from "styled-components";
import Image from "next/image";

import placeholderIMG from "../../public/assets/images/placeholderIMG.png";

export const Bullet = ({ imgSRC, bulletContent, colorSRC }) => {
  return (
    <Styles>
      <Image src={imgSRC ? imgSRC : placeholderIMG} width={50} height={50} />
      <h2 style={{ color: colorSRC ? colorSRC : "white" }}>{bulletContent}</h2>
    </Styles>
  );
};

const Styles = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 90px;
  h2 {
    margin-left: 10px;
  }
`;
