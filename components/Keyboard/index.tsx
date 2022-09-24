const Keyboard = () => {
  const keySelect = (key: string) => {
    console.log("Selected key:", key);
  };

  return (
    <div className="h-[162px] bg-transparent relative flex flex-col rounded-lg">
      <div className="flex flex-row bg-transparent absolute h-[102px] px-[29px] z-10">
        {[
          "C#1/Db1",
          "D#1/Eb1",
          "F#1/Gb1",
          "G#1/Ab1",
          "A#1/Bb1",
          "C#2/Db2",
          "D#2/Eb2",
          "F#2/Gb2",
          "G#2/Ab2",
          "A#2/Bb2",
        ].map((key, index) => (
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
        {[
          "C1",
          "D1",
          "E1",
          "F1",
          "G1",
          "A1",
          "B1",
          "C2",
          "D2",
          "E2",
          "F2",
          "G2",
          "A2",
          "B2",
        ].map((key, index) => (
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
                  : "",
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
