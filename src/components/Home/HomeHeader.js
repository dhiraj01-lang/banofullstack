import React from "react";
import "../../css/Home/HomeHeader.css";
import HomeNav from "./HomeNav";

const HomeHeader = () => {
  return (
    <div className="homeHeader text-poppins">
      <HomeNav home />
      <div className="homeHeader__main">
        <div className="homeHeader__left">
          <div className="homeHeader__vector">
            <img
              src="https://image.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg"
              alt="vector"
            />
          </div>
        </div>
        <div className="homeHeader__right">
          <div className="homeHeader__details">
            <h1 className="mb-1">The ultimate</h1>
            <h1>Full stack journey</h1>
            <div className="details__info">
              <p>Want to get started with <span className="details__bold">Full stack development?</span></p>
              <p>
                You are at the right spot because <span className="details__bold">Bano Fullstack</span> offers a
                perfect training you need to become a full stack developer.
              </p>
            </div>
          </div>
          <div className="homeHeader__linebreak"></div>
          <div className="homeHeader__logos">
            <img src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_html_icon_130541.png" alt="html-logo"/>
            <img src="https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747_1280.png" alt="css-logo"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="js-logo"/>
            <img src="https://miro.medium.com/max/500/1*cPh7ujRIfcHAy4kW2ADGOw.png" alt="react-logo"/>
            <img src="https://www.gstatic.com/devrel-devsite/prod/v29e01f19390dbba02efae7ad88cec6396f66d6ad0ae093a58267d05c04c6557e/firebase/images/touchicon-180.png" alt="firebase-logo"/>
            <img src="https://cdn.pixabay.com/photo/2015/04/23/17/41/node-js-736399_960_720.png" alt="node-js"/>
            <img src="http://assets.stickpng.com/images/5848309bcef1014c0b5e4a9a.png" alt="redux-logo"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
