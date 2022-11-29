import React, { ReactElement, useCallback, useEffect, useState } from "react";
import Card from "../../components/cards/card";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import "./List.scss";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import questionService from "../../services/question.service";
import feedbackService from "../../services/feedback.service";

const List = (): ReactElement => {
  const location = useLocation();
  const satisfaction = location.state.satisfaction;
  const satisfactionId = location.state.satisfactionId;
  
  const question = "Demo Inc.";
  const faces = ["VeryHappy", "Happy", "Neutral", "UnHappy", "VeryUnhappy"];
  
  const navigate = useNavigate();

  const [value, setValue] = useState(satisfaction);
  const [questionList, setQuestionList] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  
  const getQuestions = useCallback(async () => {
    const response: any = await questionService.fetchQuestions();
    setQuestionList(response.data);
  }, []);

  useEffect(() => {
    getQuestions().catch(console.error);
  }, []);

  const loadQuestions = () => {
    let index: number = 1;
    const totalQuestions: number = questionList.length;

    return (
      <div className="list-container">
        {questionList.map((question) => {
          return (
            <Card
              questionId={question.id}
              key={question.id}
              title={question.category}
              description={question.question}
              feedbacks={feedbacks}
              setFeedbacks={setFeedbacks}
              isSlider={true}
              placeHolder={question.placeHolder}
              index={index++}
              totalQuestions={totalQuestions}
            />
          );
        })}
        <Card
          key={"default-bottom"}
          title={""}
          feedbacks={feedbacks}
          setFeedbacks={setFeedbacks}
          isSlider={false}
          placeHolder={
            "Express yourself freely and safely. This will always remain anonymous."
          }
          description={"Anything to add? (Optional)"}
          index={0}
        />
        <button
          type="button"
          className="submit-button"
          value={"Send"}
          onClick={async () => {
            await feedbackService.postFeedback(feedbacks);
            
            navigate(`/final`, {
              state: {
                satisfaction: satisfaction,
              }
            })
  
          }}
        >
          Send
        </button>
      </div>
    );
  };

  return (
    <div className="container">
      <Header
        satisfactionId={satisfactionId}
        comp={question}
        selectedValue={satisfaction}
        onClick={(name: string) => {
          setValue(name);
        }}
        faces={faces}
      />
      {loadQuestions()}

      <Footer />
    </div>
  );
};

export default List;
