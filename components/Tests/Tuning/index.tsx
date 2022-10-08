import { useEffect, useState } from "react";
import Image from "next/image";
import { FaQuestion } from "react-icons/fa";

import { getScores, updateScores } from "../../../utils/db";
import { playSound } from "../../../utils/sound";
import { random } from "../../../utils/random";
import Info from "../../Info";
import GameOver from "../../GameOver";
import Mistakes from "../../Mistakes";

import useWindowSize from "../../../hooks/useWindowSize";

interface Props {
  user: any;
}

const TestTuning: React.FC<Props> = ({ user }) => {
  const [mistakes, setMistakes] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [frequencies, setFrequencies] = useState<any>([]);
  const [guess, setGuess] = useState("");

  const [infoOpen, setInfoOpen] = useState(false);

  const { width, height } = useWindowSize();

  useEffect(() => {
    const f1 = random(400, 600);
    const variance = 200 / (score + 5) + 5;
    const f2 = f1 + random(-variance, variance);
    setFrequencies([f1, f2]);
  }, []);

  useEffect(() => {
    if (mistakes >= 3) {
      setGameOver(true);
      if (user) {
        getScores(user.email).then((res) => {
          updateScores(user.email, score, "tuning", res);
        });
      }
    } else if (guess.length > 0) {
      if (
        (guess === "higher" && frequencies[0] < frequencies[1]) ||
        (guess === "lower" && frequencies[0] > frequencies[1])
      ) {
        setScore(score + 1);
      } else {
        setMistakes(mistakes + 1);
      }
      setGuess("");
      setScore(score + 1);
      const f1 = random(400, 600);
      const variance = 200 / (score + 5) + 5;
      const f2 = f1 + random(-variance, variance);
      setFrequencies([f1, f2]);
    }
  }, [guess]);

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
        <div className="w-full px-10 flex flex-row h-1/3 justify-center items-center">
          {["Reference", "Pitch"].map((name, i) => (
            <div
              className="flex flex-col w-1/5 h-full justify-center items-center mx-5 md:mx-10"
              key={`${name}-${i}`}
            >
              <h4 className="text-lg md:text-2xl">{name}</h4>
              <button
                className="p-3 mb-2 w-full h-full relative flex flex-col items-center justify-center duration-300"
                onClick={() => playSound(frequencies[i], 0.5)}
              >
                <Image
                  src="/assets/icons/Play Button.png"
                  alt="Play Button"
                  className="object-contain h-full w-full play-button"
                  layout="intrinsic"
                  width={90}
                  height={90}
                />
              </button>
            </div>
          ))}
        </div>
        <div className="w-full px-10 h-1/4 flex flex-row justify-center items-center">
          <button
            className="p-3 mb-2 relative flex flex-col items-center justify-center duration-300 -rotate-90 higher-button"
            onClick={() => setGuess("higher")}
          >
            <Image
              src="/assets/icons/Play Button.png"
              alt="Play Button"
              className="object-contain h-full w-full"
              layout="intrinsic"
              width={90}
              height={90}
            />
          </button>
          <button
            className="p-3 mb-2 relative flex flex-col items-center justify-center duration-300 rotate-90 lower-button"
            onClick={() => setGuess("lower")}
          >
            <Image
              src="/assets/icons/Play Button.png"
              alt="Play Button"
              className="object-contain h-full w-full"
              layout="intrinsic"
              width={90}
              height={90}
            />
          </button>
        </div>

        {gameOver && (
          <GameOver
            user={user}
            score={score}
            onRetry={() => {
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

export default TestTuning;
