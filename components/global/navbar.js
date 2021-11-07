import Link from "next/link";
import { FaHamburger } from "react-icons/fa";

import styled from "styled-components";

export const Navbar = () => {
  return (
    <Styles>
      <FaHamburger />
    </Styles>
  );
};

const Styles = styled.div`
  position: fixed;
  padding: 10px;
  z-index: 9999999999;
  background: linear-gradient(
    134.42deg,
    rgba(16, 36, 47, 0.38) 9.6%,
    rgba(5, 23, 33, 0.38) 96.46%
  );
  color: orange;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  bottom: 40px;
  right: 20px;
  font-size: 32px;
  max-height: 52px;
`;
