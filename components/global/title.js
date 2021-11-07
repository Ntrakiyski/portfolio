import { motion } from "framer-motion";
import styled from "styled-components";

import { colorPurp } from "../../styles/Variables/variables.module.scss";

export const Title = ({ title }) => {
  return (
    <Styles>
      <h3>{title}</h3>
    </Styles>
  );
};

const Styles = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  h3 {
    text-decoration: underline ${colorPurp};
    text-decoration-style: solid;
  }
`;
