import { describe, expect, it } from "vitest";

import { getTotalCareerDurationFormatted } from "@/data/experience";
import { calculateDateRangeDuration } from "@/lib/date";

describe("experience date duration calculations", () => {
  it("calculates exact calendar durations for confirmed roles and employers", () => {
    expect(calculateDateRangeDuration("2026-09-01", "2026-10-31").formatted).toBe("2 mos");
    expect(calculateDateRangeDuration("2025-08-01", "2026-08-31").formatted).toBe("1 yr 1 mo");
    expect(calculateDateRangeDuration("2025-08-01", "2026-10-31").formatted).toBe("1 yr 3 mos");
    expect(calculateDateRangeDuration("2023-09-18", "2025-07-28").formatted).toBe("1 yr 10 mos");
    expect(calculateDateRangeDuration("2022-07-10", "2023-09-15").formatted).toBe("1 yr 2 mos");
    expect(calculateDateRangeDuration("2022-01-03", "2022-07-09").formatted).toBe("6 mos");
    expect(calculateDateRangeDuration("2022-01-03", "2023-09-15").formatted).toBe("1 yr 8 mos");
  });

  it("calculates total cumulative career duration across all tenures", () => {
    expect(getTotalCareerDurationFormatted()).toBe("4 yrs 9 mos");
  });
});
