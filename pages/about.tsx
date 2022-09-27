import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Navbar from "../components/Navbar";
import PageHead from "../components/PageHead";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

const About: NextPage = () => {
  const [user, setUser] = useState<any>(null);

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
    <main
      className="w-screen h-screen pb-10 flex flex-col"
      style={{
        background:
          "linear-gradient(117.92deg, #17181B 4.93%, #3C3D70 47.36%, #1E1F48 57.8%, #05061F 92.37%)",
        boxShadow: "inset 0px 0px 250px rgba(0, 0, 0, 0.6)",
      }}
    >
      <PageHead />
      <Navbar auth={auth} signedIn={!!user} />
      <div className="w-full h-full px-20">
        <div
          className="w-full h-full flex flex-col relative justify-around items-center rounded-3xl py-5"
          style={{
            background: "rgba(63, 71, 101, 0.23)",
            boxShadow:
              "0px 0px 40px rgba(121, 159, 255, 0.4), 0px 0px 5px 1px rgba(219, 225, 255, 0.75)",
          }}
        >
          <h1 className="w-full text-center">About</h1>
          <div className="w-full h-full px-16 pb-6 flex flex-col text-center justify-evenly items-center">
            <p className="text-md text-normal">
              MUSEBENCH is an interactive digital benchmark tool for training
              your musical skills through your ears.
            </p>
            <p className="text-md text-normal">
              Inspired by{" "}
              <a
                href="https://humanbenchmark.com/"
                className="text-md text-bold text-indigo-300 hover:text-indigo-100 duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Human Benchmark
              </a>
            </p>
            <p className="text-md text-normal">
              Developed by{" "}
              <a
                href="https://www.ryanzhu.com/"
                className="text-md text-bold text-indigo-300 hover:text-indigo-100 duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ryan Zhu
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
