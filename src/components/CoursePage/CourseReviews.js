import { Avatar } from "@mui/material";
import React from "react";
import "../../css/coursePage/CourseReviews.css";

const CourseReviews = () => {

    const CourseReview = () => {
        return(
            <div className="courseReview">
                <div className="courseReview__avatar">
                    <Avatar src="https://variety.com/wp-content/uploads/2017/04/avatar.jpg?w=681&h=383&crop=1" />
                </div>
                <div className="courseReview__details">
                    <h4>Asad Memon</h4>
                    <span>A week ago</span>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto rem eligendi ipsam ea numquam beatae eius magnam assumenda mollitia aperiam?</p>
                </div>
            </div>
        )
    }

  return (
    <div className="courseReviews">
      <h2>Course Reviews</h2>
      <div className="courseReviewsList">
            <CourseReview />
            <CourseReview />
            <CourseReview />
            <CourseReview />
            <CourseReview />
      </div>
    </div>
  );
};

export default CourseReviews;
