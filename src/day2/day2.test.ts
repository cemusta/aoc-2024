import { expect } from "jsr:@std/expect";
import { part1, part2 } from "./day2.ts";
import * as log from "@std/log";

log.setup({
  loggers: {
    default: {
      level: undefined,
    },
  },
});

Deno.test("Day2 - part1 should find correct result", () => {
  const result = part1("./src/day2/sample2.txt");
  expect(result).toBe(2);
});

Deno.test("Day2 - part2 should find correct result", () => {
  const result = part2("./src/day2/sample2.txt");
  expect(result).toBe(4);
});
