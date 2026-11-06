type Recording = { title: string; detail: string };

type RecorderSetting = { label: string; value: string };

export const recorder = {
  newRecording: "New Recording",
  caption: "Recordings",
  recordings: [
    { title: "Keynote rehearsal", detail: "Nov 4, 2026, 20:15 · 12:48" },
    { title: "Interview", detail: "Nov 3, 2026, 16:02 · 18:42" },
    {
      title: "Recording 2026-11-02 09.30.11",
      detail: "Nov 2, 2026, 09:30 · 1:05",
    },
    { title: "Standup notes", detail: "Oct 30, 2026, 10:00 · 6:21" },
    { title: "Older memo", detail: "Oct 27, 2026, 22:41 · 0:48" },
  ],
  status: "Enhanced by cpu",
  clock: "1:24",
  sectionTitle: "Recording",
  settings: [
    { label: "Input", value: "System default" },
    { label: "Enhancement", value: "Noise reduction" },
    { label: "Format", value: "Opus" },
  ],
  waveform: { bars: 107, seed: 29 },
} as const satisfies {
  newRecording: string;
  caption: string;
  recordings: readonly Recording[];
  status: string;
  clock: string;
  sectionTitle: string;
  settings: readonly RecorderSetting[];
  waveform: { bars: number; seed: number };
};
