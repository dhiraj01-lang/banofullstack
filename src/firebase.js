import firebase from "firebase";
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAxwoSM7BQTfn1RjvKMOAemLEzIrDfwOMo",
  authDomain: "bano-fullstack-0908.firebaseapp.com",
  projectId: "bano-fullstack-0908",
  storageBucket: "bano-fullstack-0908.appspot.com",
  messagingSenderId: "540746791952",
  appId: "1:540746791952:web:2635c1eec24e298e1f1e95"
};


//make sure it hasn't been initialized
const firebaseApp = firebase.initializeApp(firebaseConfig);

const storage = firebaseApp.storage();
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, storage };
export default db;
