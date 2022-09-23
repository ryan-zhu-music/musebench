import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { signOut as signOutDB } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyDqGNBlux0-PyNWdfhtgeMUC226Tu-RWrc",
  authDomain: "musebench.firebaseapp.com",
  projectId: "musebench",
  storageBucket: "musebench.appspot.com",
  messagingSenderId: "674014559304",
  appId: "1:674014559304:web:74006f086051fef1d7ec7d",
  measurementId: "G-RD2RRNYZG0",
};

export const signOut = (auth: any) => {
  signOutDB(auth)
    .then(() => {
      console.log("Signed out.");
    })
    .catch((error) => {
      console.log("Failed to sign out:", error);
    });
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
