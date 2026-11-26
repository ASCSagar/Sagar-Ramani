export interface DurationResult {
  years: number;
  months: number;
  totalMonths: number;
  formatted: string;
}

function parseUtcDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(year || 1970, (month || 1) - 1, day || 1));
}

/**
 * Formats a duration given in total months into human-readable years and months.
 */
export function formatMonthsDuration(totalMonths: number): DurationResult {
  const safeMonths = Math.max(0, Math.round(totalMonths));
  const years = Math.floor(safeMonths / 12);
  const months = safeMonths % 12;

  const parts: string[] = [];
  if (years > 0) {
    parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  }
  if (months > 0 || parts.length === 0) {
    parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  }

  return {
    years,
    months,
    totalMonths: safeMonths,
    formatted: parts.join(" "),
  };
}

/**
 * Calculates calendar duration for an inclusive ISO date range (YYYY-MM-DD).
 */
export function calculateDateRangeDuration(startDate: string, endDate: string): DurationResult {
  const start = parseUtcDate(startDate);
  const endInclusive = parseUtcDate(endDate);
  // Advance end by 1 UTC day so full-month ranges like 2026-09-01..2026-10-31 count as 2 months.
  const end = new Date(endInclusive.getTime() + 24 * 60 * 60 * 1000);

  if (end <= start) {
    return formatMonthsDuration(0);
  }

  let years = end.getUTCFullYear() - start.getUTCFullYear();
  let months = end.getUTCMonth() - start.getUTCMonth();
  let days = end.getUTCDate() - start.getUTCDate();

  if (days < 0) {
    months -= 1;
    const prevMonthEnd = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), 0));
    days += prevMonthEnd.getUTCDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  let totalMonths = years * 12 + months;
  if (days >= 15) {
    totalMonths += 1;
  }

  return formatMonthsDuration(totalMonths);
}

/**
 * Sums durations across multiple confirmed employment periods.
 */
export function calculateTotalExperience(
  periods: ReadonlyArray<{ startDate: string; endDate: string }>
): DurationResult {
  const totalMonths = periods.reduce(
    (sum, period) => sum + calculateDateRangeDuration(period.startDate, period.endDate).totalMonths,
    0
  );
  return formatMonthsDuration(totalMonths);
}
