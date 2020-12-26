import firebase from "firebase"
import "firebase/auth"
import "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyC-Qo4WPz_Z29AG4d7mU0ahp_xNpHUOGGs",
    authDomain: "firestore-auth-270d8.firebaseapp.com",
    projectId: "firestore-auth-270d8",
    storageBucket: "firestore-auth-270d8.appspot.com",
    messagingSenderId: "868639527666",
    appId: "1:868639527666:web:927b854bba814c82e0f66b",
    measurementId: "G-1HD074E427"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
export const auth = firebase.auth()
export const db = firebase.firestore()
export default firebase;

