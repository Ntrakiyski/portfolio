import { motion } from "framer-motion";
import styled from "styled-components";

import {
  colorGrey,
} from "../../styles/Variables/variables.module.scss";


export const Buttons = () => {
  return (
    <Styles className="CTA-btns">
      <span className="secndBtn">Contact with me</span>
      <div className="mainBtn">Preview projects</div>
    </Styles>
  );
};

const Styles = styled.div`
  position: absolute;
  bottom: 100px;
  left: 0;
  .secndBtn{
    cursor:pointer;
    color:${colorGrey};
  }
  .mainBtn{
    cursor:pointer;
  }
`;
