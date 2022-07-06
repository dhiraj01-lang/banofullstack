import React, { useEffect, useRef, useState } from "react";
import "../../css/CreateCourse/CreateCoursePage.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../firebase";
import db from "../../firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { randomInteger } from "../../usable/getRandomArray";
import { useHistory } from "react-router";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const CreateCoursePage = () => {
  const courseNameRef = useRef("");
  const coursePriceRef = useRef("");
  const courseDescRef = useRef("");
  const [previewImage, setPreviewImage] = useState("");
  const [uploadedThumbnailFile, setUploadedThumbnailFile] = useState(null);
  const [sections, setSections] = useState([]);
  const [sectionModal, setSectionModal] = useState(false);
  const sectionNameRef = useRef("");
  const [selectedSection, setSelectedSection] = useState("");
  const [videoModal, setVideoModal] = useState(false);
  const videoNameRef = useRef("");
  const videoLinkRef = useRef("");
  const [deleteVideoModal, setDeleteVideoModal] = useState(false);
  const [deleteVideoId, setDeleteVideoId] = useState("");
  const [uploadedThumbnailURL, setUploadedThumbnailURL] = useState("");
  const user = useSelector((state) => state.User.user);
  const [uploadingStarted, setUploadingStarted] = useState(false);
  const history = useHistory();

  const previewImageFile = (e) => {
    if (e.target.files[0]) {
      //locally  image showing
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setUploadedThumbnailFile(e.target.files[0]);
    } else {
      setUploadedThumbnailFile(null);
    }
  };

  const SectionArea = ({ section }) => {
    const selected = section.sectionId === selectedSection.sectionId;
    return (
      <div
        className={`createCoursePage__sectionArea ${
          selected ? "createCoursePage__sectionAreaSelected" : ""
        }`}
        onClick={() => setSelectedSection(section)}
      >
        <h2>{section.sectionName}</h2>
      </div>
    );
  };

  const VideoArea = () => {
    return (
      <div className="videoInput">
        <div className="videoInput__name">
          <img src="https://img.icons8.com/metro/26/000000/video.png" />
          <input
            ref={videoNameRef}
            type="text"
            placeholder="Enter Video Name"
          />
        </div>
        <div className="videoInput__link">
          <img src="https://img.icons8.com/ios-filled/50/000000/link--v1.png" />
          <input
            ref={videoLinkRef}
            type="text"
            placeholder="Enter Video Link"
          />
        </div>
      </div>
    );
  };

  const CreateSectionModal = ({ video }) => {
    return (
      <div className="createSection__modal">
        <div
          onClick={() => {
            setVideoModal(false);
            setSectionModal(false);
          }}
          className="createSection__blank"
        ></div>
        {video ? (
          <div className="createSection__inner createSection__innerVideo">
            <VideoArea />
            <button onClick={addVideoElement}>
              <AddIcon />
            </button>
          </div>
        ) : (
          <div className="createSection__inner">
            <img src="https://img.icons8.com/ios-filled/50/000000/google-forms.png" />
            <input
              ref={sectionNameRef}
              onKeyDown={createSection}
              type="text"
              placeholder="Enter section Name"
            />
          </div>
        )}
      </div>
    );
  };

  const DeleteVideoModalBox = () => {
    return (
      <div className="createSection__modal">
        <div
          onClick={() => {
            setDeleteVideoId("");
            setDeleteVideoModal(false);
          }}
          className="createSection__blank"
        ></div>
        <div className="createSection__inner createDeleteBox__inner">
          <h3>Are you sure you want to delete this video?</h3>
          <button onClick={() => deleteVideo(deleteVideoId)}>Yes</button>
        </div>
      </div>
    );
  };

  const createSection = (e) => {
    if (e.key === "Enter") {
      const localArray = sections;
      localArray.push({
        sectionId: uuidv4(),
        sectionName: sectionNameRef.current.value,
        videos: [],
      });
      setSections(localArray);
      sectionNameRef.current.value = "";
      setSectionModal(false);
    }
  };

  const removeASection = () => {
    const localArray = sections;
    const resultingArray = localArray.filter(
      (section) => section.sectionId != selectedSection.sectionId
    );
    setSections(resultingArray);
    setSelectedSection("");
  };

  const addVideoElement = () => {
    const localArray = selectedSection;
    localArray.videos.push({
      videoId: uuidv4(),
      videoName: videoNameRef.current.value,
      videoLink: videoLinkRef.current.value,
      videoComments: [],
    });
    setSelectedSection(localArray);
    const locallyArray = sections;
    //save selectedSectionWithVideos to sectionsarray
    const index = locallyArray.indexOf(selectedSection);
    if (index !== -1) {
      locallyArray[index] = selectedSection;
    }
    setSections(locallyArray);
    setVideoModal(false);
  };

  const deleteVideo = (videoid) => {
    const localArray = selectedSection;
    const localFilterVideo = localArray.videos.filter(
      (video) => video.videoId != videoid
    );
    localArray.videos = localFilterVideo;
    setSelectedSection(localArray);
    const locallyArray = sections;
    const index = locallyArray.indexOf(selectedSection);
    if (index !== -1) {
      locallyArray[index] = selectedSection;
    }
    setSections(locallyArray);
    setSelectedSection(localArray);
    setDeleteVideoModal(false);
    setDeleteVideoId("");
  };

  const publishCourse = () => {
    setUploadingStarted(true);
    //upload image and get image url
    if (uploadedThumbnailFile && user) {
      console.log(uploadedThumbnailFile);
      const uploadTask = storage
        .ref(`/thumbnails/${uploadedThumbnailFile.name}`)
        .put(uploadedThumbnailFile);

      uploadTask.on(
        "state_changed",
        () => {},
        (err) => {
          alert(err.message);
        },
        () => {
          storage
            .ref(`/thumbnails/${uploadedThumbnailFile.name}`)
            .getDownloadURL()
            .then((url) => {
              //make course collection with course entry
              db.collection("courses")
                .doc(courseNameRef.current.value)
                .set({
                  courseName: courseNameRef.current.value,
                  courseAmount: coursePriceRef.current.value,
                  courseDescription: courseDescRef.current.value,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  courseThumbnail: url,
                  courseId: uuidv4(),
                  courseHours: randomInteger(10, 100),
                  courseOwner: {
                    email: user.email,
                    profile: user.profile,
                    username: user.username,
                  },
                })
                .then(() => {
                  let count = 0;
                  sections.map((section) => {
                    count++;
                    db.collection("courses")
                      .doc(courseNameRef.current.value)
                      .collection("sections")
                      .doc(section.sectionName)
                      .set({
                        sectionId: section.sectionId,
                        sectionName: section.sectionName,
                        timestamp:
                          firebase.firestore.FieldValue.serverTimestamp(),
                        videos: section.videos,
                        count: count,
                      })
                      .catch((err) => alert(err.message));
                  });
                })
                .catch((err) => alert(err.message));
            })
            .catch((err) => alert(err.message));
        }
      );
    }

    setTimeout(() => {
      setUploadingStarted(false);
      history.push("/courses");
    }, 8000);
  };

  return (
    <div className="createCoursePage text-poppins">
      {uploadingStarted && (
        <div className="createCoursePage__uploadingStarted">
          <div className="uploadingStarted__inner">
            <img
              src="https://www.pngkey.com/png/full/217-2179499_svg-transparent-automotive-newsletter-features-well-relax-at.png"
              alt="relax"
            />
            <h1>Sit back and relax while we make your course live!</h1>
            <div className="loadingPage__loader"></div>
          </div>
        </div>
      )}
      {sectionModal && <CreateSectionModal />}
      {videoModal && <CreateSectionModal video />}
      {deleteVideoModal && <DeleteVideoModalBox />}
      <button
        onClick={publishCourse}
        className="homeNav__button btn--blue text-poppins createCoursePage__publishButton"
      >
        Publish Course
      </button>
      <div className="createCoursePage__courseDetails">
        <h1>Course Details</h1>
        <div className="createCoursePage__goBackArrow">
          <ArrowBackIosNewIcon onClick={() => history.push("/courses")} fontSize="large" style={{fill: "darkblue", cursor: "pointer"}} />
        </div>
        <div className="createCoursePage__thumbnail">
          <img
            src={`${
              previewImage.length == 0
                ? "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
                : previewImage
            }`}
            alt="thumbnail"
          />
          <div className="createCoursePage__thumbnailUpload">
            <button className="homeNav__button btn--blue text-poppins createCoursePage__thumbnailButton">
              Upload Thumbnail
            </button>
            <input type="file" id="file" onChange={previewImageFile} />
          </div>
        </div>
        <div className="createCoursePage__nameAndPrice">
          <div className="createCoursePage__namePriceInpuut">
            <img src="https://img.icons8.com/external-prettycons-solid-prettycons/60/000000/external-online-course-education-prettycons-solid-prettycons.png" />
            <input
              ref={courseNameRef}
              type="text"
              placeholder="Enter name of course"
            />
          </div>
          <div className="createCoursePage__namePriceInpuut">
            <img src="https://img.icons8.com/ios-glyphs/30/000000/price-tag.png" />
            <input
              ref={coursePriceRef}
              type="number"
              placeholder="Enter Amount of course"
            />
          </div>
          <div className="createCoursePage__namePriceInpuut">
            <img src="https://img.icons8.com/external-photo3ideastudio-solid-photo3ideastudio/50/000000/external-description-museum-photo3ideastudio-solid-photo3ideastudio.png" />
            <input
              ref={courseDescRef}
              type="text"
              placeholder="Enter short Description"
            />
          </div>
        </div>
      </div>
      <div className="createCoursePage__sectionDetails">
        <div className="createCoursePage__sectionDetailsInner">
          {selectedSection ? (
            <>
              <p className="createCoursePage__selectionDetailsHeading">
                Selected Section: <b>{selectedSection.sectionName}</b>
              </p>
              <p className="createCoursePage__selectionDetailsHeading h--2">
                Total Videos: {selectedSection.videos.length}
              </p>
              <div className="createCoursePage__selectionButtonContainer">
                <button onClick={() => setVideoModal(true)}>
                  Add More Videos &nbsp; <AddIcon style={{ fill: "#fff" }} />
                </button>
              </div>
              <div className="createCoursePage__selectionVideosInputContainer">
                {selectedSection.videos.map((video) => (
                  <div
                    key={video.videoId}
                    className="createCoursePage__selectionVideos"
                  >
                    <div className="createCoursePage__selectionVideosLeft">
                      <p>{video.videoName}</p>
                      <p>{video.videoLink}</p>
                    </div>
                    <div className="createCoursePage__selectionVideosRight">
                      <button
                        onClick={() => {
                          setDeleteVideoModal(true);
                          setDeleteVideoId(video.videoId);
                        }}
                      >
                        <DeleteIcon fontSize="large" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="createCoursePage__selectionNotThere">
              <h1>Select a section to add videos!</h1>
            </div>
          )}
        </div>
      </div>
      <div className="createCoursePage__sectionsInfo">
        <h1>Sections Info</h1>
        <div className="createCoursePage__sectionButtonContainer">
          <button onClick={() => setSectionModal(true)}>
            Create Section &nbsp; <AddIcon style={{ fill: "#fff" }} />
          </button>
          <button
            disabled={!(typeof selectedSection === "object")}
            onClick={removeASection}
          >
            Delete Section &nbsp; <DeleteIcon style={{ fill: "#fff" }} />
          </button>
        </div>
        <div className="createCoursePage__sectionsContainer">
          {sections.map((section) => (
            <SectionArea key={section.sectionId} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateCoursePage;
