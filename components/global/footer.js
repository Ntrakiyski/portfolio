import styled from "styled-components";
import ReactStars from "react-stars";

import Link from "next/link";

export const Footer = () => {
  const ratingChanged = (newRating) => {
    //Create a function to store the rated website
  };
  return (
    <Styles>
      <div className="row1">
        <div className="nav">
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a>About me</a>
              </Link>
            </li>
            <li>
              <Link href="/services">
                <a>Services</a>
              </Link>
            </li>
            <li>
              <Link href="/contacts">
                <a>Contacts</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col2">
          <div className="rate">
            Rate your experience
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={28}
              color2={"#fff59d"}
            />
          </div>
          <button>Anonymous feedback</button>
        </div>
      </div>
      <p>
        {" "}
        📧 You can contact me directly through <span id="email">
          my email
        </span>{" "}
        or text me in <span id="in">LinkedIn</span>
      </p>
    </Styles>
  );
};

const Styles = styled.div`
  background-color: #020c11;
  padding: 40px 18px 70px 18px;
  color: white;

  .row1 {
    display: flex;
    justify-content: space-between;
  }
  li {
    list-style-type: none;
    transition: all 0.5s linear;
    font-size: 16px;
    margin-bottom: 10px;
    margin-right: 20px;
    color: #9e9e9e;

    :hover {
      color: #4da384;
    }
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  .col2 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  button {
    padding: 10px 12px;
    background: #4da384;
    color: white;
    border-radius: 4px;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s linear;
    outline: none;
    border: none;
    :hover {
      background-color: #428f73;
    }
  }
  svg {
    color: #9b9563;
    transition: all 0.3s linear;
    :hover {
      color: #fff59d;
    }
  }
  p {
    margin-top: 40px;
    text-align: center;
    #email {
      color: #4da384;
      font-weight: 500;
      cursor: pointer;
    }
    #in {
      color: #0e76a8;
      font-weight: 500;
      cursor: pointer;
    }
  }
`;
