import { describe, expect, it } from "vitest";

import { splitByPercentage, splitByShares, splitEqual, splitExact } from "./calculateSplit";

describe("splitEqual", () => {
  it("splits evenly when it divides cleanly", () => {
    const result = splitEqual(10000, ["a", "b", "c", "d"]);
    expect(result.valid).toBe(true);
    expect(result.shares).toEqual({ a: 2500, b: 2500, c: 2500, d: 2500 });
    expect(result.totalCents).toBe(10000);
  });

  it("gives the leftover cents to the first participants in order", () => {
    const result = splitEqual(10, ["a", "b", "c"]);
    expect(result.shares).toEqual({ a: 4, b: 3, c: 3 });
    expect(result.totalCents).toBe(10);
  });

  it("fails with no participants", () => {
    expect(splitEqual(100, []).valid).toBe(false);
  });
});

describe("splitByPercentage", () => {
  it("splits proportionally and sums exactly to the total", () => {
    const result = splitByPercentage(10000, { a: 50, b: 30, c: 20 });
    expect(result.valid).toBe(true);
    expect(result.totalCents).toBe(10000);
    expect(result.shares.a + result.shares.b + result.shares.c).toBe(10000);
  });

  it("rejects percentages that don't sum to 100", () => {
    const result = splitByPercentage(10000, { a: 50, b: 30 });
    expect(result.valid).toBe(false);
  });

  it("handles a total that doesn't divide cleanly", () => {
    const result = splitByPercentage(14500, { a: 33.33, b: 33.33, c: 33.34 });
    expect(result.valid).toBe(true);
    expect(result.totalCents).toBe(14500);
  });
});

describe("splitExact", () => {
  it("accepts amounts that sum exactly to the total", () => {
    const result = splitExact(14500, { a: 5000, b: 4500, c: 5000 });
    expect(result.valid).toBe(true);
    expect(result.shares).toEqual({ a: 5000, b: 4500, c: 5000 });
  });

  it("rejects amounts that don't sum to the total", () => {
    const result = splitExact(14500, { a: 5000, b: 4500 });
    expect(result.valid).toBe(false);
  });
});

describe("splitByShares", () => {
  it("splits proportionally to share counts", () => {
    const result = splitByShares(10000, { a: 1, b: 1, c: 2 });
    expect(result.valid).toBe(true);
    expect(result.totalCents).toBe(10000);
    expect(result.shares.c).toBeGreaterThan(result.shares.a);
    expect(result.shares.a + result.shares.b + result.shares.c).toBe(10000);
  });

  it("fails when total shares is zero", () => {
    expect(splitByShares(10000, { a: 0, b: 0 }).valid).toBe(false);
  });
});
