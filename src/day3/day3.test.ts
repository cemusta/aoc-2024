import { expect } from "jsr:@std/expect";
import { part1, part2 } from "./day3.ts";
import * as log from "@std/log";

log.setup({
  loggers: {
    default: {
      level: undefined,
    },
  },
});

Deno.test("Day3 - part1 should find correct result", () => {
  const result = part1("./src/day3/sample1.txt");
  expect(result).toBe(161);
});

Deno.test("Day3 - part2 should find correct result", () => {
  const result = part2("./src/day3/sample2.txt");
  expect(result).toBe(48);
});
