import { useCallback, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import {
  FilePicker,
  FileType,
  Modal,
  Form,
  Button,
  PhotoCropper,
} from '@spout/toolkit';
import { useToast } from '../../../../shared/components';

// const mutation = gql`
//   mutation UpdateAvatar($input: UpdateAvatarInput!) {
//     updateAvatar(input: $input) {
//       user {
//         ...UserInfo_user
//       }
//       userErrors {
//         message
//         code
//       }
//     }
//   }
//   ${UserInfoFragment}
// `;

const ChangeAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<FileType[]>([]);
  const [cropper, setCropper] = useState<Cropper>();
  const { handleError } = useToast();
  // const [updateAvatar, updateAvatarResult] = useMutation<
  //   UpdateAvatar,
  //   UpdateAvatarVariables
  // >(mutation, {
  //   onError: (error) => handleError(error),
  //   onCompleted: () => setIsOpen(false),
  // });

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview!));
    };
  }, [files]);

  const onSubmit = useCallback(
    () => console.log('test'),
    // cropper?.getCroppedCanvas().toBlob((blob) => {
    //   updateAvatar({ variables: { input: { file: blob } } });
    // }),
    [cropper],
  );

  const onFileSelected = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) => ({
        ...file,
        preview: URL.createObjectURL(file),
      })),
    );
    setIsOpen(true);
  }, []);

  const form = useForm();
  const focusRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialFocus={focusRef}
      >
        <Modal.Overlay />
        <Form form={form} onSubmit={onSubmit}>
          <Modal.Content>
            <Modal.Header
              title="Edit Photo"
              description="Use the cropper below to edit your new profile photo."
            />
            <Modal.Body>
              {files.length && (
                <PhotoCropper
                  image={files[0].preview!}
                  setCropper={setCropper}
                  className="mx-auto h-full max-w-md"
                />
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsOpen(false)}
                ref={focusRef}
              >
                Cancel
              </Button>
              <Form.SubmitButton
                size="sm"
                // disabled={updateAvatarResult.loading}
                // isSubmitting={updateAvatarResult.loading}
              >
                Apply
              </Form.SubmitButton>
            </Modal.Footer>
          </Modal.Content>
        </Form>
      </Modal>
      <figure className="flex flex-1 flex-col items-center justify-center">
        <div className="relative">
          {/* <Avatar
            src={data!.me!.avatarUrl ?? getRandomAvatar()}
            name={data!.me!.name}
            className="h-16 w-16 sm:h-20 sm:w-20 md:w-32 md:h-32 lg:h-48 lg:w-48"
          /> */}
          <FilePicker onDrop={onFileSelected}>
            <FilePicker.Button
              className="outline-none absolute right-0 bottom-0 mr-1 rounded-full bg-indigo-400 shadow-lg focus:ring focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-white md:mr-4 md:mb-1 lg:mr-6"
              aria-label="Change profile photo"
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="h-4 w-4 text-white sm:h-6 sm:w-6 lg:h-8 lg:w-8"
              />
            </FilePicker.Button>
          </FilePicker>
        </div>
        <figcaption className="mt-5 text-xl font-bold sm:text-2xl">
          test 😀
        </figcaption>
        <span className="font-semibold text-gray-500">test@test.com</span>
      </figure>
    </>
  );
};

export default ChangeAvatar;
