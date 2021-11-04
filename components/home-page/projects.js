import styled from "styled-components";
import { motion } from "framer-motion";

const Projects = () => {
  return (
    <Styles initial={{ y: 300, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <div className="container">Hi doty these are my projects</div>
    </Styles>
  );
};

const Styles = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: red;
  height: 400px;
  color: green;
`;

export default Projects;
