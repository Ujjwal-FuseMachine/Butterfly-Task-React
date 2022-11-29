import React, { ReactElement, ReactNode, useState } from "react";
import satisfactionService from "../../services/satisfaction.service";

import "./Header.scss";

const satisfactionResponse = {
  "VeryHappy": "Awesome! Thank you for your Feedback.",
   "Happy": "Great! Thank you for your Feedback.",
   "Neutral": "Ok... things could be better. Thank you for your Feedback.",
   "UnHappy": "Mmmmh, things should improve. Thank you for your Feedback.", 
   "VeryUnhappy": "Oops, something needs to change. Thank you for your Feedback."
 }

interface Props {
  satisfactionId?: number,
  comp: string;
  selectedValue;
  onClick: (name: string) => void;
  disabled?: boolean;
  faces: string[];
  withPadding?: boolean;
}

const Header = ({
  satisfactionId,
  onClick,
  faces,
  selectedValue,
  comp,
}: Props): ReactElement => {
  const [showPics, setShowPics] = useState(false);

  const subTitle = "Your answers will always remain anonymous";

  const [val, setVal] = useState(selectedValue);
  const [title, setTitle] = useState(satisfactionResponse[selectedValue]);

  const faceList = (): ReactElement => {
    return (
      <div className="alt-header">
        <label className="image-text">
          Did you make a mistake? Please select your correct mood:
        </label>
        <div className="image-container">
          {faces.map((value: string) => {
            return (
              <img
                key={value}
                src={`./static/${value}.svg`}
                onClick={() => {
                  setVal(value);
                  onClick(value);
                  satisfactionId ? satisfactionService.putSatisfaction(satisfactionId, { satisfaction: value }) 
                    : satisfactionService.postSatisfaction({ satisfaction: value });
                  setShowPics(false);
                  setTitle(satisfactionResponse[value])
                }}
                className="icon"
              ></img>
            );
          })}
        </div>
      </div>
    );
  };

  if (showPics) {
    return faceList();
  }

  return (
    <div className="header-container">
      <div
        className="header"
        onClick={() => {
          setShowPics(true);
        }}
      >
        <img src={"./static/" + val + ".svg"} className="icon-header" />
      </div>
      <div className="header-text">
        <div className="title">{title}</div>
        <div className="subtitle">
          <label>{subTitle}</label>
        </div>
      </div>

      <div className="company">{comp}</div>
    </div>
  );
};

export default Header;
