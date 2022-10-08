import useWindowSize from "../../hooks/useWindowSize";
import { IoClose } from "react-icons/io5";

type Props = {
  mistakes: number;
};
const Mistakes: React.FC<Props> = ({ mistakes }) => {
  const { width } = useWindowSize();
  return (
    <div className="flex flex-row md:flex-col items-end justify-center w-full md:w-1/5 md:pr-10">
      {Array.from({ length: 3 }, (_, i) => (
        <IoClose
          size={width * 0.02 + 24}
          key={i}
          className={i < mistakes ? "text-red-300" : "text-slate-200"}
        />
      ))}
    </div>
  );
};

export default Mistakes;
