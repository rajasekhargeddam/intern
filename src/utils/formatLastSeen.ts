import { formatExactTime } from "./dateConversions";

export const formatLastSeen = (lastSeen?: string | Date | null): string => {
  const exactTime = formatExactTime(lastSeen, {
    includeDate: true,
    relativeDay: true,
  });

  if (!exactTime) {
    return "";
  }

  return `Last seen ${exactTime}`;
};
