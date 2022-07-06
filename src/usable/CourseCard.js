import React, { useRef } from "react";
import { useHistory } from "react-router";
import "./CourseCard.css";
import useOnScreen from "./useOnScreen";

const CourseCard = ({ img, title, desc, price, hours, purchased, id }) => {
  const history = useHistory();

  const goToCoursePage = () => {
    history.push(`/course/${id}`);
  };

  const cardOnScreenRef = useRef();
  const cardVisible = useOnScreen(cardOnScreenRef);

  return (
    <div
      ref={cardOnScreenRef}
      onClick={goToCoursePage}
      className={`courseCard ${cardVisible ? "courseCard__visible" : ""} ${purchased ? "courseCard__purchased" : ""}`}
    >
      <div className="courseCard__image">
        <img src={img} alt={title} />
      </div>
      <div className="courseCard__details">
        <h3>{title}</h3>
        <p>{desc}</p>
        <div className="courseCard__details--footer">
          {!purchased ? (
            <>
            <p>
            <img
              src="https://img.icons8.com/fluency-systems-regular/48/000000/time.png"
              alt="time"
            />
            {hours}+ Hours
          </p>
          <p>&#8377; {price}</p>
            </>
          ) : <div className="courseCard__detailsFooterButton">
          <p>
          100
          <img src="https://img.icons8.com/material-outlined/24/000000/percentage.png"/>
          completed
        </p>
        <button>View Course</button>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
