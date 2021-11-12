import styled from "styled-components";

export const Quote = ({ quoteText }) => {
  return (
    <Styles>
      <div className="line"></div>
      <span>{quoteText}</span>
    </Styles>
  );
};

const Styles = styled.div`
  margin: 50px 20px 50px 0px;
  display: flex;

  .line {
    width: 2px;
    height: inherit;
    background-color: #696969;
    margin-right: 10px;
    border-radius: 2px;
  }
  span {
    font-size: 16px;
    color: #d8d7d7;
    font-style: italic;
    font-family: "Oxygen Mono", monospace;
    width: 100%;
  }
`;
