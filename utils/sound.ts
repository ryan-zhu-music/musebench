import * as Tone from "tone";

export const playSound = (sound: string | number, duration: number = 0.7) => {
  const synth = new Tone.Synth().toDestination();
  const now = Tone.now();
  synth.triggerAttack(sound, now);
  synth.triggerRelease(now + duration);
};

export const playMelody = (
  melody: any,
  duration: number = 0.7,
  harmonic: boolean = false
) => {
  if (harmonic) {
    melody.forEach((note: any) => {
      playSound(note, duration);
    });
  } else {
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    melody.forEach((note: any, index: number) => {
      synth.triggerAttackRelease(note, duration, now + index * duration);
    });
  }
};
