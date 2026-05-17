import { describe, expect, it } from "vitest";
import { formatPriceInr } from "./currency";

describe("formatPriceInr", () => {
  it("formats numbers with INR prefix", () => {
    expect(formatPriceInr(1499)).toBe("INR 1499");
  });
});
