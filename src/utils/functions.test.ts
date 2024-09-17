import { describe, it, expect } from "vitest";
import {
  getSortBy,
  getFilterBy,
  getOrderBy,
  getIntervalBy,
  calculateScore,
  roundIfNessesary,
  getTimeFrame,
  calculatePercentageChange,
  getPercentageSign,
  generateMonthDetailsArray,
} from "@/utils/functions";
import { Interval } from "@/types/Dashboard.types";
import { Filter, Order, Sort } from "@/types/Quiz.types";
import { format, startOfDay, subMonths } from "date-fns";

describe("getSortBy", () => {
  it("returns correct sort value if exists", () => {
    expect(getSortBy("updatedAt")).toBe(Sort.updatedAt);
  });

  it("returns default sort value if not found", () => {
    expect(getSortBy("nonexistent")).toBe(Sort.updatedAt);
  });
});

describe("getFilterBy", () => {
  it("returns correct filter value if exists", () => {
    expect(getFilterBy("favourite")).toBe(Filter.favourite);
  });

  it("returns default filter value if not found", () => {
    expect(getFilterBy("nonexistent")).toBe(Filter.all);
  });
});

describe("getOrderBy", () => {
  it("returns asc if filter is asc", () => {
    expect(getOrderBy("asc")).toBe(Order.asc);
  });

  it("returns desc if filter is not asc", () => {
    expect(getOrderBy("nonexistent")).toBe(Order.desc);
  });
});

describe("getIntervalBy", () => {
  it("returns correct interval value if exists", () => {
    expect(getIntervalBy("week")).toBe(Interval.week);
  });

  it("returns default interval value if not found", () => {
    expect(getIntervalBy("nonexistent")).toBe(Interval.week);
  });
});

describe("calculateScore", () => {
  it("returns 0 if answer is incorrect", () => {
    expect(
      calculateScore({ maxCounter: 5, currentCounter: 3, isCorrect: false }),
    ).toBe(0);
  });

  it("calculates score correctly when isCorrect is true", () => {
    expect(
      calculateScore({ maxCounter: 5, currentCounter: 3, isCorrect: true }),
    ).toBe(60);
  });

  it("caps score at 100", () => {
    expect(
      calculateScore({ maxCounter: 5, currentCounter: 10, isCorrect: true }),
    ).toBe(100);
  });

  it("returns 0 if maxCounter is 0", () => {
    expect(
      calculateScore({ maxCounter: 0, currentCounter: 1, isCorrect: true }),
    ).toBe(0);
  });
});

describe("roundIfNessesary", () => {
  it("rounds to the nearest decimal place", () => {
    expect(roundIfNessesary(1.23456, 2)).toBe("1.23");
  });

  it("handles string input and defaults rounding", () => {
    expect(roundIfNessesary("1.567")).toBe("1.6");
  });

  it("handles zero input", () => {
    expect(roundIfNessesary(0)).toBe("0.0");
  });

  it("replaces Infinity with 0", () => {
    expect(roundIfNessesary(Infinity)).toBe("0.0");
  });

  it("replaces -Infinity with 0", () => {
    expect(roundIfNessesary(-Infinity)).toBe("0.0");
  });
});

describe("getTimeFrame", () => {
  it("returns correct timeframe for day interval", () => {
    const result = getTimeFrame(Interval.day);
    const today = startOfDay(new Date());
    expect(result.startTime).toStrictEqual(today);
  });

  it('returns correct timeframe for "all" interval', () => {
    const result = getTimeFrame(Interval.all);
    expect(result.startTime).toStrictEqual(new Date(1970, 0, 1));
  });
});

describe("calculatePercentageChange", () => {
  it("calculates percentage change when previous is not zero", () => {
    expect(calculatePercentageChange(150, 100)).toBe(50);
  });

  it("returns 100% change if previous is 0 and current is not", () => {
    expect(calculatePercentageChange(100, 0)).toBe(100);
  });

  it("returns 0% if both current and previous are 0", () => {
    expect(calculatePercentageChange(0, 0)).toBe(0);
  });
});

describe("getPercentageSign", () => {
  it('returns "+" for positive percentage', () => {
    expect(getPercentageSign(10)).toBe("+");
  });

  it('returns "-" for negative percentage', () => {
    expect(getPercentageSign(-10)).toBe("-");
  });

  it("returns empty string for 0%", () => {
    expect(getPercentageSign(0)).toBe("");
  });
});

describe("generateMonthDetailsArray", () => {
  it("generates correct month details", () => {
    const months = generateMonthDetailsArray(2);
    const lastMonth = format(subMonths(new Date(), 1), "MMMM");
    const thisMonth = format(subMonths(new Date(), 0), "MMMM");

    expect(months[0]!.month).toBe(lastMonth);
    expect(months[1]!.month).toBe(thisMonth);
    expect(months).toHaveLength(2);
  });
});
