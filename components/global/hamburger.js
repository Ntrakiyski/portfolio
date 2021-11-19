import React from "react";
import styled from "styled-components";

import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { FaHouseDamage } from "react-icons/fa";
import { FaProjectDiagram } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";

import { MenuItem } from "./menuItem";

const HamburgerContent = ({ setLightMode, lightMode, setOpen }) => {
  function OpenModal() {
    setLightMode(!lightMode);
  }

  function CloseModalFromBG(e) {
    if (e.target.classList.contains("closeHamburger")) {
      setOpen(false);
      document.body.style.overflow = "scroll";
    }
  }
  return (
    <Styles className="closeHamburger" onClick={CloseModalFromBG}>
      <div className="menus">
        <MenuItem page={"/"} icon={<FaHouseDamage />} title={"Home"} />
        <MenuItem
          page={"/projects"}
          icon={<FaProjectDiagram />}
          title={"Projects"}
        />

        <MenuItem page={"/services"} icon={<FaTasks />} title={"Services"} />
        <MenuItem page={"/about"} icon={<FaUser />} title={"About"} />
      </div>
      <div onClick={OpenModal}>
        {lightMode ? (
          <div className="moon">
            Dark mode <FaMoon />{" "}
          </div>
        ) : (
          <div className="light">
            Light mode
            <FaSun />
          </div>
        )}
      </div>
    </Styles>
  );
};

const Styles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 10000;
  color: white;
  height: 100vh;
  width: 100vw;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  .menus {
    margin-bottom: 60px;
  }
  .moon,
  .light {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    background-color: lightcoral;
    border-radius: 4px;
    min-width: 140px;
    svg {
      font-size: 20px;
      margin-left: 10px;
    }
  }
  .moon svg {
    color: blue;
  }
  .light svg {
    color: yellow;
  }
`;

export default HamburgerContent;
