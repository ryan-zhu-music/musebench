import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { firebaseConfig } from "../../utils/firebase";
import { addUser } from "../../utils/db";

import TestPerfect from "../../components/Tests/Perfect";

const Perfect: NextPage = () => {
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
      <Head>
        <title>MuseBench</title>
        <meta name="description" content="lorem ipsum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TestPerfect auth={auth} user={user} signIn={signIn} />
    </main>
  );
};

export default Perfect;
