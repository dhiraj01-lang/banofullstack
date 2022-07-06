import React, { useEffect, useState } from "react";
import "../../css/coursePage/CourseContent.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openCourseArea } from "../../redux/courseArea/courseAreaActions";
import CheckIcon from '@mui/icons-material/Check';



const CourseContent = ({ownerName, ownerPhoto, globalSections, enrolledIn}) => {
  const [openedSection, setOpenedSection] = useState(0);
  const [showDesc, setShowDesc] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.User.user);

  const amIEnrolledIn = enrolledIn != null ? enrolledIn.email == user.email : false;

  const descriptionToggle = () => {
    setShowDesc((prevState) => !prevState);
  };

  const sections = [
    {
      id: 1,
      name: "Introduction to React",
      lectures: 5,
      time: 23,
    },
    {
      id: 2,
      name: "Making layout",
      lectures: 10,
      time: 102,
    },
    {
      id: 3,
      name: "Giving realistic Netflix look",
      lectures: 14,
      time: 120,
    },
    {
      id: 4,
      name: "Firebase 101",
      lectures: 7,
      time: 63,
    },
    {
      id: 5,
      name: "Backend Development",
      lectures: 20,
      time: 204,
    },
    {
      id: 6,
      name: "Connect backend and frontend",
      lectures: 13,
      time: 142,
    },
    {
      id: 7,
      name: "Login and Authentication",
      lectures: 9,
      time: 86,
    },
    {
      id: 8,
      name: "Testing and deployment",
      lectures: 8,
      time: 33,
    },
    {
      id: 9,
      name: "What's next?",
      lectures: 2,
      time: 10,
    },
  ];

  const showAlert = () => {
    alert("You need to purchase the course in order to view it!");
  }

  Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}

  const VideoSection = ({video, link, id}) => {
    const openCourseOverlay = () => {
      dispatch(openCourseArea({videoId: id, videoLink: link, videoName: video.videoName}));
    }
    let isThisVideoCompleted = false;
    if(amIEnrolledIn){
      isThisVideoCompleted = enrolledIn.videosCompleted.contains(link);
    }

    return (
      <div onClick={amIEnrolledIn ? openCourseOverlay : showAlert} className="courseSection__bodyContent">
        <p className={`${isThisVideoCompleted ? "courseSection__bodyContent__videoCompleted" : ""}`}>{video.videoName} {isThisVideoCompleted && <CheckIcon />}</p>
        <p>0:22</p>
      </div>
    );
  };

  const CourseSection = ({ name, lectures, id, videos }) => {
    const [sectionOpened, setSectionOpened] = useState(false);
    const [update, setUpdate] = useState(false);

    const sectionOpen = () => {
      setOpenedSection(id);
      setUpdate((prevState) => !prevState);
    };

    useEffect(() => {
      if (id === openedSection) {
        setSectionOpened(!sectionOpened);
      } else {
        setSectionOpened(false);
      }
    }, [openedSection, update]);

    return (
      <div
        className={`courseSection ${
          sectionOpened ? "courseSection__opened" : ""
        }`}
      >
        <div onClick={sectionOpen} className="courseSection__header">
          <div className="courseSection__left">
            <h3>
              <KeyboardArrowUpIcon style={{ marginRight: "10px" }} />
              {name}
            </h3>
          </div>
          <div className="courseSection__right">
            <p>
              {lectures} lectures &nbsp; &bull; 22 mins
            </p>
          </div>
        </div>
        <div
          className={`courseSection__body ${
            sectionOpened ? "courseSection__bodyOpened" : ""
          }`}
        >
        {videos.map(video => <VideoSection key={video.videoId} link={video.videoLink} id={video.videoId} video={video} />)}
        </div>
      </div>
    );
  };

  return (
    <div className="courseContent">
      <div className="courseContent__page">
        <h1>Course Content</h1>
        <div className="courseContent__details">
          <p>
            &#x25cf; 23 Sections &nbsp; &nbsp; &#x25cf; 155 Lectures &nbsp;
            &nbsp; &#x25cf; 22 hrs 55 minutes
          </p>
        </div>
        <div className="courseContent__sections">
          {globalSections.map((section) => (
            <CourseSection
              id={section.sectionId}
              key={section.sectionId}
              name={section.sectionName}
              lectures={section.videos.length}
              videos={section.videos}
            />
          ))}
        </div>
        <div className="courseSection__requirements">
          <h2>Requirements</h2>
          <div className="courseSection__requirementList">
            <p>&#x25cf; Time to play</p>
            <p>&#x25cf; Time to play</p>
            <p>&#x25cf; Time to play</p>
            <p>&#x25cf; Time to play</p>
          </div>
        </div>
        <div className="courseSection__description">
          <h2>Description</h2>
          <div
            className={`courseSection__descriptionBox ${
              showDesc ? "courseSection__descriptionBox--show" : ""
            }`}
          >
            <p style={{ textAlign: "justify" }}>
              Interested in the field of Machine Learning? Then this course is
              for you! This course has been designed by two professional Data
              Scientists so that we can share our knowledge and help you learn
              complex theory, algorithms, and coding libraries in a simple way.
              We will walk you step-by-step into the World of Machine Learning.
              With every tutorial, you will develop new skills and improve your
              understanding of this challenging yet lucrative sub-field of Data
              Science. This course is fun and exciting, but at the same time, we
              dive deep into Machine Learning. It is structured the following
              way: Part 1 - Data Preprocessing Part 2 - Regression: Simple
              Linear Regression, Multiple Linear Regression, Polynomial
              Regression, SVR, Decision Tree Regression, Random Forest
              Regression Part 3 - Classification: Logistic Regression, K-NN,
              SVM, Kernel SVM, Naive Bayes, Decision Tree Classification, Random
              Forest Classification Part 4 - Clustering: K-Means, Hierarchical
              Clustering Part 5 - Association Rule Learning: Apriori, Eclat Part
              6 - Reinforcement Learning: Upper Confidence Bound, Thompson
              Sampling Part 7 - Natural Language Processing: Bag-of-words model
              and algorithms for NLP Part 8 - Deep Learning: Artificial Neural
              Networks, Convolutional Neural Networks Part 9 - Dimensionality
              Reduction: PCA, LDA, Kernel PCA Part 10 - Model Selection &
              Boosting: k-fold Cross Validation, Parameter Tuning, Grid Search,
              XGBoost Moreover, the course is packed with practical exercises
              that are based on real-life examples. So not only will you learn
              the theory, but you will also get some hands-on practice building
              your own models. And as a bonus, this course includes both Python
              and R code templates which you can download and use on your own
              projects. Important updates (June 2020): CODES ALL UP TO DATE DEEP
              LEARNING CODED IN TENSORFLOW 2.0 TOP GRADIENT BOOSTING MODELS
              INCLUDING XGBOOST AND EVEN CATBOOST!
            </p>
            <div className="description__descriptionBoxFade"></div>
          </div>
          <button onClick={descriptionToggle}>
            {showDesc ? "Show Less" : "Show More"}
          </button>
        </div>
        <div className="courseSection__author">
          <h2>Instructor</h2>
          <div className="courseSection__instructorDesc">
            <Avatar src={ownerPhoto} />
            <div className="courseSection__instructorDetail">
              <h3>{ownerName}</h3>
              <p>Full Stack Web Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
