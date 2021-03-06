import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);

export function getLocalDatetime(datetime: string): string {
  return dayjs(datetime).local().format("YYYY-MM-DD HH:mm:ss");
}

export function getHumanizedRelativeTime(datetime: string): string {
  return dayjs(datetime).local().fromNow();
}
