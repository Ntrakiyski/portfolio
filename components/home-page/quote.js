import styled from "styled-components";

export const Quote = ({ quoteText }) => {
  return (
    <Styles>
      <div className="line"></div>
      <p>{quoteText}</p>
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
  p {
    font-size: 16px;
    font-style: italic;
    font-family: "Oxygen Mono", monospace;
    width: 100%;
  }
`;
