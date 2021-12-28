import { useCallback } from 'react';
import { AnonymousCredential, BlockBlobClient } from '@azure/storage-blob';

type SAS = string;

export const useBlob = () => {
  const createBlockBlobClient = (sas: SAS) =>
    new BlockBlobClient(sas, new AnonymousCredential());

  const upload = useCallback(async (sas: SAS, file: File | null) => {
    if (!file) return null;

    try {
      const client = createBlockBlobClient(sas);
      const options = { blobHTTPHeaders: { blobContentType: file.type } };
      return await client.uploadData(file, options);
    } catch (e) {
      console.error(`[Error uploading file]: ${e}`);
      throw e;
    }
  }, []);

  return { upload };
};
