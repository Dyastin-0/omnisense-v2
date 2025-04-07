export const hasSpecialCharacters = (str) => /[^a-zA-Z0-9\s()]/.test(str);

// match HH:MM AM/PM
export function parseTimeString(timeString) {
  if (!timeString) return;

  const timeRegex = /^(\d{1,2}):(\d{2})\s?(AM|PM)$/i;

  const match = timeString.match(timeRegex);

  if (!match) {
    throw new Error("Invalid time format. Expected format: HH:MM AM/PM");
  }

  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (hours < 1 || hours > 12) {
    throw new Error("Hours must be between 1 and 12");
  }

  if (minutes < 0 || minutes > 59) {
    throw new Error("Minutes must be between 0 and 59");
  }

  return {
    hours,
    minutes,
    period,
  };
}
