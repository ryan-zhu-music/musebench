import { whiteKeys, blackKeys } from "../../data/keys";

interface Props {
  setSelectedKey: (key: string) => void;
}

const Keyboard: React.FC<Props> = ({ setSelectedKey }) => {
  const keySelect = (key: string) => {
    setSelectedKey(key);
  };

  return (
    <div className="h-[162px] bg-transparent relative flex flex-col rounded-lg">
      <div className="flex flex-row bg-transparent absolute h-[102px] px-[29px] z-10">
        {blackKeys.map((key, index) => (
          <button
            className={`w-[54px] h-full bg-[#3C3D70] hover:bg-[#7B7DB3] duration-300 ${
              [1, 4, 6].includes(index) ? "mr-[62px]" : "mr-[4px]"
            }`}
            style={{ borderRadius: "0px 0px 10px 10px" }}
            key={key}
            onClick={() => keySelect(key)}
          />
        ))}
      </div>
      <div className="flex flex-row w-full justify-between">
        {whiteKeys.map((key, index) => (
          <button
            className={`w-[54px] h-[162px] bg-slate-300 hover:bg-[#7B7DB3] duration-300 ${
              index !== 13 && "mr-[4px]"
            }`}
            style={{
              borderRadius:
                index === 0
                  ? "10px 0px 0px 10px"
                  : index === 13
                  ? "0px 10px 10px 0px"
                  : "0px",
            }}
            key={key}
            onClick={() => keySelect(key)}
          />
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
