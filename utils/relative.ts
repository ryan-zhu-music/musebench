import { wRandom } from "./random";

import { noteGenerations } from "../data/noteGenerations";

const keys = [
  "C3",
  "C#3",
  "D3",
  "D#3",
  "E3",
  "F3",
  "F#3",
  "G3",
  "G#3",
  "A3",
  "A#3",
  "B3",
  "C4",
  "C#4",
  "D4",
  "D#4",
  "E4",
  "F4",
  "F#4",
  "G4",
  "G#4",
  "A4",
  "A#4",
  "B4",
];

const melodyGenerator = (stage: any, key: any, tonality: any) => {
  while (true) {
    let melody = [12];
    for (let i = 1; i < noteGenerations[`stage${stage}`].length - 1; i++) {
      let note = wRandom(
        noteGenerations[`stage${stage}`][tonality][melody[i - 1]]
      );
      melody.push(note);
    }
    melody.push(12);
    let transposition = keys.indexOf(key) - 12;
    try {
      let transposedMelody = melody.map(
        (note: number) => keys[note + transposition]
      );
      transposedMelody.push("");
      return transposedMelody;
    } catch (error) {
      console.log(error);
    }
  }
};

export default melodyGenerator;
