import React from 'react';
import HomeHeader from './HomeHeader';
import IntroductionToCourses from './IntroductionToCourses';
import OurCourses from './OurCourses';
import StudentReviews from './StudentReviews';

const Home = () => {
    return (
        <>
            <HomeHeader />
            <IntroductionToCourses />
            <OurCourses />
            <StudentReviews />
        </>
    );
}

export default Home;
