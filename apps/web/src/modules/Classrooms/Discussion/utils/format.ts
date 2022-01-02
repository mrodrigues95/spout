/**
 * Formats out multiple line breaks (2 max).
 * @param message The message to be formatted.
 * @return The formatted message.
 */
export const formatNewMessage = (message: string): string => {
  return message.replace(/(\r\n|\r|\n){3,}/g, '$1\n\n');
};
