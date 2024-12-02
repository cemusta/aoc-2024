import * as log from "@std/log";

function parseInput(input: string): { reports: number[][] } {
  const reports: number[][] = Deno.readTextFileSync(input)
    .split("\n")
    .map((line) => line.split(" ").map((value) => Number(value)));

  return { reports };
}

function safetyReport(report: number[]): boolean {
  const check: number[] = [];

  report.reduce((prev, curr) => {
    check.push(prev - curr);
    return curr;
  });

  const lowerSafe = check.every((value) => value < 0 && value > -4);
  const upperSafe = check.every((value) => value > 0 && value < 4);

  return lowerSafe || upperSafe;
}

function problemDampener(report: number[]): boolean {
  for (let i = 0; i < report.length; i++) {
    const newReport = [...report];
    newReport.splice(i, 1);
    if (safetyReport(newReport)) {
      return true;
    }
  }

  return false;
}

export function part1(input: string): number {
  const { reports } = parseInput(input);

  const safetyCheck = reports.map((report) => safetyReport(report));

  const safeCount = safetyCheck.filter((value) => value).length;

  log.info(`safeCount: ${safeCount}`);

  return safeCount;
}

export function part2(input: string): number {
  const { reports } = parseInput(input);

  const safetyCheck = reports.map((report) => problemDampener(report));

  const safeCount = safetyCheck.filter((value) => value).length;

  log.info(`safeCount with dampener: ${safeCount}`);

  return safeCount;
}

if (import.meta.main) {
  part1("./src/day2/input2.txt");
  part2("./src/day2/input2.txt");
}
