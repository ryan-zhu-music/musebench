import React from "react";
import { IoClose } from "react-icons/io5";
import { tests } from "../../data/tests";

interface Props {
  title: string;
  onClose: () => void;
}

const Info: React.FC<Props> = ({ title, onClose }) => {
  const test: any = tests.find((test) => test.title === title);

  return (
    <main className="absolute w-full h-full flex flex-col items-center justify-evenly backdrop-blur-md bg-slate-600/50 z-10 rounded-3xl p-10">
      <header className="w-full h-1/5 flex items-start justify-between self-start px-5">
        <div className="w-1/5" />
        <div className="flex flex-col items-center justify-center w-3/5">
          <h1>{test.title}</h1>
          <p>{test.subtitle}</p>
        </div>
        <button
          className="flex flex-col items-end w-1/5 pr-10"
          onClick={() => onClose()}
        >
          <IoClose size={40} className="text-slate-200 glow" />
        </button>
      </header>
      <div className="flex flex-col h-full text-center justify-evenly items-center py-10">
        {test.description.map((paragraph: string, i: number) => (
          <p
            key={i}
            className={`text-lg text-slate-200 ${
              i === test.description.length - 1 ? "font-bold" : "font-normal"
            }`}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </main>
  );
};

export default Info;
