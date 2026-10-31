import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";

import { makeStore } from "@/lib/store/store";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/",
}));

import OverviewPage from "../page";

describe("OverviewPage", () => {
  it("renders the headline and each circle with its balance", () => {
    render(
      <Provider store={makeStore()}>
        <OverviewPage />
      </Provider>,
    );

    expect(screen.getByText("Good morning, Alex ✳")).toBeInTheDocument();
    expect(screen.getByText("Scottsdale Crew")).toBeInTheDocument();
    expect(screen.getByText("The Apartment")).toBeInTheDocument();
    expect(screen.getByText("Total owed to you")).toBeInTheDocument();
  });
});
