import React, { ReactElement, ReactNode } from "react";

import "./Bulletin.scss";

interface Props {
  title: string;
  titleQuestion: string;
  subtitle: string;
  onClick: (name: string) => void;
  disabled?: boolean;
  faces: string[];
  withPadding?: boolean;
}

const Bulletin = ({
  onClick,
  faces,
  title,
  titleQuestion,
  subtitle,
}: Props) => {
  const faceList = () => {
    return (
      <div>
        {faces.map((value: string) => {
          return (
            <img
              key={value}
              src={"./static/" + value + ".svg"}
              onClick={() => {
                onClick(value);
              }}
              className="icon"
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className={"bodyC"}>
      <label className="title">{title}</label>
      <h4 className="question">{titleQuestion}</h4>
      <div className={"iconContainer"}>{faceList()}</div>
      <label className="footer">{subtitle}</label>
    </div>
  );
};

export default Bulletin;
