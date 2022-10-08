import { useEffect, useState } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa";
import { Keyboard } from "react-music-keyboard";

import Info from "../../Info";

import melodyGenerator from "../../../utils/relative";
import { playMelody } from "../../../utils/sound";
import { random } from "../../../utils/random";
import { getScores, updateScores } from "../../../utils/db";
import { allKeys } from "../../../data/keys";
import GameOver from "../../GameOver";

import useWindowSize from "../../../hooks/useWindowSize";
import Mistakes from "../../Mistakes";
interface Props {
  user: any;
}

const TestRelative: React.FC<Props> = ({ user }) => {
  const [mistakes, setMistakes] = useState(0);
  const [melody, setMelody] = useState(melodyGenerator(0, "C4", "major"));
  const [levelState, setLevelState] = useState([0, "C4", "major"]);
  const [userMelody, setUserMelody] = useState<any>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const { width, height } = useWindowSize();

  useEffect(() => {
    if (userMelody.length === melody.length) {
      if (
        !userMelody.every((note: any, index: number) => note === melody[index])
      ) {
        setMistakes(mistakes + 1);
        setUserMelody([]);
      } else {
        setScore(score + 1);
      }
      const newLevel = [
        Math.floor(score / 5),
        allKeys.slice(4, 16)[random(0, 11)],
        ["major", "minor"][random(0, 1)],
      ];
      setLevelState(newLevel);
      setMelody(melodyGenerator(newLevel[0], newLevel[1], newLevel[2]));
      setUserMelody([]);
    }
    if (mistakes >= 3) {
      setGameOver(true);
      if (user) {
        getScores(user.email).then((res) => {
          updateScores(user.email, score, "relative", res);
        });
      }
    }
  }, [userMelody]);

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
        {infoOpen && (
          <Info title="Perfect" onClose={() => setInfoOpen(false)} />
        )}
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
            <h1 className="text-2xl md:text-4xl">Relative</h1>
            <p className="text-center w-5/6">{"Play back a melody!"}</p>
          </div>
          <div className="w-1/6 md:w-0" />
          <Mistakes mistakes={mistakes} />
        </header>
        <div>
          <div className="flex flex-col justify-center items-center">
            <h4 className="pb-2 text-lg">
              Key:{" "}
              {String(levelState[1]).substring(
                0,
                String(levelState[1]).length - 1
              ) +
                " " +
                levelState[2]}
            </h4>
            <button
              className="p-3 mb-2 relative flex flex-col items-center justify-center duration-300"
              onClick={() => playMelody(melody)}
            >
              <Image
                src="/assets/icons/Play Button.png"
                alt="Play Button"
                className="object-contain h-full w-full play-button"
                layout="intrinsic"
                width={100}
                height={100}
              />
              <p className="absolute text-[#3C3D70] text-4xl pr-4 font-extrabold">
                {score}
              </p>
            </button>
          </div>
        </div>
        {width < 600 && (
          <Keyboard
            height={80}
            blackKeyHeight={55}
            blackKeyColor="#3C3D70"
            whiteKeyColor="#cbd5e1"
            whiteKeyWidth={34}
            blackKeyWidth={28}
            keySpacing={3}
            borderRadius={10}
            sound={true}
            startNote="C4"
            endNote="B4"
            onKeyPress={(key) => {
              setUserMelody([...userMelody, key]);
            }}
            whiteKeyClass="white-key"
            blackKeyClass="black-key"
            containerStyles={{ marginBottom: 10 }}
          />
        )}
        <Keyboard
          height={width < 600 ? 80 : 115}
          blackKeyHeight={width < 600 ? 55 : 80}
          blackKeyColor="#3C3D70"
          whiteKeyColor="#cbd5e1"
          whiteKeyWidth={34}
          blackKeyWidth={28}
          keySpacing={3}
          borderRadius={10}
          sound={true}
          startNote="C3"
          endNote={width < 600 ? "B3" : "B4"}
          onKeyPress={(key) => {
            setUserMelody([...userMelody, key]);
          }}
          whiteKeyClass="white-key"
          blackKeyClass="black-key"
        />
        {gameOver && (
          <GameOver
            user={user}
            score={score}
            onRetry={() => {
              setScore(0);
              setMistakes(0);
              setLevelState([0, "C4", "major"]);
              setMelody(melodyGenerator(0, "C4", "major"));
              setUserMelody([]);
              setGameOver(false);
            }}
          />
        )}
      </div>
    </main>
  );
};

export default TestRelative;
