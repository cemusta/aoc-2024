import * as log from "@std/log";

function parseInput(input: string) {
  const data = Deno.readTextFileSync(input).split("\n\n");

  const rules: Record<string, string[]> = {};
  data[0]
    .split("\n")
    .map((e) => e.split("|"))
    .forEach((e) => {
      // read rules
      if (rules.hasOwnProperty(e[0])) {
        rules[e[0]] = [...rules[e[0]], e[1]];
      } else {
        rules[e[0]] = [e[1]];
      }
    });
  const updates = data[1].split("\n");

  return { rules, updates };
}

function returnMiddlePage(update: string): string {
  const pages = update.split(",");

  if (pages.length % 2 === 0) throw new Error("Updates is not even");

  return pages[Math.floor(pages.length / 2)];
}

function checkRules(update: string, rules: Record<string, string[]>): boolean {
  const pages = update.split(",");
  const iter = pages.length - 1;

  for (let i = 0; i < iter; i++) {
    const curr = pages.shift();
    if (!curr) return true;

    // console.log(i, curr, pages);

    const check = pages.every((e) => {
      if (!rules[e]) return true;
      if (rules[e].includes(curr)) {
        return false;
      }
      return true;
    });

    if (!check) return false;
  }

  return true;
}

export function part1(input: string): number {
  const { rules, updates } = parseInput(input);

  let sum = 0;

  for (const update of updates) {
    if (checkRules(update, rules)) sum += Number(returnMiddlePage(update));
  }

  log.info(`Day 5 - Part 1: ${sum}`);

  return sum;
}

if (import.meta.main) {
  part1("./src/day5/input.txt");
  // part2("./src/day1/input.txt");
}
