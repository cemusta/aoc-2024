import * as log from "@std/log";
import { checkRules, fixPages, parseInput, returnMiddlePage } from "./lib.ts";

export function part1(input: string): number {
  const { rules, updates } = parseInput(input);

  let sum = 0;

  for (const update of updates) {
    if (checkRules(update.split(","), rules))
      sum += Number(returnMiddlePage(update.split(",")));
  }

  log.info(`Day 5 - Part 1: ${sum}`);

  return sum;
}

export function part2(input: string): number {
  const { rules, updates } = parseInput(input);

  let sum = 0;

  for (const update of updates) {
    if (checkRules(update.split(","), rules)) continue;

    const fixed = fixPages(update.split(","), rules);

    sum += Number(returnMiddlePage(fixed));
  }

  log.info(`Day 5 - Part 2: ${sum}`);

  return sum;
}

if (import.meta.main) {
  part1("./src/day5/input.txt");
  part2("./src/day5/input.txt");
}
