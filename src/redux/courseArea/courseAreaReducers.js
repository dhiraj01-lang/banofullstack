import { OPEN_AREA, CLOSE_AREA } from "./courseAreaActions";

const initialState = {
  area: false,
  videoId: null,
  videoLink: null,
  videoName: null
};

const courseAreaReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_AREA:
      return {
        area: true,
        videoId: action.payload.videoId,
        videoLink: action.payload.videoLink,
        videoName: action.payload.videoName
      };

    case CLOSE_AREA:
      return {
        user: false,
        videoId: null,
        videoLink: null,
        videoName: null
      };

    default:
      return state;
  }
};

export default courseAreaReducer;