const intervals: any = {
  stage0: [2, 4, 5, 7, 9, -2, -4, -5, -7, -9],
  stage1: [2, 3, 4, 5, 7, 8, 9, 11, 12, -2, -3, -4, -5, -7, -8, -9, -11, -12],
};

intervals.stage2 = [];

for (let i = 1; i <= 12; i++) {
  intervals.stage2.push(i);
  intervals.stage2.push(-i);
}

intervals.stage3 = [...intervals.stage2];
for (let i = 0; i < intervals.stage1.length; i++) {
  if (i < 9) {
    intervals.stage3.push(intervals.stage1[i] + 12);
  } else {
    intervals.stage3.push(intervals.stage1[i] - 12);
  }
}
intervals.stage4 = [];
for (let i = 1; i <= 24; i++) {
  intervals.stage4.push(i);
  intervals.stage4.push(-i);
}

intervals.stage5 = [];
for (let i = 1; i <= 36; i++) {
  intervals.stage5.push(i);
  intervals.stage5.push(-i);
}

export default intervals;

export const intervalNames: any = {
  m2: 1,
  M2: 2,
  m3: 3,
  M3: 4,
  P4: 5,
  x4: 6,
  P5: 7,
  m6: 8,
  M6: 9,
  m7: 10,
  M7: 11,
  P8: 12,
  m9: 13,
  M9: 14,
  m10: 15,
  M10: 16,
  P11: 17,
  x11: 18,
  P12: 19,
  m13: 20,
  M13: 21,
  m14: 22,
  M14: 23,
  P15: 24,
  x15: 25,
  P16: 26,
  m17: 27,
  M17: 28,
  m18: 29,
  M18: 30,
  P19: 31,
  x19: 32,
  P20: 33,
  m21: 34,
  M21: 35,
  m22: 36,
  M22: 37,
};
