import "./App.css";
import { lazy, useEffect, Suspense } from "react";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import db, { auth } from "./firebase";
import { useDispatch } from "react-redux";
import firebase from "firebase";
import { loginUser, logoutUser } from "./redux/users/usersActions";
const BrowseCourses = lazy(() => import("./components/browseCourses/BrowseCourses"));
const Course = lazy(() => import("./components/CoursePage/Course"));
const CreateIntro = lazy(() => import("./components/CreateCourse/CreateIntro"));
const CreateCoursePage = lazy(() => import("./components/CreateCourse/CreateCoursePage"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user logged in

        db.collection("users")
          .doc(authUser.email)
          .set({
            username: authUser.displayName,
            profile: authUser.photoURL,
            email: authUser.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            dispatch(
              loginUser({
                username: authUser.displayName,
                profile: authUser.photoURL,
                email: authUser.email,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              })
            );
          })
          .catch((err) => alert(err.message));
      } else {
        //user logged out
        dispatch(logoutUser());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
    <Router>
      <Switch>
        <Route path="/courses">
          <BrowseCourses />
        </Route>
        <Route path="/course/:id">
          <Course />
        </Route>
        <Route path="/create/course">
          <CreateCoursePage />
        </Route>
        <Route path="/create">
          <CreateIntro />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
    </Suspense>
  );
}

export default App;
