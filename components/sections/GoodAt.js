import styled from "styled-components";
import {
  colorLightYellow,
  colorOrange,
  colorBlue,
  colorGrey,
  colorDarkerYellow,
} from "../../styles/Variables/variables.module.scss";

import { Bullet } from "../home-page/bullet";
import { Title } from "../global/title";

import present from "../../public/assets/images/present.png";
import brain from "../../public/assets/images/brain.png";
import code from "../../public/assets/images/code.png";

export const GoodAt = () => {
  return (
    <Styles>
      <Title title={"What am I good at?"} />
      <div className="skills">
        <Bullet
          colorSRC={colorDarkerYellow}
          imgSRC={present}
          bulletContent={"Manage teams to a successfully usable product"}
        />
        <Bullet
          colorSRC={colorOrange}
          imgSRC={brain}
          bulletContent={"Create design using Figma for Landing pages and SaaS"}
        />
        <Bullet
          colorSRC={colorBlue}
          imgSRC={code}
          bulletContent={"Create web applications using Next and React"}
        />
      </div>
    </Styles>
  );
};

const Styles = styled.div`
  margin-top: 20px;

  .skills {
  }
`;
