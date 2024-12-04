import { expect } from "jsr:@std/expect";
import { part1, part2 } from "./day4.ts";
import * as log from "@std/log";

log.setup({
  loggers: {
    default: {
      level: undefined,
    },
  },
});

Deno.test("Day4 - part1 should find correct result", () => {
  const result = part1("./src/day4/sample1.txt");
  expect(result).toBe(18);
});

Deno.test("Day4 - part2 should find correct result", () => {
  const result = part2("./src/day4/sample1.txt");
  expect(result).toBe(9);
});
