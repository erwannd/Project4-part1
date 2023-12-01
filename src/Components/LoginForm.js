import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import "../static/loginForm.css";
import doorOpen from "../static/images/door-open.png";
import doorClosed from "../static/images/door-closed.png";
import google from "../static/images/google.png";

const firebaseConfig = {
  apiKey: "AIzaSyD7iTnTPpVqjtDCCNMGN596-6BUQMVh0Vc",
  authDomain: "wof-login-13ff6.firebaseapp.com",
  projectId: "wof-login-13ff6",
  storageBucket: "wof-login-13ff6.appspot.com",
  messagingSenderId: "579155277035",
  appId: "1:579155277035:web:2faede914f2da4fbea3aae",
  measurementId: "G-VXPHSCV5HE",
};

// Initialize Firebase
initializeApp(firebaseConfig);

function LoginForm({ username, loginEvent }) {
  const [loggedUser, setLoggedUser] = useState(null);

  // Sign in with Google
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithRedirect(auth, provider)
      .then((result) => {
        // User signed in
        console.log(result.user);
        setLoggedUser(result.user);
      })
      .catch((error) => {
        // Handle Errors here.
        console.error(error);
      });
  };

  // Sign out
  function logoutGoogle() {
    const auth = getAuth();
    auth.signOut();
    setLoggedUser(null);
  }

  // We put the onAuthStateChanged in useEffect so this is only called when
  // this component mounts
  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in");
        setLoggedUser(user);
      } else {
        console.log("No user is signed in.");
      }
      loginEvent(user);
    });
  }, []);

  return (
    <div className="sign-in-area">
      {loggedUser ? (
        <div className="user-info">
          {username !== null ? (
            <p>Welcome back, {username}</p>
          ) : (
            <p>Hello newcomer</p>
          )}
          <img
            src={doorClosed}
            className="logout-btn"
            onClick={logoutGoogle}
            onMouseOver={(e) => (e.target.src = doorOpen)}
            onMouseOut={(e) => (e.target.src = doorClosed)}
            draggable={false}
          ></img>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <p>Please login to play</p>
          <div className="login-btn-container">
            <img
              src={google}
              className="login-btn"
              onClick={signInWithGoogle}
              draggable={false}
            ></img>
          </div>
        </div>
      )}
    </div>
  );
}
export default LoginForm;
