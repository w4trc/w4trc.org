const FLOATING_TIME_ZONE = "UTC";
const EASTERN_TIME_ZONE = "America/New_York";

type FloatingInput = string | Date | null | undefined;

const toNumber = (value: string | undefined) => (value ? Number.parseInt(value, 10) : 0);

const getPart = (parts: Intl.DateTimeFormatPart[], type: string) =>
  parts.find((part) => part.type === type)?.value;

export function parseFloatingIso(value: FloatingInput): Date | null {
  if (!value) return null;

  if (value instanceof Date) {
    return new Date(
      Date.UTC(
        value.getUTCFullYear(),
        value.getUTCMonth(),
        value.getUTCDate(),
        value.getUTCHours(),
        value.getUTCMinutes(),
        value.getUTCSeconds(),
        value.getUTCMilliseconds(),
      ),
    );
  }

  if (typeof value !== "string") return null;

  const [datePart, timePartRaw] = value.split("T");
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})/.exec(datePart ?? "");
  if (!dateMatch) return null;

  const year = Number.parseInt(dateMatch[1], 10);
  const month = Number.parseInt(dateMatch[2], 10);
  const day = Number.parseInt(dateMatch[3], 10);

  let hour = 0;
  let minute = 0;
  let second = 0;
  let ms = 0;

  if (timePartRaw) {
    const timePart = timePartRaw.replace(/([Zz]|[+-]\d{2}:?\d{2})$/, "");
    const timeMatch = /^(\d{2}):(\d{2})(?::(\d{2}))?(?:\.(\d{1,3}))?/.exec(timePart);
    if (timeMatch) {
      hour = Number.parseInt(timeMatch[1], 10);
      minute = Number.parseInt(timeMatch[2], 10);
      second = Number.parseInt(timeMatch[3] ?? "0", 10);
      ms = Number.parseInt((timeMatch[4] ?? "0").padEnd(3, "0"), 10);
    }
  }

  return new Date(Date.UTC(year, month - 1, day, hour, minute, second, ms));
}

export function formatFloating(
  value: FloatingInput,
  options: Intl.DateTimeFormatOptions,
  locale?: string,
): string {
  const date = parseFloatingIso(value);
  if (!date) return "TBD";
  return new Intl.DateTimeFormat(locale, { ...options, timeZone: FLOATING_TIME_ZONE }).format(date);
}

export function formatFloatingDate(value: FloatingInput, locale?: string): string {
  return formatFloating(
    value,
    { weekday: "short", month: "short", day: "numeric", year: "numeric" },
    locale,
  );
}

export function formatFloatingDateTime(value: FloatingInput, locale?: string): string {
  return formatFloating(
    value,
    { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" },
    locale,
  );
}

export function formatFloatingTime(value: FloatingInput, locale?: string): string {
  return formatFloating(value, { hour: "numeric", minute: "2-digit" }, locale);
}

export function formatFloatingMonthDay(value: FloatingInput, locale?: string): string {
  return formatFloating(value, { month: "short", day: "numeric" }, locale);
}

export function isSameFloatingDay(a: Date, b: Date): boolean {
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
}

export function getEasternNow(): Date {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: EASTERN_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  return new Date(
    Date.UTC(
      toNumber(getPart(parts, "year")),
      toNumber(getPart(parts, "month")) - 1,
      toNumber(getPart(parts, "day")),
      toNumber(getPart(parts, "hour")),
      toNumber(getPart(parts, "minute")),
      toNumber(getPart(parts, "second")),
    ),
  );
}
