import React, { ReactElement, startTransition } from "react";
import Footer from "../../components/footer/footer";
import "./Final.scss";
import { useLocation } from "react-router-dom";

const Final = (): ReactElement => {
  const location = useLocation();
  const satisfaction = location.state.satisfaction;
  return (
    <div>
      <div className={"final-container"}>
        <img src={`./static/${satisfaction}.svg`} className="image-style" />
        <label>Thank You</label>
        <label>Your feedback has been sent.</label>
      </div>
      <Footer />
    </div>
  );
};

export default Final;
