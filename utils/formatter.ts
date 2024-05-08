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

export function capitalize(s: string): string {
  return s
    .split(" ")
    .map((p: string) => p.charAt(0).toUpperCase() + p.substring(1))
    .join(" ");
}