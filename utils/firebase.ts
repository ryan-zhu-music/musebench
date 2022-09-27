import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  signOut,
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { addUser } from "./db";

export const firebaseConfig = {
  apiKey: "AIzaSyDqGNBlux0-PyNWdfhtgeMUC226Tu-RWrc",
  authDomain: "musebench.firebaseapp.com",
  projectId: "musebench",
  storageBucket: "musebench.appspot.com",
  messagingSenderId: "674014559304",
  appId: "1:674014559304:web:74006f086051fef1d7ec7d",
  measurementId: "G-RD2RRNYZG0",
};

export const signOutUser = (auth: any) => {
  console.log(auth);
  signOut(auth)
    .then(() => {
      console.log("Signed out.");
    })
    .catch((error) => {
      console.log("Failed to sign out:", error);
    });
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

export const signIn = () => {
  auth.languageCode = "en";
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
        const token = credential.idToken;
      } else {
        const token = null;
      }
      const user = result.user;
      addUser(user, user.displayName, user.email);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("Signed in as ", user.email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error:", errorCode, errorMessage);
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};
