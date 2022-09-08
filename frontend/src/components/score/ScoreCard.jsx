import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalfStroke, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

function ScoreCard(totalScore) {
  const [scores, setScores] = useState(totalScore.totalScore);
  const [score, setScore] = useState(scores.average);
  return (
    <div className="rating">
      {0.5 <= score && score < 1 ? (
        <FontAwesomeIcon icon={faStarHalfStroke} className="icon" />
      ) : score < 1 ? (
        <FontAwesomeIcon icon={faStarRegular} className="icon" />
      ) : (
        <FontAwesomeIcon icon={faStar} className="icon" />
      )}
      {1.5 <= score && score < 2 ? (
        <FontAwesomeIcon icon={faStarHalfStroke} className="icon" />
      ) : score < 2 ? (
        <FontAwesomeIcon icon={faStarRegular} className="icon" />
      ) : (
        <FontAwesomeIcon icon={faStar} className="icon" />
      )}
      {2.5 <= score && score < 3 ? (
        <FontAwesomeIcon icon={faStarHalfStroke} className="icon" />
      ) : score < 3 ? (
        <FontAwesomeIcon icon={faStarRegular} className="icon" />
      ) : (
        <FontAwesomeIcon icon={faStar} className="icon" />
      )}
      {3.5 <= score && score < 4 ? (
        <FontAwesomeIcon icon={faStarHalfStroke} className="icon" />
      ) : score < 4 ? (
        <FontAwesomeIcon icon={faStarRegular} className="icon" />
      ) : (
        <FontAwesomeIcon icon={faStar} className="icon" />
      )}
      {4.5 <= score && score < 5 ? (
        <FontAwesomeIcon icon={faStarHalfStroke} className="icon" />
      ) : score < 5 ? (
        <FontAwesomeIcon icon={faStarRegular} className="icon" />
      ) : (
        <FontAwesomeIcon icon={faStar} className="icon" />
      )}
    </div>
  );
}

export default ScoreCard;
