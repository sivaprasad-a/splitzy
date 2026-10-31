export type CircleGroupType = "friends" | "roommates" | "travel" | "family" | "corporate";

export type SplitMode = "equal" | "percentage" | "exact" | "shares";

export interface Member {
  id: string;
  name: string;
  initials: string;
}

export interface Circle {
  id: string;
  name: string;
  groupType: CircleGroupType;
  memberIds: string[];
  /** Net balance for the current user within this circle, in cents. Positive = owed to you. */
  netBalanceCents: number;
}

export interface Expense {
  id: string;
  circleId: string;
  title: string;
  amountCents: number;
  payerId: string;
  participantIds: string[];
  category: string;
  date: string;
}

export interface MemberBalance {
  memberId: string;
  /** Positive = they owe you; negative = you owe them. In cents. */
  amountCents: number;
}

export interface SettlementBalance {
  id: string;
  memberId: string;
  circleId: string;
  /** Positive = coming your way; negative = you owe. In cents. */
  amountCents: number;
}
