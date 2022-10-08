import { useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa";
import Image from "next/image";

import { Keyboard } from "react-music-keyboard";

import { random } from "../../../utils/random";
import { playSound } from "../../../utils/sound";
import { allKeys } from "../../../data/keys";

import { getScores, updateScores } from "../../../utils/db";
import GameOver from "../../GameOver";
import Info from "../../Info";
import Mistakes from "../../Mistakes";

interface Props {
  user: any;
}

const TestPerfect: React.FC<Props> = ({ user }) => {
  const [key, setKey] = useState(allKeys[random(0, allKeys.length - 1)]);
  const [selectedKey, setSelectedKey] = useState("");
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    if (mistakes >= 3) {
      setGameOver(true);
      if (user) {
        getScores(user.email).then((res) => {
          updateScores(user.email, score, "perfect", res);
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
    <main className="w-full h-full px-5 md:px-20">
      <div
        className="w-full h-full flex flex-col relative justify-around items-center rounded-3xl py-5"
        style={{
          background: "rgba(63, 71, 101, 0.23)",
          boxShadow:
            "0px 0px 40px rgba(121, 159, 255, 0.4), 0px 0px 5px 1px rgba(219, 225, 255, 0.75)",
        }}
      >
        {infoOpen && <Info title="Tuning" onClose={() => setInfoOpen(false)} />}
        <header className="w-full flex flex-wrap items-start justify-between px-2 md:px-5">
          <button
            className="w-1/6 md:w-1/5 pl-5 md:pl-10"
            onClick={() => setInfoOpen(true)}
          >
            <FaQuestion
              size={30}
              className="text-indigo-200/40 hover:text-indigo-200/60 duration-200 glow"
            />
          </button>
          <div className="flex flex-col items-center justify-center w-2/3 md:w-3/5">
            <h1 className="text-2xl md:text-4xl">Tuning</h1>
            <p className="text-center w-5/6">
              {"Is the pitch higher or lower?"}
            </p>
            <h3>{score}</h3>
          </div>
          <div className="w-1/6 md:w-0" />
          <Mistakes mistakes={mistakes} />
        </header>
        <button
          className="p-3 mb-2 relative flex flex-col items-center justify-center duration-300"
          onClick={() => playSound(key, 0.7)}
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
        <Keyboard
          height={120}
          blackKeyHeight={83}
          blackKeyColor="#3C3D70"
          whiteKeyColor="#cbd5e1"
          whiteKeyWidth={40}
          blackKeyWidth={35}
          keySpacing={4}
          borderRadius={10}
          sound={false}
          startNote="C3"
          endNote="B4"
          onKeyPress={(key) => {
            setSelectedKey(key);
          }}
          whiteKeyClass="white-key"
          blackKeyClass="black-key"
        />
        {gameOver && (
          <GameOver
            user={user}
            score={score}
            onRetry={() => {
              setKey(allKeys[random(0, allKeys.length - 1)]);
              setSelectedKey("");
              setScore(0);
              setMistakes(0);
              setGameOver(false);
            }}
          />
        )}
      </div>
    </main>
  );
};

export default TestPerfect;
