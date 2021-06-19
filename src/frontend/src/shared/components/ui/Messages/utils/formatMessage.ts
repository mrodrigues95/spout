/**
 * Formats out multiple line breaks (2 max).
 * @param {string} message The message to be formatted.
 * @return {string} The formatted message.
 */
export const formatMessage = (message: string) => {
  return message.replace(/(\r\n|\r|\n){3,}/g, '$1\n\n');
};
