import { useMemo } from 'react';

interface Connection<T> {
  readonly edges: ReadonlyArray<{ readonly node: T }> | null;
}

export const useConnection = <T>(connection?: Connection<T> | null) => {
  const nodes = useMemo(() => {
    if (!connection) return [];
    if (!connection.edges) return [];

    return connection.edges.map((edge) => edge.node);
  }, [connection]);

  return nodes;
};
