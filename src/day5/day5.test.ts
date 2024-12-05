import { expect } from "jsr:@std/expect";
import { part1 } from "./day5.ts";
import * as log from "@std/log";

log.setup({
  loggers: {
    default: {
      level: undefined,
    },
  },
});

Deno.test("Day5 - part1 should find correct result", () => {
  const result = part1("./src/day5/sample1.txt");
  expect(result).toBe(143);
});

// Deno.test("Day5 - part2 should find correct result", () => {
//   const result = part2("./src/day1/sample1.txt");
//   expect(result).toBe(31);
// });
