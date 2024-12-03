import * as log from "@std/log";

function parseInput(input: string): string {
  return Deno.readTextFileSync(input);
}

function parseMemory(input: string): { ops: string; a: number; b: number } {
  const ops = input.split("(")[0];
  const rest = input.split("(")[1];
  const a = Number(rest.split(",")[0]);
  const b = Number(rest.split(",")[1].split(")")[0]);
  return { ops, a, b };
}

function mul(a: number, b: number): number {
  return a * b;
}

export function part1(input: string): number {
  const commandMemory = parseInput(input);

  //use regex mul\(\d{1,3},\d{1,3}\)
  const regex = /mul\(\d{1,3},\d{1,3}\)/g;

  const matches = commandMemory.match(regex);

  const ops = matches?.map((match) => parseMemory(match));

  log.debug(ops);

  const sum = ops?.reduce((acc, op) => {
    return acc + mul(op.a, op.b);
  }, 0);

  log.info(`Sum: ${sum}`);

  return sum ?? 0;
}

export function part2(input: string): number {
  const commandMemory = parseInput(input);

  //use regex mul\(\d{1,3},\d{1,3}\)
  const regex = /mul\(\d{1,3},\d{1,3}\)/g;

  const matches = commandMemory.match(regex);

  const ops = matches?.map((match) => parseMemory(match));

  log.debug(ops);

  const sum = ops?.reduce((acc, op) => {
    return acc + mul(op.a, op.b);
  }, 0);

  log.info(`Sum: ${sum}`);

  return sum ?? 0;
}

if (import.meta.main) {
  // part1("./src/day3/input.txt");
  part2("./src/day3/sample1.txt");
}
