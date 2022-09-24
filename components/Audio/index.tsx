import { useState, useEffect } from "react";
import { Song, Track, Instrument, Effect } from "reactronica";

interface Props {
  note: any;
  isPlaying: boolean;
  bpm: number;
}

const Audio: React.FC<Props> = ({ note, isPlaying, bpm }) => {
  return (
    <main>
      <Song isPlaying={isPlaying} bpm={bpm} volume={-2} isMuted={false}>
        <Track steps={note}>
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
