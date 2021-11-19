import styled from "styled-components";
import Image from "next/image";

import placeholderIMGbig from "../../public/assets/images/placeholderIMGbig.png";
import placeholderIMG from "../../public/assets/images/placeholderIMG.png";

function ProjectThumbnail({
  banner,
  tool1,
  tool2,
  tool3,
  title,
  role1,
  role2,
}) {
  return (
    <Styles className="project-container-colors">
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
          <div className="rect rect-bg">
            <Image
              src={tool1 ? tool1 : placeholderIMG}
              width={17}
              height={17}
            />
          </div>
          <div className="rect rect-bg">
            <Image
              src={tool2 ? tool2 : placeholderIMG}
              width={17}
              height={17}
            />
          </div>
          <div className="rect rect-bg">
            <Image
              src={tool3 ? tool3 : placeholderIMG}
              width={17}
              height={17}
            />
          </div>
        </div>
      </div>
    </Styles>
  );
}

const Styles = styled.div`
  width: 100%;
  margin-bottom: 50px;
  border-radius: 4px;
  padding: 16px 22px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  h5 {
    max-width: 240px;
  }
  .tags,
  .tools {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .tools {
    gap: 5px;
  }
  .tags {
    margin-top: 5px;
  }

  .roles {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    font-size: 11px;
    div {
      width: 1px;
      background-color: #fff59d;
      height: 15px;
    }
  }
  .rect {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  }
`;

export default ProjectThumbnail;
