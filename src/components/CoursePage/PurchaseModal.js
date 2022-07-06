import React, { useState } from "react";
import "../../css/coursePage/PurchaseModal.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import db from "../../firebase";
import { useSelector } from "react-redux";
import firebase from 'firebase';

const PurchaseModal = ({ setPurchaseModalStatus, CourseName, courseAmount }) => {
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [focus, setFocus] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const user = useSelector(state => state.User.user);


  const handleFocusInput = (e) => {
    setFocus(e.target.name);
  };

  const EnterCardName = (e) => {
    if (e.target.value.length < 25) {
      setName(e.target.value);
    }
  };

  const EnterCardNumber = (e) => {
    if (e.target.value.length < 17) {
      setNumber(e.target.value);
    }
  };

  const EnterCardExpiry = (e) => {
    if (e.target.value.length < 5) {
      setExpiry(e.target.value);
    }
  };

  const EnterCardCVV = (e) => {
    if (e.target.value.length < 4) {
      setCvc(e.target.value);
    }
  };

  const enrollForThisCourse = () => {
    db.collection("courses").doc(CourseName).collection("enrollment").doc(user.email).set({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      email: user.email,
      videosCompleted: []
    }).then(() => {
      setTimeout(() => {
        setPurchaseModalStatus(false);
      }, 1000)
    }).catch(err => alert(err.message));
  }

  return (
    <div className="purchaseModal">
      <div
        onClick={() => setPurchaseModalStatus(false)}
        className="purchaseModal__inner"
      ></div>
      <div className="purchaseModal__main">
        <div className="purchaseModal__left">
          <div className="purchaseModal__leftInner">
            <div className="purchaseModalLeft__upper">
              <h2>
                <img src="https://img.icons8.com/ios-filled/50/000000/teacher.png" />
                {CourseName}
              </h2>
              <h3>&#8377; {courseAmount}</h3>
            </div>
            <div className="purchaseModal__middle">
              <div className="purchaseModal__inputArea">
                <img src="https://img.icons8.com/glyph-neue/64/000000/name.png" />
                <input
                  value={name}
                  onChange={EnterCardName}
                  autoComplete="off"
                  onFocus={handleFocusInput}
                  name="name"
                  type="text"
                  placeholder="Enter your Card Name"
                />
              </div>
              <div className="purchaseModal__inputArea">
                <img src="https://img.icons8.com/ios-filled/50/000000/card-in-use-1.png" />
                <input
                  value={number}
                  onChange={EnterCardNumber}
                  autoComplete="off"
                  onFocus={handleFocusInput}
                  name="number"
                  type="number"
                  placeholder="Enter your Card Number"
                />
              </div>
              <div className="purchaseModal__inputArea">
                <img src="https://img.icons8.com/ios-filled/50/000000/card-exchange.png" />
                <input
                  value={expiry}
                  onChange={EnterCardExpiry}
                  autoComplete="off"
                  onFocus={handleFocusInput}
                  name="expiry"
                  type="text"
                  placeholder="Enter your Card Expiry"
                />
              </div>
              <div className="purchaseModal__inputArea">
                <img src="https://img.icons8.com/ios-filled/50/000000/card-verification-value.png" />
                <input
                  value={cvc}
                  onChange={EnterCardCVV}
                  autoComplete="off"
                  onFocus={handleFocusInput}
                  name="cvc"
                  type="text"
                  placeholder="Enter your Card CVV"
                />
              </div>
            </div>
            <div className="purchaseModal__down">
              <p>
                I agree to pay for this course, I checked all the details shown
                in the previous page and agreed for the terms and conditions. My
                enrollment can be cancelled anytime if I try to do any
                suspicious illegal activity like piracy.{" "}
              </p>
            </div>
            <div className="purchaseModal__button">
              <button onClick={enrollForThisCourse} className="homeNav__button btn--blue text-poppins purchaseModal__buttonHere">
                Enroll Now!
              </button>
            </div>
          </div>
        </div>
        <div className="purchaseModal__right">
          <Cards
            cvc={cvc}
            expiry={expiry}
            focused={focus}
            name={name}
            number={number}
          />
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
