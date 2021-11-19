import React from "react";

import styled from "styled-components";
import Link from "next/link";

export const MenuItem = ({ page, icon, title }) => {
  return (
    <Styles>
      <Link href={page ? page : "/"}>
        <a>
          <div className="item">
            {icon}
            <h2>{title}</h2>
          </div>
        </a>
      </Link>
    </Styles>
  );
};

const Styles = styled.div`
  margin-bottom: 20px;
  a {
    text-decoration: none;
    border: none;
    color: inherit;
  }
  .item {
    padding: 10px;
    display: flex;
    justify-content: start;
    align-items: center;
    h2 {
      font-size: 32px;
      font-weight: 400;
    }
    svg {
      font-size: 26px;
      margin-right: 10px;
    }
  }
`;
