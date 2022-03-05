import { useMemo } from 'react';

interface UseCharacterCountRemainingProps {
  value?: string;
  limit?: number;
}

export const useCharacterCountRemaining = ({
  value,
  limit = 190,
}: UseCharacterCountRemainingProps) => {
  const currentCount = useMemo(
    () => limit - (value?.length ?? 0),
    [limit, value?.length],
  );

  const isOverLimit = useMemo(() => currentCount < 0, [currentCount]);

  return { isOverLimit, currentCount };
};
