import styled from "styled-components";
import {
  colorLightYellow,
  colorOrange,
  colorBlue,
  colorGrey,
} from "../../styles/Variables/variables.module.scss";

import { Bullet } from "../home-page/bullet";
import { Title } from "../global/title";

import figma from "../../public/assets/images/figma.png";
import analytics from "../../public/assets/images/analytics.png";
import jira from "../../public/assets/images/jira.png";
import miro from "../../public/assets/images/miro.png";
import react from "../../public/assets/images/react.png";
import framer from "../../public/assets/images/framer.png";

import Image from "next/image";

import present from "../../public/assets/images/present.png";
import brain from "../../public/assets/images/brain.png";
import code from "../../public/assets/images/code.png";
import arrow from "../../public/assets/images/arrow.png";

export const GoodAt = () => {
  return (
    <Styles>
      <Title title={"What am I good at?"} />
      <div className="skills">
        <Bullet
          colorSRC={colorLightYellow}
          imgSRC={present}
          bulletContent={"Manage teams to a successfully usable product"}
        />
        <Bullet
          colorSRC={colorOrange}
          imgSRC={brain}
          bulletContent={
            "Create design using Figma for Landing pages and SaaS "
          }
        />
        <Bullet
          colorSRC={colorBlue}
          imgSRC={code}
          bulletContent={"Create web applications using Next and React"}
        />
      </div>
      <div className="centerDiv">
        <div className="toProjects">
          <span>To projects</span>
          <div className="arrows">
            <Image src={arrow} width={18} height={11} />
            <Image src={arrow} width={18} height={11} />
            <Image src={arrow} width={18} height={11} />
          </div>
        </div>
      </div>
    </Styles>
  );
};

const Styles = styled.div`
  height: calc(100vh - 20px);
  margin-top: 20px;

  .skills {
    margin-top: 20px;
  }
  .centerDiv {
    display: flex;
    justify-content: center;
  }
  .toProjects {
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    color: ${colorGrey};
    max-width: 70px;
    .arrows {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      max-width: 18px;
    }
  }
`;
