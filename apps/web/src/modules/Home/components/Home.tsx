import {
  AnonymousCredential,
  BlockBlobClient,
  newPipeline,
} from '@azure/storage-blob';
import { useState } from 'react';
import { Layout } from '../../../shared/components';

const uploadFileToBlob = async (file: File | null) => {
  if (!file) return;

  const pipeline = newPipeline(new AnonymousCredential());
  const blockBlobClient = new BlockBlobClient(
    'https://spoutstorage.blob.core.windows.net/spout-container/test?skoid=1addc2b4-0a40-49be-9c5d-0f844404848d&sktid=f65a22a2-cc34-441b-b27a-1aa9e4da9d38&skt=2021-12-23T17%3A41%3A05Z&ske=2021-12-23T17%3A46%3A05Z&sks=b&skv=2020-10-02&sv=2020-08-04&st=2021-12-23T17%3A26%3A05Z&se=2021-12-23T17%3A56%3A05Z&sr=b&sp=cw&sig=11EE9PCakXlfPGSZMNlHESL8K1iSXy668AhB%2FLHUtoM%3D',
    pipeline,
  );

  // TODO: Only allow 10 max files at a time per message.
  // TODO: Set accepted file types.
  const options = { blobHTTPHeaders: { blobContentType: file.type } };
  // TODO: If this fails, call api to set FileStatus.ERROR on the record.
  await blockBlobClient.uploadData(file, options);
};
const Home = () => {
  // current file to upload into container
  const [fileSelected, setFileSelected] = useState(null);

  const onFileChange = (event: any) => {
    // capture file into state
    setFileSelected(event.target.files[0]);
  };

  const onFileUpload = async () => {
    // *** UPLOAD TO AZURE STORAGE ***
    await uploadFileToBlob(fileSelected);
    // reset state/form
    setFileSelected(null);
  };

  console.log(fileSelected);

  return (
    <Layout title="Home">
      <form onSubmit={onFileUpload}>
        <input type="file" onChange={onFileChange} />
        <button type="submit">upload</button>
      </form>
    </Layout>
  );
};

export default Home;
