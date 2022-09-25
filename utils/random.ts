export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const wRandom = (array: any) => {
  if (!array) {
    return;
  }
  let keys: any = Object.keys(array);
  let values: any = Object.values(array);
  let table: any = [];
  for (let i = 0; i < keys.length; i++) {
    for (let j = 0; j < values[i]; j++) {
      table.push(parseInt(keys[i]));
    }
  }
  const result = table[Math.floor(Math.random() * table.length)];
  return result;
};
