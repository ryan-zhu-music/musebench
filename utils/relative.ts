import { wRandom } from "./random";

import noteGenerations from "../data/noteGenerations";

import { allKeys } from "../data/keys";

const melodyGenerator = (stage: any, key: any, tonality: any) => {
  if (stage >= 4) {
    tonality = "atonal";
    if (stage > 8) {
      stage = 8;
    }
  }

  while (true) {
    let melody = [12];
    for (let i = 1; i < noteGenerations[`stage${stage}`].length - 1; i++) {
      let note = wRandom(
        noteGenerations[`stage${stage}`][tonality][melody[i - 1]]
      );
      melody.push(note);
    }
    melody.push(12);

    // check if melody is in key
    if (tonality == "major" && ![9, 16, 21].some((x) => melody.includes(x))) {
      continue;
    }
    if (tonality == "minor" && ![8, 15, 20].some((x) => melody.includes(x))) {
      continue;
    }

    // transpose melody to key
    let transposition = allKeys.indexOf(key) - 12;
    try {
      let transposedMelody = melody.map(
        (note: number) => allKeys[note + transposition]
      );
      transposedMelody.push("");
      return transposedMelody;
    } catch (error) {
      // melody is out of range
      console.log(error);
    }
  }
};

export default melodyGenerator;
