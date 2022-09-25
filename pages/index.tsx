import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { firebaseConfig } from "../utils/firebase";
import { addUser } from "../utils/db";

import Dashboard from "../components/Dashboard";
import PageHead from "../components/PageHead";

const Home: NextPage = () => {
  const app = initializeApp(firebaseConfig);

  const [user, setUser] = useState<any>(null);

  const auth = getAuth();
  auth.languageCode = "en";
  const provider = new GoogleAuthProvider();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.idToken;
        } else {
          const token = null;
        }
        const user = result.user;
        setUser(user);
        addUser(user, user.displayName, user.email);
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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <main className="w-screen h-screen">
      <PageHead />
      <Dashboard auth={auth} user={user} signIn={signIn} />
    </main>
  );
};

export default Home;
