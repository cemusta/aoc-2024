export const parseInput = (input: string) => {
  const data = Deno.readTextFileSync(input).split("\n\n");

  const rules: Record<string, string[]> = {};
  data[0]
    .split("\n")
    .map((e) => e.split("|"))
    .forEach((e) => {
      // read rules
      // deno-lint-ignore no-prototype-builtins
      if (rules.hasOwnProperty(e[0])) {
        rules[e[0]] = [...rules[e[0]], e[1]];
      } else {
        rules[e[0]] = [e[1]];
      }
    });
  const updates = data[1].split("\n");

  return { rules, updates };
};

export const returnMiddlePage = (pages: string[]): string => {
  if (pages.length % 2 === 0) throw new Error("Updates is not even");

  return pages[Math.floor(pages.length / 2)];
};

export const checkRules = (
  updates: string[],
  rules: Record<string, string[]>
): boolean => {
  const pages = [...updates];
  const iter = pages.length - 1;

  for (let i = 0; i < iter; i++) {
    const curr = pages.shift();
    if (!curr) return true;

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
};

export const fixPages = (update: string[], rules: Record<string, string[]>) => {
  const pages = [...update];

  const sortedArray = pages.toSorted((a, b) => {
    if (rules[a]?.includes(b)) {
      return 1;
    } else if (rules[b]?.includes(a)) {
      return -1;
    } else {
      return 0;
    }
  });

  return sortedArray.toReversed();
};
