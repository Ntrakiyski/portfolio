import Link from "next/link";
import { FaHamburger } from "react-icons/fa";

import React, { useState } from "react";

import styled from "styled-components";

export const Navbar = () => {
  return (
    <Styles className="hamburger-bg">
      <FaHamburger />
      
    </Styles>
  );
};

const Styles = styled.div`
  position: fixed;
  padding: 10px;
  z-index: 9999999999;
  color: #f0af5e;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  bottom: 40px;
  right: 20px;
  font-size: 32px;
  max-height: 52px;
  border-radius: 4px;
`;
