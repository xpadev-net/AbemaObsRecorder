const typeGuard = {
  hello: (i: unknown): i is pHello =>
    typeof i === "object" && (i as pHello).op === 0,
  identified: (i: unknown): i is pIdentified =>
    typeof i === "object" && (i as pIdentified).op === 2,
};
export { typeGuard };
