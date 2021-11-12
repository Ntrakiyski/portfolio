import styled from "styled-components";
import { motion } from "framer-motion";

import ProjectThumbnail from "../home-page/projectThumbnail";

import { Title } from "../global/title";

import figma from "../../public/assets/images/figma.png";
import analytics from "../../public/assets/images/analytics.png";
import jira from "../../public/assets/images/jira.png";
import miro from "../../public/assets/images/miro.png";
import react from "../../public/assets/images/react.png";
import framer from "../../public/assets/images/framer.png";

import telenor from "../../public/assets/images/telenor.png";
import modis from "../../public/assets/images/modis.png";
import landing from "../../public/assets/images/landing.png";
import star from "../../public/assets/images/star.png";

import { Quote } from "../home-page/quote";

import useInView from "react-cool-inview";
import dynamic from "next/dynamic";

function Projects() {
  return (
    <Styles>
      <Title title={"Projects"} />
      <div className="myProjects">
        <ProjectThumbnail
          banner={telenor}
          title={"Transformed an internal product in a SaaS"}
          role1={"PO and SM"}
          role2={"Designer"}
          tool1={jira}
          tool2={figma}
          tool3={analytics}
        />

        <Quote
          quoteText={
            "Be the one who finds the solution rather than apologising for the problem"
          }
        />

        <ProjectThumbnail
          banner={modis}
          title={"Transitioned a  product to a newly formed Scrum team"}
          role1={"PO and SM"}
          role2={"Designer"}
          tool1={jira}
          tool2={figma}
          tool3={miro}
        />

        <Quote
          quoteText={
            "It has never been a one-time transformation, but a never-ending search for a more human, more engaging way of working"
          }
        />

        <ProjectThumbnail
          banner={star}
          title={"Landing page for a Sport platform"}
          role1={"Developer"}
          role2={"Designer"}
          tool1={react}
          tool2={figma}
          tool3={framer}
        />

        <ProjectThumbnail
          banner={landing}
          title={"Landing page for a Consulting agency"}
          role1={"Product owner"}
          role2={"Designer"}
          tool1={jira}
          tool2={figma}
          tool3={miro}
        />

        <Quote
          quoteText={
            "Build your own dreams, or someone else will hire you to build theirs"
          }
        />
      </div>
    </Styles>
  );
}

const Styles = styled(motion.div)`
  margin-top: 100px;
  .myProjects {
    margin-top: 40px;
  }
`;

export default Projects;
