import styled from "styled-components";
import Image from "next/image";

import placeholderIMGbig from "../../public/assets/images/placeholderIMGbig.png";
import placeholderIMG from "../../public/assets/images/placeholderIMG.png";

export const ProjectThumbnail = ({
  banner,
  tool1,
  tool2,
  tool3,
  title,
  role1,
  role2,
}) => {
  return (
    <Styles>
      <Image
        src={banner ? banner : placeholderIMGbig}
        width={290}
        height={140}
      ></Image>
      <h5>{title}</h5>
      <div className="tags">
        <div className="roles">
          {role1} <div></div>
          {role2}
        </div>
        <div className="tools">
          <Image src={tool1 ? tool1 : placeholderIMG} width={41} height={41} />
          <Image src={tool2 ? tool2 : placeholderIMG} width={41} height={41} />
          <Image src={tool3 ? tool3 : placeholderIMG} width={41} height={41} />
        </div>
      </div>
    </Styles>
  );
};

const Styles = styled.div`
  width: 100%;
  color: white;
  background-color: #1a2f3c;
  margin-bottom: 50px;
  border-radius: 4px;
  padding: 16px 22px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  h5 {
    max-width: 240px;
    color: white;
  }
  .tags,
  .tools {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .tags {
    margin-top: 5px;
  }

  .roles {
    display: flex;
    flex-direction: row;
    gap: 8px;
    color: #c1c1c1;
    align-items: center;
    font-size: 11px;
    div {
      width: 1px;
      background-color: #fff59d;
      height: 15px;
    }
  }
`;
