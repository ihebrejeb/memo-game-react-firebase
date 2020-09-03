import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCU6NNDazD_z6Pdbk33N1oyAts8jDNcxaE",
  authDomain: "memory-game-7ddf6.firebaseapp.com",
  databaseURL: "https://memory-game-7ddf6.firebaseio.com",
  projectId: "memory-game-7ddf6",
  storageBucket: "memory-game-7ddf6.appspot.com",
  messagingSenderId: "669635471181",
  appId: "1:669635471181:web:7a6f36c08fbb82e3137904",
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;
