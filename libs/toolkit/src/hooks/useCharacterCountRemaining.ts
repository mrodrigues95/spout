import { useMemo } from 'react';

interface UseCharacterCountRemainingProps {
  value?: string;
  limit?: number;
}

export const useCharacterCountRemaining = ({
  value,
  limit = 190,
}: UseCharacterCountRemainingProps) => {
  const remaining = useMemo(
    () => limit - (value?.length ?? 0),
    [limit, value?.length],
  );

  const isOverLimit = useMemo(() => remaining < 0, [remaining]);

  return { isOverLimit, remaining };
};
