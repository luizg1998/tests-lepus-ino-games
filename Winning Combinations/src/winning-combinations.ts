type WinningCombinationsResult = [number, number[]][];

function call(lines: number[]): WinningCombinationsResult {
  const winningLine: WinningCombinationsResult = [];

  let current!: number;
  let payline: number[] = [];
  let wildcards = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] >= 10) {
      continue;
    }
    const num = lines[i];

    if (!current) {
      current = num;
      if (i === 0 && num !== 0) {
        payline.push(i);
        continue;
      }
    }

    if (num === current || num === 0) {
      payline.push(i);
      if (num === 0) {
        wildcards.push(i);
      } else {
        wildcards = [];
      }
    } else {
      if (payline.length >= 3) {
        winningLine.push([current, payline]);
      }
      current = num;
      payline = [...wildcards];
      payline.push(i);
      wildcards = [];
    }

    if (i === lines.length - 1 && payline.length >= 3) {
      winningLine.push([current, payline]);
    }
  }

  return winningLine;
}
export const WinningCombinations = { call };
