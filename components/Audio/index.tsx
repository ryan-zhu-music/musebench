import { useState, useEffect } from "react";
import { Song, Track, Instrument, Effect } from "reactronica";

interface Props {
  melody: any;
  isPlaying: boolean;
  bpm: number;
  setIsPlaying: (isPlaying: boolean) => void;
}

const Audio: React.FC<Props> = ({ melody, isPlaying, bpm, setIsPlaying }) => {
  return (
    <main>
      <Song isPlaying={isPlaying} bpm={bpm} volume={1} isMuted={false}>
        <Track
          steps={melody}
          onStepPlay={(step) => {
            if (!step[0].name) {
              setIsPlaying(false);
            }
          }}
        >
          <Instrument
            type="synth"
            polyphony={1}
            oscillator={{ type: "sine" }}
          />
        </Track>
      </Song>
    </main>
  );
};

export default Audio;
