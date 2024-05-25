import { format, isToday } from "date-fns";

export function dateFormatter(date: Date | null | undefined): string {
  if (!date) {
    return "";
  }
  return date.toDateString();
}

export function durationFormatter(date: Date | null | undefined): string {
  if (!date) {
    return "";
  }
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
  return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
}

export function chatTimeFormatter(date: Date | null | undefined): string {
  if (!date) {
    return "";
  }
  if (isToday(date)) {
    return `${format(date, "HH:MM")}`;
  } else {
    // add date
    return `${format(date, "MMM d HH:MM")}`;
  }
}

export function capitalize(s: string): string {
  return s
    .split(" ")
    .map((p: string) => p.charAt(0).toUpperCase() + p.substring(1))
    .join(" ");
}

export function viewsFormatter(count: number): string {
  if (count < 1000) {
    return count.toString();
  }
  if (count < 1000000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return `${(count / 1000000).toFixed(1)}M`;
}

export function ellipse(text: string, threshold: number) {
  if (text.length < threshold) {
    return text;
  }
  return `${text.substring(0, threshold)}...`;
}

export const zeroPad = (num: number) => String(num).padStart(2, "0");
