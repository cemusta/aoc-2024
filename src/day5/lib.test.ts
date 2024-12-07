import { expect } from "jsr:@std/expect";
import { parseInput, returnMiddlePage, checkRules, fixPages } from "./lib.ts";

const { updates, rules } = parseInput("./src/day5/sample1.txt");

const example4 = ["75", "97", "47", "61", "53"];
const example5 = ["61", "13", "29"];
const example6 = ["97", "13", "75", "29", "47"];

Deno.test("Day5 - libs - returnMiddlePage", () => {
  expect(returnMiddlePage(["1", "2", "3"])).toBe("2");

  expect(returnMiddlePage(example4)).toBe("47");
  expect(returnMiddlePage(example5)).toBe("13");
  expect(returnMiddlePage(example6)).toBe("75");
});

Deno.test("Day5 - libs - checkRules", () => {
  expect(checkRules(updates[0].split(","), rules)).toBe(true);
  expect(checkRules(updates[1].split(","), rules)).toBe(true);
  expect(checkRules(updates[2].split(","), rules)).toBe(true);

  expect(checkRules(example4, rules)).toBe(false);
  expect(checkRules(example5, rules)).toBe(false);
  expect(checkRules(example6, rules)).toBe(false);
});

Deno.test("Day5 - libs - fixPages", () => {
  expect(fixPages(["75", "97", "47", "61", "53"], rules)).toStrictEqual(["97", "75", "47", "61", "53"]);
  expect(fixPages(["61", "13", "29"], rules)).toStrictEqual(["61", "29", "13"]);
  expect(fixPages(["97", "13", "75", "29", "47"], rules)).toStrictEqual(["97", "75", "47", "29", "13"]);
});
