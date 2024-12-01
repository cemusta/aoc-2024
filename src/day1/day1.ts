import * as log from "@std/log";

function parseInput(input: string): { L: number[]; R: number[] } {
  const data = Deno.readTextFileSync(input);

  const L: number[] = [];
  const R: number[] = [];

  data.split("\n").map((line) => {
    const vals = line.split("  ").map((value) => Number(value));
    L.push(vals[0]);
    R.push(vals[1]);
  });

  L.sort((a, b) => a - b);
  R.sort((a, b) => a - b);
  return { L, R };
}

export function part1(input: string): number {
  const { L, R } = parseInput(input);

  let distance = 0;

  for (let i = 0; i < L.length; i++) {
    distance += Math.abs(L[i] - R[i]);
  }

  log.info(`distance: ${distance}`);

  return distance; // Placeholder return value
}

export function part2(input: string): number {
  const { L, R } = parseInput(input);

  let similarity = 0;

  for (const Li of L) {
    similarity += Li * R.filter((i) => i === Li).length;
  }

  log.info(`similarity: ${similarity}`);

  return similarity; // Placeholder return value
}

if (import.meta.main) {
  part1("./src/day1/input1.txt");
  part2("./src/day1/input1.txt");
}
