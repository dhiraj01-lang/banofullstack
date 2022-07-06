import React from "react";
import { Link } from "react-router-dom";
import "../../css/Home/OurCourses.css";
import CourseCard from "../../usable/CourseCard";

const OurCourses = () => {
  return (
    <div className="ourCourses text-poppins">
      <h1>Top Review Courses</h1>
      <div className="ourCourses__top">
        <CourseCard
          title="Build a fullstack Netflix Clone"
          img="https://help.nflxext.com/43e0db2f-fea0-4308-bfb9-09f2a88f6ee4_what_is_netflix_1_en.png"
          desc="React, firebase, Redux comes together to create this beautiful Netflix Clone"
          price={999}
          hours={56}
        />

        <CourseCard
          title="3D Earth - WebGL in action"
          img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXtYK39dbC1l5rMXqJa0TGLkOmcrx98s_bM5zTyDOqg2MwONbnt1yKobB_htKvTwzmIX0&usqp=CAU"
          desc="Using WebGL, learn 3d Web by building earth in this course"
          price={199}
          hours={10}
        />
        <CourseCard
          title="Momentum Clone - Hands on Practice"
          img="https://www.chromegeek.com/wp-content/uploads/2017/01/Momentum-Dash-For-Chrome-.jpg"
          price={299}
          desc="Use Django, python and web technologies to create stunning Full stack projects"
          hours={20}
        />
      </div>
      <div className="ourCourses__footer">
        <p>Checkout more awesome real world project courses and speed up your <br/> journey to Fullstack Developer. <b><Link to="/courses">Visit Courses</Link></b></p>
      </div>
    </div>
  );
};

export default OurCourses;
