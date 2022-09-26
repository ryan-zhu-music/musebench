import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import Audio from "../../Audio";
import Navbar from "../../Navbar";
import PageHead from "../../PageHead";

import { Keyboard } from "react-music-keyboard";

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
  const [key, setKey] = useState(allKeys[random(0, allKeys.length - 1)]);
  const [selectedKey, setSelectedKey] = useState("");
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (mistakes >= 3) {
      setGameOver(true);
      if (user) {
        getScores(user.email).then((res) => {
          let scores = { ...res }.scores;
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
      let newKey = allKeys[random(0, allKeys.length - 1)];
      while (newKey === key) {
        newKey = allKeys[random(0, allKeys.length - 1)];
      }
      setKey(newKey);
    }
  }, [selectedKey]);

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
          <header className="w-full flex items-center justify-between px-5">
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
                  className={i < mistakes ? "text-red-300" : "text-slate-200"}
                />
              ))}
            </div>
          </header>
          <button
            className="p-3 mb-2 relative flex flex-col items-center justify-center duration-300 hover:brightness-"
            onClick={() => setIsPlaying(true)}
          >
            <Image
              src="/assets/icons/Play Button.png"
              alt="Play Button"
              className="object-contain h-full w-full play-button"
              layout="intrinsic"
              width={100}
              height={100}
            />
            <p className="absolute text-[#3C3D70] text-3xl pr-6 font-extrabold">
              {score}
            </p>
          </button>
          <Audio
            melody={[key, ""]}
            isPlaying={isPlaying}
            bpm={60}
            setIsPlaying={setIsPlaying}
          />
          <Keyboard
            height={120}
            blackKeyHeight={83}
            blackKeyColor="#3C3D70"
            whiteKeyColor="#cbd5e1"
            whiteKeyWidth={40}
            blackKeyWidth={35}
            keySpacing={4}
            borderRadius={10}
            startNote="C3"
            endNote="B4"
            onKeyPress={(key) => {
              setSelectedKey(key);
            }}
            whiteKeyClass="white-key"
            blackKeyClass="black-key"
          />
          {gameOver && (
            <div className="absolute w-full h-full flex flex-col items-center justify-center backdrop-blur-md bg-slate-600/50 z-10 rounded-3xl">
              <h2 className="text-5xl font-bold">Game Over</h2>
              <p className="text-2xl">Your score: {score}</p>
              {!user && (
                <p className="text-3xl">Sign in to save your scores!</p>
              )}
              <div className="my-5">
                <Button
                  text="Retry"
                  onClick={() => {
                    setIsPlaying(false);
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
