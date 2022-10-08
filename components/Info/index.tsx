import React from "react";
import { IoClose } from "react-icons/io5";
import { tests } from "../../data/tests";
import useWindowSize from "../../hooks/useWindowSize";
interface Props {
  title: string;
  onClose: () => void;
}

const Info: React.FC<Props> = ({ title, onClose }) => {
  const test: any = tests.find((test) => test.title === title);

  const { width } = useWindowSize();

  return (
    <main className="absolute w-full h-full flex flex-col items-center justify-evenly backdrop-blur-lg bg-slate-900/50 z-50 rounded-3xl p-10">
      <header className="w-full h-1/5 flex items-start justify-between self-start md:px-5">
        <div className="w-1/6" />
        <div className="flex flex-col items-center justify-center w-2/3">
          <h1 className="text-3xl md:text-5xl">{test.title}</h1>
          <p className="italic text-center">{test.subtitle}</p>
        </div>
        <button
          className="flex flex-col items-end justify-end w-1/6 md:pr-10"
          onClick={() => onClose()}
        >
          <IoClose
            size={width < 768 ? 30 : 40}
            className="text-slate-200 glow"
          />
        </button>
      </header>
      <div className="flex flex-col h-full text-center justify-evenly items-center py-10">
        {test.description.map((paragraph: string, i: number) => (
          <p
            key={i}
            className={`text-md md:text-lg text-slate-200 ${
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
