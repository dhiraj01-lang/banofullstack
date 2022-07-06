import React, { useEffect, useRef, useState } from "react";
import "../../css/coursePage/VideoOverlay.css";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { closeCourseArea } from "../../redux/courseArea/courseAreaActions";
import ReactPlayer from "react-player/youtube";
import { Avatar } from "@mui/material";
import db from "../../firebase";
import { v4 as uuidv4 } from "uuid";


const VideoOverlay = ({enrolledIn, courseName}) => {
  const dispatch = useDispatch();
  const videoLink = useSelector(state => state.CourseArea.videoLink);
  const videoId = useSelector(state => state.CourseArea.videoId);
  const videoName = useSelector(state => state.CourseArea.videoName);
  const user = useSelector(state => state.User.user);
  const [comments, setComments] = useState([{
        commentId: uuidv4(),
        commentData: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi labore minima sapiente molestias eaque minus? Sit ab excepturi iste saepe!",
        commentOwner: "asadmemon58558@gmail.com",
        commentOwnerName: "Asad Memon",
        commentReplies: [{
          commentReplyId: uuidv4(),
          commentReplyData: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi labore minima sapiente molestias eaque minus?",
          commentReplyOwnerName: "Maaz Memon"
        }]
  }, { 
      commentId: uuidv4(),
      commentData: "This is really an awesome video dude, loved it!",
      commentOwner: "asadmemon58558@gmail.com",
      commentOwnerName: "Anonymous",
      commentReplies: [{
        commentReplyId: uuidv4(),
        commentReplyData: "Thanks bro, hope you will like our future videos",
        commentReplyOwnerName: "Asad Memon"
        }]
  }]);
  const commentRef = useRef();

  const disableOverlayScreen = () => {
    dispatch(closeCourseArea());
  };

  const markVideoCompleted = () => {
    db.collection("courses").doc(courseName).collection("enrollment").doc(user.email).update({
      videosCompleted: [...enrolledIn.videosCompleted, videoLink]
    }).then(() => {
      setTimeout(() => {
        disableOverlayScreen();
      }, 1000)
    }).catch(err => alert(err.message));
  }

  const CommentByUser = ({comment}) => {

    const addCommentReply = () => {
      commentRef.current.placeholder = `Add reply to comment by ${comment.commentOwnerName}`;
    }

    return (
      <div className="commentByUser">
        <div className="commentTop">
          <div className="commentTop__left">
            <Avatar />
            <p>{comment.commentOwnerName}</p>
          </div>
          <div className="commentTop__right">
            <p>10th Nov 2021</p>
          </div>
        </div>
        <div className="commentBody">
          <p>
            {comment.commentData}
          </p>
        </div>
        <div className="commentsReply">
        {comment.commentReplies.map(replies => <CommentReplyByUser replies={replies} />)}
        </div>
        <div className="commentEnd"></div>
      </div>
    );
  };

  const CommentReplyByUser = ({replies}) => {
    return (
      <div className="commentReplyByUser">
        <div className="commentReplyTop">
          <div className="commentReplyTop__left">
            <Avatar />
            <p>{replies.commentReplyOwnerName}</p>
          </div>
          <div className="commentReplyTop__right">
            <p>10th Nov 2021</p>
          </div>
        </div>
        <div className="commentReplyBody">
          <p>
            {replies.commentReplyData}
          </p>
        </div>
      </div>
    );
  };

  const addComment = (e) => {
    if(e.key === "Enter"){
      setComments([...comments, {
        commentId: uuidv4(),
        commentData: commentRef.current.value,
        commentOwner: user.email,
        commentOwnerName: user.username,
        commentReplies: []
      }])
      commentRef.current.value = "";
    }
  }



  return (
    <div className="videoOverlay">
      <div className="videoOverlay__icon">
        <ClearIcon
          onClick={disableOverlayScreen}
          fontSize="large"
          style={{ fill: "#fff", cursor: "pointer" }}
        />
      </div>
      <div className="videoOverlay__row">
        <div className="videoOverlay__left">
          <ReactPlayer
            controls
            width={"90%"}
            height={550}
            url={videoLink}
            pip={true}
          />
        </div>
        <div className="videoOverlay__right">
          <div className="videoOverlay__comments">
            <div className="videoOverlay__infoArea">
              <p><b>{videoName}</b></p>
              <button onClick={markVideoCompleted}>Mark as completed</button>
            </div>
            <div className="videoOverlay__commentsSection">
            {comments.map(comment => <CommentByUser key={comment.commentId} comment={comment} />)}
            {comments.length === 0 && <h4 style={{textAlign: "center"}}>No comments!</h4>}
            </div>
            <div className="videoOverlay__textArea">
              <input ref={commentRef} onKeyDown={addComment} type="text" placeholder="Enter your doubt" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoOverlay;
