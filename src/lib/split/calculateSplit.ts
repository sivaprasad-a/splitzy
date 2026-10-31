export interface SplitResult {
  shares: Record<string, number>;
  /** Sum of shares, in cents. Always equals the input total when valid. */
  totalCents: number;
  valid: boolean;
  error?: string;
}

function ok(shares: Record<string, number>): SplitResult {
  const totalCents = Object.values(shares).reduce((sum, v) => sum + v, 0);
  return { shares, totalCents, valid: true };
}

function fail(error: string): SplitResult {
  return { shares: {}, totalCents: 0, valid: false, error };
}

/**
 * Splits `totalCents` equally across `participantIds`. Distributes the
 * leftover cent(s) from integer division to the first participants in
 * list order, so every run of the same inputs produces the same result.
 */
export function splitEqual(totalCents: number, participantIds: string[]): SplitResult {
  if (participantIds.length === 0) return fail("Select at least one participant.");
  const base = Math.floor(totalCents / participantIds.length);
  const remainder = totalCents - base * participantIds.length;

  const shares: Record<string, number> = {};
  participantIds.forEach((id, i) => {
    shares[id] = base + (i < remainder ? 1 : 0);
  });
  return ok(shares);
}

/**
 * Splits `totalCents` by percentage. Percentages must sum to 100 (within
 * a small tolerance for decimals). Rounding remainder goes to the
 * participant with the largest percentage, breaking ties by list order.
 */
export function splitByPercentage(
  totalCents: number,
  percentages: Record<string, number>,
): SplitResult {
  const ids = Object.keys(percentages);
  if (ids.length === 0) return fail("Select at least one participant.");

  const sum = ids.reduce((s, id) => s + percentages[id], 0);
  if (Math.abs(sum - 100) > 0.01) {
    return fail(`Percentages must total 100% (currently ${sum.toFixed(2)}%).`);
  }

  const raw = ids.map((id) => ({ id, exact: (totalCents * percentages[id]) / 100 }));
  const shares: Record<string, number> = {};
  let allocated = 0;
  for (const { id, exact } of raw) {
    const cents = Math.floor(exact);
    shares[id] = cents;
    allocated += cents;
  }

  let remainder = totalCents - allocated;
  const byFractionDesc = [...raw].sort((a, b) => b.exact - Math.floor(b.exact) - (a.exact - Math.floor(a.exact)));
  for (const { id } of byFractionDesc) {
    if (remainder <= 0) break;
    shares[id] += 1;
    remainder -= 1;
  }

  return ok(shares);
}

/** Exact amounts per participant. Must sum to the total exactly. */
export function splitExact(totalCents: number, amounts: Record<string, number>): SplitResult {
  const ids = Object.keys(amounts);
  if (ids.length === 0) return fail("Select at least one participant.");

  const sum = ids.reduce((s, id) => s + amounts[id], 0);
  if (sum !== totalCents) {
    return fail(
      `Amounts must total ${(totalCents / 100).toFixed(2)} (currently ${(sum / 100).toFixed(2)}).`,
    );
  }
  return ok({ ...amounts });
}

/**
 * Splits `totalCents` proportionally to each participant's share count
 * (e.g. 2 shares = twice 1 share). Remainder distributed to the
 * participants with the largest fractional remainder, in list order on ties.
 */
export function splitByShares(totalCents: number, shareCounts: Record<string, number>): SplitResult {
  const ids = Object.keys(shareCounts);
  if (ids.length === 0) return fail("Select at least one participant.");

  const totalShares = ids.reduce((s, id) => s + shareCounts[id], 0);
  if (totalShares <= 0) return fail("At least one participant needs a share greater than 0.");

  const raw = ids.map((id) => ({ id, exact: (totalCents * shareCounts[id]) / totalShares }));
  const shares: Record<string, number> = {};
  let allocated = 0;
  for (const { id, exact } of raw) {
    const cents = Math.floor(exact);
    shares[id] = cents;
    allocated += cents;
  }

  let remainder = totalCents - allocated;
  const byFractionDesc = [...raw].sort((a, b) => b.exact - Math.floor(b.exact) - (a.exact - Math.floor(a.exact)));
  for (const { id } of byFractionDesc) {
    if (remainder <= 0) break;
    shares[id] += 1;
    remainder -= 1;
  }

  return ok(shares);
}
