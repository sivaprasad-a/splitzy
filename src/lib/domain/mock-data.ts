import type { Circle, Expense, Member, SettlementBalance } from "./types";

// Sample content mirrors docs/Splitzy_Screen_by_Screen_UX.pdf so the UI
// matches the design reference. Replace with real queries once the
// Circle/Expense/Settlement backend lands.

export const CURRENT_USER_ID = "you";

export const members: Member[] = [
  { id: "you", name: "You", initials: "YO" },
  { id: "alex", name: "Alex", initials: "AL" },
  { id: "jordan", name: "Jordan", initials: "JO" },
  { id: "samira", name: "Samira", initials: "SA" },
  { id: "nora", name: "Nora", initials: "NO" },
  { id: "chris", name: "Chris", initials: "CH" },
];

export const circles: Circle[] = [
  {
    id: "scottsdale-crew",
    name: "Scottsdale Crew",
    groupType: "friends",
    memberIds: ["you", "alex", "jordan", "samira", "nora"],
    netBalanceCents: 8650,
  },
  {
    id: "the-apartment",
    name: "The Apartment",
    groupType: "roommates",
    memberIds: ["you", "alex", "samira"],
    netBalanceCents: -4200,
  },
  {
    id: "product-team",
    name: "Product Team",
    groupType: "corporate",
    memberIds: ["you", "alex", "jordan", "samira", "nora", "chris"],
    netBalanceCents: 12675,
  },
];

export const expenses: Expense[] = [
  {
    id: "friday-dinner",
    circleId: "scottsdale-crew",
    title: "Friday dinner at North Italia",
    amountCents: 14500,
    payerId: "alex",
    participantIds: ["you", "alex", "jordan", "samira", "nora"],
    category: "Food & dining",
    date: "2026-10-27",
  },
  {
    id: "taxi-downtown",
    circleId: "scottsdale-crew",
    title: "Taxi downtown",
    amountCents: 5800,
    payerId: "jordan",
    participantIds: ["you", "jordan", "samira", "nora"],
    category: "Transport",
    date: "2026-10-26",
  },
  {
    id: "coffee-stop",
    circleId: "scottsdale-crew",
    title: "Coffee stop",
    amountCents: 2400,
    payerId: "samira",
    participantIds: ["you", "samira", "nora"],
    category: "Food & dining",
    date: "2026-10-24",
  },
  {
    id: "team-coffee-run",
    circleId: "product-team",
    title: "Team coffee run",
    amountCents: 2400,
    payerId: "alex",
    participantIds: ["you", "alex", "jordan", "samira", "nora", "chris"],
    category: "Food & dining",
    date: "2026-10-29",
  },
];

export const memberBalancesByCircle: Record<string, { memberId: string; amountCents: number }[]> = {
  "scottsdale-crew": [
    { memberId: "jordan", amountCents: 5250 },
    { memberId: "samira", amountCents: 2400 },
    { memberId: "nora", amountCents: 1000 },
  ],
};

export const settlements: SettlementBalance[] = [
  { id: "settle-jordan", memberId: "jordan", circleId: "scottsdale-crew", amountCents: 5250 },
  { id: "settle-samira", memberId: "samira", circleId: "product-team", amountCents: 12675 },
  { id: "settle-you", memberId: "alex", circleId: "the-apartment", amountCents: -4200 },
];

export function getMember(id: string): Member | undefined {
  return members.find((m) => m.id === id);
}

export function getCircle(id: string): Circle | undefined {
  return circles.find((c) => c.id === id);
}

export function getExpensesForCircle(circleId: string): Expense[] {
  return expenses.filter((e) => e.circleId === circleId);
}
