import styled from "styled-components";
import { colorGrey } from "../../styles/Variables/variables.module.scss";

import { Paragraph } from "../home-page/paragraph";

import { Buttons } from "../home-page/buttons";

export const Hero = () => {
  return (
    <Styles>
      <div className="heading">
        <span>👋Hi!</span>
        <h1>I am Nik</h1>
        <div className="sequal ">
          <Paragraph
            delayDuration="1"
            paragraphContent={
              "🗣 Product owner and 🕵️ Scrum master leading and improving Scrum teams "
            }
          />
          <Paragraph
            delayDuration="1.7"
            paragraphContent={
              "Managing teams and creating software in the SaaS and CMS industry"
            }
          />
        </div>
      </div>
      <Buttons />
    </Styles>
  );
};

const Styles = styled.div`
  height: calc(100vh - 40px - 10vh);
  margin-top: 10vh;

  .heading {
    span {
      font-size: 32px;
      color: ${colorGrey};
    }
    h1 {
      margin: 15px 0px 50px 0px;
    }
  }
`;
