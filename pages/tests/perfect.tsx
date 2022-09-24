import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Keyboard from "../../components/Keyboard";

interface Props {
  auth: any;
  user: any;
  signIn: () => void;
}

const Perfect: React.FC<Props> = ({ auth, user, signIn }) => {
  return (
    <main
      className="w-screen h-screen pb-10 flex flex-col"
      style={{
        background:
          "linear-gradient(117.92deg, #17181B 4.93%, #3C3D70 47.36%, #1E1F48 57.8%, #05061F 92.37%)",
        boxShadow: "inset 0px 0px 250px rgba(0, 0, 0, 0.6)",
      }}
    >
      <Navbar auth={auth} signedIn={!!user} signIn={signIn} />
      <div className="w-full h-full px-20">
        <div
          className="w-full h-full flex flex-col justify-center items-center"
          style={{
            background: "rgba(63, 71, 101, 0.23)",
            boxShadow:
              "0px 0px 40px rgba(121, 159, 255, 0.4), 0px 0px 5px 1px rgba(219, 225, 255, 0.75)",
            borderRadius: "70px",
          }}
        >
          <header className="w-full flex flex-col items-center justify-center p-5">
            <h1 className="">Perfect</h1>
            <p>What's the pitch of the note?</p>
          </header>
          <Keyboard />
        </div>
      </div>
    </main>
  );
};

export default Perfect;
