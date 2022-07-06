import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import HomeNav from "../Home/HomeNav";
import "../../css/coursePage/Course.css";
import CoursePreview from "./CoursePreview";
import CourseContent from "./CourseContent";
import CourseReviews from "./CourseReviews";
import VideoOverlay from "./VideoOverlay";
import { useSelector } from "react-redux";
import db from "../../firebase";
import Loading from "../Loading";

const Course = () => {
  const { id } = useParams();
  const courseArea = useSelector((state) => state.CourseArea.area);

  const [courseDetails, setCourseDetails] = useState([]);

  const [sectionDetails, setSectionDetails] = useState([]);

  const [enrolledIn, setEnrolledIn] = useState(null);

  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadingPage(false);
    }, 2500);
  }, [])

  const user = useSelector(state => state.User.user);

  useEffect(() => {
    db.collection("courses").where("courseId", "==", id).get().then(data => {
      setCourseDetails(data.docs.map(doc => doc.data()));
    });
  }, []);

  useEffect(() => {
    if(courseDetails.length > 0){
      const unsubscribe = db.collection("courses").doc(courseDetails[0].courseName).collection("enrollment").doc(user.email).onSnapshot((doc => {
        if(doc.exists){
          setEnrolledIn(doc.data());
        }
      }))

      return () => {
        unsubscribe();
      }
    }
    
  }, [courseDetails, user])

  useEffect(() => {
    if(courseDetails.length > 0){
      db.collection("courses").doc(courseDetails[0].courseName).collection("sections").orderBy("count", "asc").get().then(data => {
        setSectionDetails(data.docs.map(doc => doc.data()));
      }).catch(err => alert(err.message));
    }
  }, [courseDetails]);

  if(loadingPage){
    return(
      <Loading />
    )
  }

  return (
    <div className={`coursePage text-poppins`}>
      {courseArea && <VideoOverlay courseName={courseDetails[0]?.courseName} enrolledIn={enrolledIn} />}
      <HomeNav course />
      <div className="coursePage__header">
        <div className="coursePage__headerLeft">
          <CourseContent enrolledIn={enrolledIn} globalSections={sectionDetails} ownerName={courseDetails[0]?.courseOwner.username} ownerPhoto={courseDetails[0]?.courseOwner.profile} />
        </div>
        <div className="coursePage__headerRight">
          <CoursePreview globalSections={sectionDetails} enrolledIn={enrolledIn} name={courseDetails[0]?.courseName} amount={courseDetails[0]?.courseAmount} thumbnail={courseDetails[0]?.courseThumbnail} />
          <CourseReviews />
        </div>
      </div>
    </div>
  );
};

export default Course;
