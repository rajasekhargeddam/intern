import { formatDistanceToNowStrict } from "date-fns";

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