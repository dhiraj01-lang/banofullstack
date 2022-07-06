import React, { useEffect, useState } from "react";
import "../../css/browseCourses/BrowseCourses.css";
import CourseCard from "../../usable/CourseCard";
import HomeNav from "../Home/HomeNav";
import SearchIcon from "@mui/icons-material/Search";
import db from "../../firebase";
import getRandom, { randomInteger } from "../../usable/getRandomArray";
import Loading from "../Loading";

const BrowseCourses = () => {
  const [courses, setCourses] = useState([]);
  const [highRatedCourses, setHighRatedCourses] = useState([]);
  const [clonesCourses, setClonesCourses] = useState([]);
  const [studentsAlsoViewingCourses, setStudentAlsoViewingCourses] = useState([]);

  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadingPage(false);
    }, 1500);
  }, []);

  useEffect(() => {
    db.collection("courses")
      .get()
      .then((data) => {
        setCourses(data.docs.map((doc) => doc.data()));
      })
      .catch((err) => alert(err.message));
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      const localArray = getRandom(courses, 3);
      const localArrayForClones = getRandom(courses, 3);
      const localStudentAlsoCourses = getRandom(courses, 3);
      setClonesCourses(localArrayForClones);
      setStudentAlsoViewingCourses(localStudentAlsoCourses);
      setHighRatedCourses(localArray);
    }
  }, [courses]);

  if (loadingPage) {
    return <Loading />;
  }

  return (
    <div className="browseCourses text-poppins">
      <HomeNav browse />
      <div className="browseCourses__yourCourses">
        <div className="browseCourses__innerPart">
          <h1 className="browseCourses__title">Already Enrolled Courses</h1>
          <div className="browseCourses__courseArea">
            <CourseCard
              title="Build a fullstack Netflix Clone"
              img="https://help.nflxext.com/43e0db2f-fea0-4308-bfb9-09f2a88f6ee4_what_is_netflix_1_en.png"
              desc="React, firebase, Redux comes together to create this beautiful Netflix Clone"
              price={999}
              hours={56}
              purchased
            />
            <CourseCard
              title="3D Earth - WebGL in action"
              img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXtYK39dbC1l5rMXqJa0TGLkOmcrx98s_bM5zTyDOqg2MwONbnt1yKobB_htKvTwzmIX0&usqp=CAU"
              desc="Using WebGL, learn 3d Web by building earth in this course"
              price={199}
              hours={10}
              purchased
            />
            <CourseCard
              title="Momentum Clone - Hands on Practice"
              img="https://www.chromegeek.com/wp-content/uploads/2017/01/Momentum-Dash-For-Chrome-.jpg"
              price={299}
              desc="Use Django, python and web technologies to create stunning Full stack projects"
              hours={20}
              purchased
            />
          </div>
        </div>
      </div>
      <div className="browseCourses__searchArea">
        <div className="browseCourses__search">
          <SearchIcon className="search__icon" />
          <input type="text" placeholder="Search for course" />
        </div>
      </div>
      <div className="browseCourses__bestCourses">
        <div className="browseCourses__bestinnerPart">
          <h1 className="browseCourses__title">High Rated Courses</h1>
          <div className="browseCourses__courseArea">
            {highRatedCourses.map((course) => (
              <CourseCard
                title={course.courseName}
                img={course.courseThumbnail}
                desc={course.courseDescription}
                price={course.courseAmount}
                hours={course.courseHours}
                key={course.courseId}
                id={course.courseId}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="browseCourses__bestCourses mt-20">
        <div className="browseCourses__bestinnerPart">
          <h1 className="browseCourses__title">Clones Courses</h1>
          <div className="browseCourses__courseArea">
          {clonesCourses.map((course) => (
            <CourseCard
              title={course.courseName}
              img={course.courseThumbnail}
              desc={course.courseDescription}
              price={course.courseAmount}
              hours={course.courseHours}
              key={course.courseId}
              id={course.courseId}
            />
          ))}
          </div>
        </div>
      </div>
      <div className="browseCourses__bestCourses mt-20">
        <div className="browseCourses__bestinnerPart">
          <h1 className="browseCourses__title">Students Also Viewing</h1>
          <div className="browseCourses__courseArea">
          {studentsAlsoViewingCourses.map((course) => (
            <CourseCard
              title={course.courseName}
              img={course.courseThumbnail}
              desc={course.courseDescription}
              price={course.courseAmount}
              hours={course.courseHours}
              key={course.courseId}
              id={course.courseId}
            />
          ))}
          </div>
        </div>
      </div>
      <div className="browseCourses__testimonials">
        <div className="browseCourses__testimonialsInner">
          <h2>
            Our courses are trusted by millions and top notch companies like
          </h2>
          <div className="testimonials__companyRow">
            <img src="https://logodix.com/logo/91057.png" alt="netflix" />
            <img
              src="https://cutewallpaper.org/21/transparent-background-google-logo/Google-logo-white-png-Google-logo-white-png-Transparent-.png"
              alt="Google"
            ></img>
            <img
              src="https://upload.wikimedia.org/wikipedia/donate/thumb/f/fd/Amazon-logo-white.svg/2560px-Amazon-logo-white.svg.png"
              alt="netflix"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseCourses;
