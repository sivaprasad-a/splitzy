import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it } from "vitest";

import { makeStore } from "@/lib/store/store";

import OverviewPage from "../page";

describe("OverviewPage", () => {
  it("renders the headline and each circle with its balance", () => {
    render(
      <Provider store={makeStore()}>
        <OverviewPage />
      </Provider>,
    );

    expect(screen.getByText("Your money, beautifully in sync.")).toBeInTheDocument();
    expect(screen.getByText("Scottsdale Crew")).toBeInTheDocument();
    expect(screen.getByText("The Apartment")).toBeInTheDocument();
    expect(screen.getByText("Owed to you")).toBeInTheDocument();
  });
});
