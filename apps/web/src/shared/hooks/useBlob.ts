import { useCallback, useState } from 'react';
import { AnonymousCredential, BlockBlobClient } from '@azure/storage-blob';

type SAS = string;

export const useBlob = () => {
  const [pipeline] = useState(new AnonymousCredential());

  const createBlockBlobClient = (sas: SAS) =>
    new BlockBlobClient(sas, pipeline);

  const upload = useCallback(async (sas: SAS, file: File | null) => {
    if (!file) return null;

    try {
      const client = createBlockBlobClient(sas);
      const options = { blobHTTPHeaders: { blobContentType: file.type } };
      return await client.uploadData(file, options);
    } catch (e) {
      throw e;
    }
  }, []);

  return { upload };
};
