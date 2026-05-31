import { format } from "timeago.js";

export default function parseDate(date: string) {
  return format(date);
}
