import { formatDistanceToNowStrict } from "date-fns";

const isSameCalendarDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const formatExactTime = (
  dateString?: string | Date | null,
  options?: { includeDate?: boolean; relativeDay?: boolean },
): string => {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const timeLabel = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  if (!options?.includeDate) {
    return timeLabel;
  }

  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (isSameCalendarDay(date, now)) {
    return options.relativeDay ? `today at ${timeLabel}` : timeLabel;
  }

  if (isSameCalendarDay(date, yesterday)) {
    return `yesterday at ${timeLabel}`;
  }

  return `${date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  })} at ${timeLabel}`;
};

export const timeAgo = (dateString: string | Date): string => {
  try {
    return formatDistanceToNowStrict(new Date(dateString), {
      addSuffix: true,
    })
      .replace(" days", "d")
      .replace(" day", "d")
      .replace(" weeks", "w")
      .replace(" week", "w")
      .replace(" hours", "h")
      .replace(" hour", "h")
      .replace(" minutes", "m")
      .replace(" minute", "m");
  } catch (err) {
    console.error(err);
    return "";
  }
};