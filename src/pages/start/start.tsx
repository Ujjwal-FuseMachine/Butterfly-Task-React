import React, { ReactElement, useCallback, useEffect, useState } from "react";
import Bulletin from "../../components/bulletin/bulletin";
import satisfactionService from "../../services/satisfaction.service";
import { useNavigate } from "react-router-dom";
import "./Start.css";

interface Props {
  companyMoto: string;
  companyDetail: string;
}

const Startpage = ({
  companyMoto, 
  companyDetail
}): ReactElement => {
  
  const navigate = useNavigate();
  const faces = ["VeryHappy", "Happy", "Neutral", "UnHappy", "VeryUnhappy"];

  const [currentMood, setCurrentMood] = useState("");
 
  return (
    <div className="container">
      <div className="header">
        <img src={"./static/Butterfly.svg"} className="headerImg" />
        <label className="headerLabel">{companyMoto}</label>
      </div>
      <Bulletin
        title={companyDetail}
        titleQuestion="How is your week going?"
        subtitle="Your answer will always remain anonymous"
        onClick={async (name: string) => {
          setCurrentMood(name);
          const respone: any = await satisfactionService.postSatisfaction({ satisfaction: name });
    
          navigate(`/list`, {
            state: {
              satisfaction: name,
              satisfactionId: respone.data.id
            }
          })

        }}
        faces={faces}
      />
    </div>
  );
};

export default Startpage;
