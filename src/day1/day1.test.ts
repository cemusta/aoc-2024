import { expect } from "jsr:@std/expect";
import { part1, part2 } from "./day1.ts";

Deno.test("part1 should find correct result", () => {
  const result = part1("./src/day1/sample1.txt");
  expect(result).toBe(11);
});

Deno.test("part2 should find correct result", () => {
  const result = part2("./src/day1/sample1.txt");
  expect(result).toBe(31);
});
