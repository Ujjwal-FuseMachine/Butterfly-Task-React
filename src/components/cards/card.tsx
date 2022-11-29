import React, { ReactElement, ReactNode, useState } from "react";
import ReactStars from "react-rating-stars-component";

import "./Card.scss";

interface Props {
  questionId?: number,
  title: string;
  index?: number;
  description: string;
  isSlider: boolean;
  placeHolder: string;
  totalQuestions?: number;
  feedbacks;
  setFeedbacks;
}

const Card = ({
  questionId,
  title,
  index,
  description,
  isSlider,
  placeHolder,
  totalQuestions,
  feedbacks,
  setFeedbacks,  
}: Props): ReactElement => {
  const [textArea, setTextArea] = useState(false);

  let classCard = "card";
  if (!isSlider) {
    classCard += " card-default";
  }

  const handleFeedback= (rating, comment) => {
    const feedbackList = [...feedbacks];
    
    if (feedbackList.length === 0) {
      setFeedbacks([{
        questionId : questionId ?? null,
        rating : rating ?? null,
        comment : comment ?? "",
      }]);

      return;
    }
    
    const feedbackIndex = feedbackList.findIndex(feedback => feedback.questionId == questionId);
    
    if (feedbackIndex == -1) { 
      setFeedbacks([
        ...feedbacks,
        {
          questionId : questionId ?? null,
          rating : rating ?? null,
          comment : comment ?? "",
        }
      ]);
  
      return; 
    }

    let feedbackData = feedbackList[feedbackIndex];
    feedbackData.rating = rating ?? feedbackData.rating;
    feedbackData.comment = comment ?? feedbackData.comment;

    feedbackList.splice(feedbackIndex, 1);
    feedbackList.push(feedbackData);
    setFeedbacks(feedbackList);

    return;
  }

  const handleRating = (rate) => {
    handleFeedback(rate, null);
  }

  const handleComment = (event) => {
    handleFeedback(null, event.target.value);
  }

  return (
    <div className={classCard}>
      {isSlider ? (
        <div className="card-header">
          <div className={"index"}>{index} of {totalQuestions}</div>
          <div className={"minor"}>{title}</div>
        </div>
      ) : null}

      <div className={"card-middle-header"}>
        <label className="card-description">{description}</label>
        {isSlider ? null : (
          <div className={"circular-container"}>Extra feedback helps</div>
        )}
      </div>
      <div className={"card-body"} >
        {isSlider ? 
          (
            <div className={"xContainer"}>
              <ReactStars
                count={10}
                size={48}
                onChange={(star) => {
                  handleRating(star);
                }}
                activeColor="#ffd700"
              />
              <div className="action-container">
                <label>Disagree</label>
                <label>Agree</label>
              </div>
            </div>
          ) : null
        }
      </div>

      {textArea || !isSlider ? (
        <div className="comment">
          <textarea
            className="card-textarea"
            placeholder={placeHolder}
            onBlur={handleComment}
          ></textarea>
        </div>
      ) : (
        <div>
          <a
            className="add-btn"
            onBlur={handleComment}
            onClick={() => {
              setTextArea(true);
            }}
          >
            Add Comment
          </a>
        </div>
      )}
    </div>
  );
};

export default Card;
