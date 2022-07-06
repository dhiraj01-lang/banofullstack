import React, { useEffect, useRef, useState } from "react";
import "../../css/coursePage/CoursePreview.css";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PurchaseModal from "./PurchaseModal";
import { randomInteger } from "../../usable/getRandomArray";
import { useSelector } from "react-redux";

const CoursePreview = ({ name, amount, thumbnail, enrolledIn, globalSections }) => {
  const [clickedOnPlay, setClickedOnPlay] = useState(false);
  const [purchaseModalStatus, setPurchaseModalStatus] = useState(false);
  const user = useSelector(state => state.User.user);
  const [amountOfVideoCompleted, setAmountOfVideoCompleted] = useState(0);
  
  const amIEnrolledIn = enrolledIn != null ? enrolledIn.email == user.email : false;

  let totalVideoCounts;
  
  useEffect(() => {
    if(amIEnrolledIn){
      totalVideoCounts = 0;
      globalSections.map(section => {
        totalVideoCounts += section.videos.length;
      });
      const percentage = (enrolledIn?.videosCompleted.length / totalVideoCounts) * 100;
      setAmountOfVideoCompleted(percentage);
      console.log(percentage);
    }
  }, [enrolledIn, amIEnrolledIn]);



  const videoRef = useRef();

  const playVideo = () => {
    videoRef.current.play();
    setClickedOnPlay(true);
  };

  const bringBackThumbnail = () => {
    videoRef.current.currentTime = 0;
    setClickedOnPlay(false);
  };

  const purchaseCourseModal = () => {
    setPurchaseModalStatus(true);
  }

  return (
    <div className="coursePreview">
    {purchaseModalStatus && <PurchaseModal CourseName={name} courseAmount={amount} setPurchaseModalStatus={setPurchaseModalStatus} />}
      <div className="coursePreview__video">
        <video
          onEnded={bringBackThumbnail}
          ref={videoRef}
          controls
          src="/netflix.mp4"
        ></video>
        {!clickedOnPlay && (
          <div className="coursePreview__video--thumbnail">
            <img
              onClick={playVideo}
              src={thumbnail}
              alt="thumbnail"
            />
            <PlayArrowRoundedIcon onClick={playVideo} />
          </div>
        )}
      </div>
      <div className="coursePreview__details">
        <h1>{name}</h1>
        <div className="coursePreview__info">
          <div className="coursePreview__left">
            <p>
              <img src="https://img.icons8.com/ios-filled/50/000000/certificate.png" />
              Certificate upon completion
            </p>
            <p>
              <img src="https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/60/000000/external-graduation-hat-event-vitaliy-gorbachev-fill-vitaly-gorbachev.png" />
              Enrolled Students: {randomInteger(1000, 3000)}
            </p>
          </div>
          <div className="coursePreview__right">
            <p>
              <img src="https://img.icons8.com/ios-filled/50/000000/teacher.png" />
              Language: English, Hindi
            </p>
            <p>
              <img src="https://img.icons8.com/ios-glyphs/30/000000/infinity-large.png" />
              Full lifetime access
            </p>
          </div>
        </div>
        <div className="coursePreview__bottom">
          {!amIEnrolledIn && <button onClick={purchaseCourseModal}>Get Access @{amount}</button>}
          {amIEnrolledIn && (
            <div className="coursePreview__progressionDiv">
              <div className="coursePreview__progression">
                <div style={{width: `${amountOfVideoCompleted}%`}} className="coursePreview__progressionInner"></div>
              </div>
             Course completed: {amountOfVideoCompleted.toFixed(2)}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
