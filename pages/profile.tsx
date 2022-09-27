import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Navbar from "../components/Navbar";
import PageHead from "../components/PageHead";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { getScores } from "../utils/db";

const Profile: NextPage = () => {
  const [user, setUser] = useState<any>(null);
  const [scores, setScores] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getScores(user.email).then((res) => {
          setScores(res);
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <main
      className="w-screen min-h-screen pb-10 flex flex-col justify-start items-center"
      style={{
        background:
          "linear-gradient(117.92deg, #17181B 4.93%, #3C3D70 47.36%, #1E1F48 57.8%, #05061F 92.37%)",
        boxShadow: "inset 0px 0px 250px rgba(0, 0, 0, 0.6)",
      }}
    >
      <PageHead />
      <Navbar auth={auth} signedIn={!!user} />
      <div className="w-full h-full pt-32 px-20">
        <div
          className="w-full h-full flex flex-col relative justify-around items-center rounded-3xl py-5"
          style={{
            background: "rgba(63, 71, 101, 0.23)",
            boxShadow:
              "0px 0px 40px rgba(121, 159, 255, 0.4), 0px 0px 5px 1px rgba(219, 225, 255, 0.75)",
          }}
        >
          <h1 className="w-full text-center">Profile</h1>
          <div className="w-full flex flex-row justify-around items-center px-20 mt-4 mb-8">
            <div
              className="rounded-full h-[40px] w-2/5 px-5 flex flex-row justify-start items-center bg-slate-600/20"
              style={{
                boxShadow:
                  "0px 0px 40px rgba(121, 159, 255, 0.4), 0px 0px 5px 1px rgba(219, 225, 255, 0.75)",
              }}
            >
              <p>{user && user.displayName}</p>
            </div>
            <div
              className="rounded-full h-[40px] w-2/5 px-5 flex flex-row justify-start items-center bg-slate-600/20"
              style={{
                boxShadow:
                  "0px 0px 40px rgba(121, 159, 255, 0.4), 0px 0px 5px 1px rgba(219, 225, 255, 0.75)",
              }}
            >
              <p>{user && user.email}</p>
            </div>
          </div>
          <div className="w-full px-20 flex justify-center items-center pb-8">
            {!!scores ? (
              <div className="w-full flex flex-row flex-wrap justify-center items-center p-4 rounded-2xl border-glow">
                <table className="w-full">
                  <thead className="">
                    <tr>
                      <th></th>
                      <th>HIGHSCORE</th>
                      <th>TOTAL</th>
                      <th>ATTEMPTS</th>
                      <th>AVERAGE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from(
                      { length: Object.keys(scores).length },
                      (_, index: number) => {
                        const test: any = Object.keys(scores)[index];
                        return (
                          <tr
                            key={test + String(index)}
                            className="hover:bg-slate-300/30 duration-300 glow"
                          >
                            <th className="uppercase">{test}</th>
                            <td>{scores[test].highScore}</td>
                            <td>{scores[test].total}</td>
                            <td>{scores[test].attempts}</td>
                            <td>
                              {scores[test.attempts]
                                ? Math.round(
                                    (10 * scores[test].total) /
                                      scores[test.attempts]
                                  ) / 10
                                : 0}
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No scores yet. Play a test to get started!</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
