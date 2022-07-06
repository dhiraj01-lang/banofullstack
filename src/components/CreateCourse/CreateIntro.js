import React from 'react';
import { useHistory } from 'react-router';
import "../../css/CreateCourse/CreateIntro.css";

const CreateIntro = () => {

    const history = useHistory();

    return (
        <div className="createIntro text-poppins">
        <div className="shape"></div>
        <div className="shape1"></div>
        <div className="shape2"></div>
        <div className="shape3"></div>
            <div className="createIntro__top">
            <img src="https://img.freepik.com/free-vector/teaching-students-online-internet-learning-computer-programming_335657-3119.jpg?size=626&ext=jpg" alt="image"/>
            </div>
            <div className="createIntro__bottom">
                <h1>Create Your Own Course!</h1>
                <p>We opened our doors for new teachers that can create courses that will benefit our students and these courses will be marketed by us. You will get amazing benefits like perks, merchandise and recognition by creating own personalized courses. So get started now!</p>
            </div>
            <div className="createIntro__buttonContainer">
            <button onClick={() => history.push("/create/course")} className="homeNav__button btn--blue text-poppins button__createIntro__here">Get started</button>
            </div>
        </div>
    );
}

export default CreateIntro;
