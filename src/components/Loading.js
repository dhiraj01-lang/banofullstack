import React from 'react';
import "../css/Loading.css";

const Loading = () => {
    return (
        <div className="loadingPage">
        <div className="shape"></div>
        <div className="shape1"></div>
        <div className="shape2"></div>
        <div className="shape3"></div>
            <div className="loadingPage__center">
                <img src="/logo.png" alt="logo"/>
                <div className="loadingPage__loader"></div>
            </div>
        </div>
    );
}

export default Loading;
