/**
 * Selects a random color.
 *
 * This is primarily used for classrooms for the moment with the intention
 * of moving this to the API.
 */
export const getRandomColor = () => {
  const colors: Record<string, { border: string; bg: string }> = {
    red: { border: 'border-red-300', bg: 'bg-red-400' },
    blue: { border: 'border-blue-300', bg: 'bg-blue-400' },
    purple: { border: 'border-violet-300', bg: 'bg-violet-400' },
    lime: { border: 'border-lime-300', bg: 'bg-lime-400' },
    pink: { border: 'border-pink-300', bg: 'bg-pink-400' },
  };

  const keys = Object.keys(colors);

  return colors[keys[Math.floor(Math.random() * keys.length)]];
};
