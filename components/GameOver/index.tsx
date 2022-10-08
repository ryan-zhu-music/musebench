import React from "react";
import Button from "../Button";

interface Props {
  user: any;
  score: number;
  onRetry: () => void;
}

const GameOver: React.FC<Props> = ({ user, score, onRetry }) => {
  return (
    <main className="absolute w-full h-full flex flex-col items-center justify-center backdrop-blur-lg bg-slate-900/50 z-10 rounded-3xl">
      <h2 className="text-3xl md:text-5xl font-bold">Game Over</h2>
      <p className="text-2xl">Your score: {score}</p>
      {!user && <p className="text-xl my-8">Sign in to save your scores!</p>}
      <div className="my-5">
        <Button text="Retry" onClick={() => onRetry()} />
      </div>
    </main>
  );
};

export default GameOver;
