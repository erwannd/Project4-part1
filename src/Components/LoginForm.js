import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import "../static/loginForm.css";

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
        // User is signed in.
        console.log("User is signed in:", user);

        setLoggedUser(user);
      } else {
        // No user is signed in.
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
          <button className="logout-button" onClick={logoutGoogle}>
            Log out
          </button>{" "}
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <p>Please login to play</p>
          <button className="login-button" onClick={signInWithGoogle}>
            Login with Google
          </button>
        </div>
      )}
    </div>
  );
}
export default LoginForm;
