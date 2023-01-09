import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyB0wrVkEFTxmnTGNdJ4d3xrV8q7VvTrA4w",
  authDomain: "authexample-ed1cc.firebaseapp.com",
  projectId: "authexample-ed1cc",
  storageBucket: "authexample-ed1cc.appspot.com",
  messagingSenderId: "387386983833",
  appId: "1:387386983833:web:03f3325b57126601bd7f08",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services

//! this give us user info, is authenticated
const auth = firebase.auth();

const signInWithGoogle = ({ setRerender }) => {
  auth
    .signInWithPopup(provider)
    .then(async (result) => {
      var credential = result.credential;
      var token = credential.accessToken;
      var user = result.user;
      const { displayName, email, photoURL } = user;
      // console.log(displayName, email  , photoURL)

      // send an axios request to https://user-blush.vercel.app/api/users/create with body of{name, email, token}
      const { data } = await axios.post(
        "https://user-blush.vercel.app/api/users/create",
        { name: displayName, email, token }
      );

      if (!data) {
        console.log("error");
      }

      setRerender((prev) => !prev);
    })
    .catch((error) => {
      console.log(error);
    });
};

var provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, signInWithGoogle };

//! to login
// import { signInWithGoogle } from '../../firebase/config'
// onClick={signInWithGoogle}

//! to logout
// import { auth } from '../firebase/config'
// auth.signOut() ==> onClick
