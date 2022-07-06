import React, { useEffect, useRef, useState } from "react";
import "../../css/Home/IntroductionToCourses.css";
import useOnScreen from "../../usable/useOnScreen";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

const IntroductionToCourses = () => {

    const titleOnScreenRef = useRef();
    const titleVisible = useOnScreen(titleOnScreenRef);

    const countOnScreenRef = useRef();
    const countVisible = useOnScreen(countOnScreenRef);

    const [chaptersCount, setChaptersCount] = useState(0);
    const [coursesCount, setCoursesCount] = useState(0);
    const [hoursCount, setHoursCount] = useState(0);
    const [clickedOnPlay, setClickedOnPlay] = useState(false);

    const videoRef = useRef();

    const playVideo = () => {
      videoRef.current.play();
      setClickedOnPlay(true);
    }

    const bringBackThumbnail = () => {
      videoRef.current.currentTime = 0;
      setClickedOnPlay(false);
    }


    useEffect(() => {
      if(countVisible){
        let hoursC = 0;
        const interval = setInterval(() => {
           if(hoursC < 100){
            setHoursCount(hoursC+1);
            hoursC++;
          }
          else{
            clearInterval(interval);
          }
        }, 10);
      }else{
        setChaptersCount(0);
        setCoursesCount(0);
        setHoursCount(0);
      }
    }, [countVisible]);

    useEffect(() => {
      if(countVisible){
        let coursesC = 0;
        const interval = setInterval(() => {
           if(coursesC < 20){
            setCoursesCount(coursesC+1);
            coursesC++;
          }
          else{
            clearInterval(interval);
          }
        }, 60);
      }
    }, [countVisible]);

    useEffect(() => {
      if(countVisible){
        let chaptersC = 0;
        const interval = setInterval(() => {
           if(chaptersC < 56){
            setChaptersCount(chaptersC+1);
            chaptersC++;
          }
          else{
            clearInterval(interval);
          }
        }, 30);
      }
    }, [countVisible]);


  

  return (
    <div className="introduction text-poppins">
      <div className="introduction__title">
        <h1 className={`${titleVisible ? "introduction__title--visible" : "introduction__title--not"}`} ref={titleOnScreenRef}>
          Our courses can help you become a <br /> good{" "}
          <span>Fullstack Developer</span>
        </h1>
      </div>
      <div className="introduction__message">
        <p>
          Joining our courses will give you lifetime access to complete and
          certificate of completion which can be shared on social media etc.
        </p>
      </div>
      <div className="introduction__count">
        <div className="introduction__count--container">
          <div ref={countOnScreenRef} className="introduction__count--1">
            <h3>{hoursCount}</h3>
            <p>Hours</p>
          </div>
          <div className="introduction__count--2">
            <h3>{coursesCount}</h3>
            <p>Courses</p>
          </div>
          <div className="introduction__count--3">
          <h3>{chaptersCount}</h3>
          <p>Chapters</p>
        </div>
        </div>
      </div>
      <div className="introduction__video">
        <video onEnded={bringBackThumbnail} ref={videoRef} controls src="/netflix.mp4"></video>
        {!clickedOnPlay && <div className="introduction__video--thumbnail">
        <img onClick={playVideo} src="https://variety.com/wp-content/uploads/2020/10/netflix-tv-interface.jpg?w=1024" alt="thumbnail"/>
        <PlayArrowRoundedIcon onClick={playVideo} />
        </div>}
        
      </div>
      <div className="introduction__footer">
        <p>This Video shows one of our project in the course, its Netflix Clone!</p>
        <p>Each lesson begins with a <b>starter folder</b> to download. <br/>
        Then, simply <b>follow the tutorial!</b></p>
      </div>
    </div>
  );
};

export default IntroductionToCourses;
