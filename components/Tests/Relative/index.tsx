import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../../Navbar";
import { IoClose } from "react-icons/io5";
import Audio from "../../Audio";
import melodyGenerator from "../../../utils/relative";
import { Keyboard } from "react-music-keyboard";
import { random } from "../../../utils/random";
import { allKeys } from "../../../data/keys";
import PageHead from "../../PageHead";
import Button from "../../Button";
import { getScores, updateScores } from "../../../utils/db";
interface Props {
  auth: any;
  user: any;
  signIn: () => void;
}

const TestRelative: React.FC<Props> = ({ auth, user, signIn }) => {
  const [mistakes, setMistakes] = useState(0);
  const [melody, setMelody] = useState(melodyGenerator(0, "C4", "major"));
  const [isPlaying, setIsPlaying] = useState(false);
  const [levelState, setLevelState] = useState([0, "C4", "major"]);
  const [userMelody, setUserMelody] = useState<any>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (userMelody.length === melody.length - 1) {
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
      setIsPlaying(false);
    }
    if (mistakes >= 3) {
      setGameOver(true);

      if (user) {
        getScores(user.email).then((res) => {
          let scores = { ...res }.scores;
          if (score > scores.relative) {
            scores.relative = score;
            updateScores(user.email, scores);
            console.log(user.email, scores);
          }
        });
      }
    }
  }, [userMelody]);
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
      <PageHead />
      <div className="w-full h-full px-20">
        <div
          className="w-full h-full flex flex-col relative justify-around items-center rounded-3xl py-5"
          style={{
            background: "rgba(63, 71, 101, 0.23)",
            boxShadow:
              "0px 0px 40px rgba(121, 159, 255, 0.4), 0px 0px 5px 1px rgba(219, 225, 255, 0.75)",
          }}
        >
          <header className="w-full flex items-start justify-between px-5">
            <div className="w-1/5" />
            <div className="flex flex-col items-center justify-center w-3/5">
              <h1>Relative</h1>
              <p>{"Play back a melody!"}</p>
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
          <div>
            <Audio
              melody={melody}
              isPlaying={isPlaying}
              bpm={90}
              setIsPlaying={setIsPlaying}
            />
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
                <p className="absolute text-[#3C3D70] text-4xl pr-4 font-extrabold">
                  {score}
                </p>
              </button>
            </div>
          </div>
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
            sound={true}
            duration={0.5}
            onKeyPress={(key) => {
              setUserMelody([...userMelody, key]);
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
                    setScore(0);
                    setMistakes(0);
                    setLevelState([0, "C4", "major"]);
                    setMelody(melodyGenerator(0, "C4", "major"));
                    setUserMelody([]);
                    setIsPlaying(false);
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

export default TestRelative;
