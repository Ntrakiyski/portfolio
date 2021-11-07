import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

export const Paragraph = ({ delayDuration, paragraphContent }) => {
  return (
    <Styles>
      <h5
        initial={{ y: 60, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            delay: delayDuration,
          },
        }}
      >
        {paragraphContent}
      </h5>
    </Styles>
  );
};
const Styles = styled.div`
  margin-bottom: 30px;

`;
