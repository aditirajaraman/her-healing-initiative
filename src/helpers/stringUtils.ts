/**
 * Truncates a string to a specified length and appends an ellipsis if it's too long.
 * @param str The input string.
 * @param limit The maximum length of the string.
 * @returns The truncated string with an ellipsis if necessary, otherwise the original string.
 */
function truncateString (str: string, limit: number): string {
  if (str.length > limit) {
    return str.substring(0, limit) + '...';
  }
  return str;
};

export {truncateString};