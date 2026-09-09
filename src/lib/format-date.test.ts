import { describe, expect, test } from "bun:test";
import { formatDate, formatPeriod } from "~/lib/format-date";

describe("portfolio dates", () => {
  test("formats date-only and timestamp values consistently", () => {
    expect(formatDate("2026-09-07")).toBe("2026.09");
    expect(formatDate("2026-09-07T23:00:00+09:00")).toBe("2026.09");
    expect(formatDate(null)).toBeNull();
    expect(formatDate("2026-13-01")).toBeNull();
  });

  test("only calls an open period ongoing when the section requests it", () => {
    expect(formatPeriod("2024.11", null)).toBe("2024.11");
    expect(formatPeriod("2026.07", null, { present: true })).toBe("2026.07 – 현재");
    expect(formatPeriod(null, null, { present: true })).toBe("");
    expect(formatPeriod(null, "2024.11")).toBe("2024.11");
    expect(formatPeriod("2024.11", "2024.11")).toBe("2024.11");
    expect(formatPeriod("2024.11", "2024.12")).toBe("2024.11 – 2024.12");
  });
});
