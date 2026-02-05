export function getTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}