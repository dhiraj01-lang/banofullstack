export const OPEN_AREA = "OPEN_AREA";
export const CLOSE_AREA = "CLOSE_AREA";

export const openCourseArea = (Videodetails) => {
  return {
    type: OPEN_AREA,
    payload: Videodetails
  };
};

export const closeCourseArea = () => {
  return {
    type: CLOSE_AREA,
  };
};