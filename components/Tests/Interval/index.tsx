import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa";
import Image from "next/image";
import { getScores, updateScores } from "../../../utils/db";
import { playMelody } from "../../../utils/sound";
import { random } from "../../../utils/random";
import { allKeys } from "../../../data/keys";
import intervals, { intervalNames } from "../../../data/intervals";
import GameOver from "../../GameOver";
import Info from "../../Info";

interface Props {
  user: any;
}

const TestInterval: React.FC<Props> = ({ user }) => {
  const [mistakes, setMistakes] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [musicInterval, setMusicInterval] = useState<any>([]);
  const [guess, setGuess] = useState<any>({
    interval: "",
    quality: "",
  });
  const [harmonic, setHarmonic] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    const stage = `stage${Math.floor(score / 5)}`;
    const root = random(0, allKeys.length - 1);
    let levelInterval =
      root + intervals[stage][random(0, intervals[stage].length - 1)];
    while (levelInterval > allKeys.length - 1 || levelInterval < 0) {
      levelInterval =
        root + intervals[stage][random(0, intervals[stage].length - 1)];
    }
    setMusicInterval([
      allKeys[root],
      allKeys[levelInterval],
      Math.abs(levelInterval - root),
    ]);
  }, []);

  useEffect(() => {
    if (mistakes >= 3) {
      setGameOver(true);
      if (user) {
        getScores(user.email).then((res) => {
          updateScores(user.email, score, "intervals", res);
        });
      }
    }
    if (guess.interval && guess.quality) {
      const userGuess = intervalNames[guess.quality + guess.interval];
      if (userGuess === musicInterval[2]) {
        setScore(score + 1);
      } else {
        setMistakes(mistakes + 1);
      }
      setGuess({
        interval: "",
        quality: "",
      });
      const stage = `stage${Math.floor(score / 5)}`;
      const root = random(0, allKeys.length - 1);
      let levelInterval =
        root + intervals[stage][random(0, intervals[stage].length - 1)];
      while (levelInterval > allKeys.length - 1 || levelInterval < 0) {
        levelInterval =
          root + intervals[stage][random(0, intervals[stage].length - 1)];
      }
      setMusicInterval([
        allKeys[root],
        allKeys[levelInterval],
        Math.abs(levelInterval - root),
      ]);
      if (score > 9) {
        setHarmonic(!!random(0, score < 10 ? 0 : 1));
      }
    }
  }, [guess]);

  return (
    <main className="w-full h-full px-20">
      <div
        className="w-full h-full flex flex-col relative justify-around items-center rounded-3xl py-5"
        style={{
          background: "rgba(63, 71, 101, 0.23)",
          boxShadow:
            "0px 0px 40px rgba(121, 159, 255, 0.4), 0px 0px 5px 1px rgba(219, 225, 255, 0.75)",
        }}
      >
        {infoOpen && <Info title="Tuning" onClose={() => setInfoOpen(false)} />}
        <header className="w-full flex items-start justify-between px-5">
          <button className="w-1/5 pl-10" onClick={() => setInfoOpen(true)}>
            <FaQuestion
              size={30}
              className="text-indigo-200/40 hover:text-indigo-200/60 duration-200 glow"
            />
          </button>
          <div className="flex flex-col items-center justify-center w-3/5">
            <h1>Interval</h1>
            <p>{"Name the harmonic/melodic interval."}</p>
            <h3>{score}</h3>
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
          className="p-3 mb-2 relative flex flex-col items-center justify-center duration-300"
          onClick={() =>
            playMelody(
              musicInterval.slice(0, 2),
              40 / (7 * score + 40) + 0.15,
              harmonic
            )
          }
        >
          <Image
            src="/assets/icons/Play Button.png"
            alt="Play Button"
            className="object-contain h-full w-full play-button"
            layout="intrinsic"
            width={60}
            height={60}
          />
        </button>
        <div className="w-full flex flex-row justify-evenly items-start">
          <div className="w-1/2 flex flex-row flex-wrap justify-center items-center pl-4">
            <h4 className="w-full text-center">Quality</h4>
            {[
              ["Major", "M"],
              ["Minor", "m"],
              ["Perfect", "P"],
              ["Augmented", "x"],
            ].map((quality, i) => (
              <button
                key={i}
                className={`p-2 m-1 w-1/3 relative flex flex-col items-center justify-center duration-300 rounded-lg hover:bg-slate-200/50  ${
                  guess.quality === quality[1]
                    ? "bg-slate-100/60 hover:bg-slate-100/60"
                    : "bg-slate-100/20"
                }`}
                onClick={() =>
                  setGuess({ quality: quality[1], interval: guess.interval })
                }
              >
                <h4>{quality[0]}</h4>
              </button>
            ))}
          </div>
          <div className="w-1/2 flex flex-row items-center flex-wrap justify-center px-10">
            <h4 className="w-full text-center">Interval</h4>
            {Array.from(
              { length: score < 15 ? 8 : score < 25 ? 15 : 23 },
              (_, i) => (
                <button
                  key={i + 1}
                  className={`m-1 w-8 h-8 rounded-full duration-300 hover:bg-slate-200/50 ${
                    guess.interval === i + 1
                      ? "bg-slate-100/60 hover:bg-slate-100/60"
                      : "bg-slate-100/20"
                  }`}
                  onClick={() =>
                    setGuess({ interval: i + 1, quality: guess.quality })
                  }
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
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

export default TestInterval;
