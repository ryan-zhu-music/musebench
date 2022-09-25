import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import Audio from "../../Audio";
import Navbar from "../../Navbar";
import Keyboard from "../../Keyboard";
import { random } from "../../../utils/random";
import { allKeys } from "../../../data/keys";
import Button from "../../Button";

import { getScores, updateScores } from "../../../utils/db";

interface Props {
  auth: any;
  user: any;
  signIn: () => void;
}

const TestPerfect: React.FC<Props> = ({ auth, user, signIn }) => {
  const [counter, setCounter] = useState(0);
  const [key, setKey] = useState(allKeys[random(0, allKeys.length - 1)]);
  const [selectedKey, setSelectedKey] = useState("");
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (mistakes >= 3) {
      setGameOver(true);
      if (user) {
        getScores(user.email).then((res) => {
          let scores = { ...res };
          if (score > scores.perfect) {
            scores.perfect = score;
            updateScores(user.email, scores);
            console.log(user.email, scores);
          }
        });
      }
    } else {
      if (selectedKey.length > 0 && selectedKey !== key) {
        setMistakes(mistakes + 1);
      } else {
        setScore(score + 1);
      }
      setKey(allKeys[random(0, allKeys.length - 1)]);
      setCounter(2);
    }
  }, [selectedKey]);

  useEffect(() => {
    const timer = setTimeout(() => {
      counter > 0 && setCounter(counter - 1);
    }, 1000);
  }, [counter]);

  const playKey = () => {
    setCounter(2);
  };

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
          className="w-full h-full flex flex-col relative justify-center items-center rounded-3xl"
          style={{
            background: "rgba(63, 71, 101, 0.23)",
            boxShadow:
              "0px 0px 40px rgba(121, 159, 255, 0.4), 0px 0px 5px 1px rgba(219, 225, 255, 0.75)",
          }}
        >
          <header className="w-full flex items-center justify-between p-5">
            <div className="w-1/5" />
            <div className="flex flex-col items-center justify-center w-3/5">
              <h1 className="">Perfect</h1>
              <p>{"What's the pitch of the note?"}</p>
            </div>
            <div className="flex flex-col items-end w-1/5 pr-10">
              {Array.from({ length: 3 }, (_, i) => (
                <IoClose
                  size={40}
                  key={i}
                  className={i < mistakes ? "text-red-200" : "text-slate-200"}
                />
              ))}
            </div>
          </header>
          <button
            className="h-1/3 min-h-[190px] p-5 mb-2 relative flex flex-col items-center justify-center"
            onClick={() => playKey()}
          >
            <Image
              src="/assets/icons/Play Button.png"
              alt="Play Button"
              className="object-contain h-full w-full"
              layout="intrinsic"
              width={140}
              height={140}
            />
            <p className="absolute text-[#3C3D70] text-5xl pr-6 font-extrabold">
              {score}
            </p>
          </button>
          <Audio note={[key]} isPlaying={counter > 0} bpm={20} />
          <Keyboard setSelectedKey={setSelectedKey} />
          {gameOver && (
            <div className="absolute w-full h-full flex flex-col items-center justify-center backdrop-blur-md bg-slate-600/50 z-10 rounded-3xl">
              <h2 className="text-5xl font-bold">Game Over</h2>
              <p className="text-2xl">Your score: {score - 1}</p>
              {!user && (
                <p className="text-3xl">Sign in to save your scores!</p>
              )}
              <div className="my-5">
                <Button
                  text="Retry"
                  onClick={() => {
                    setCounter(0);
                    setKey(allKeys[random(0, allKeys.length - 1)]);
                    setSelectedKey("");
                    setScore(0);
                    setMistakes(0);
                    setGameOver(false);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default TestPerfect;
