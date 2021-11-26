import { useCallback, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { gql, useMutation, useQuery } from '@apollo/client';
import {
  FilePicker,
  FileType,
  Modal,
  Form,
  Button,
  PhotoCropper,
} from '@spout/toolkit';
import { UserInfoFragment } from '../../../Classrooms/Discussion/utils/fragments';
import { Avatar, useToast } from '../../../../shared/components';
import { getRandomAvatar } from '../../../../shared/utils/getRandomAvatar';
import {
  MeQuery,
  UpdateAvatar,
  UpdateAvatarVariables,
} from './__generated__/ChangeAvatar.generated';

const mutation = gql`
  mutation UpdateAvatar($input: UpdateAvatarInput!) {
    updateAvatar(input: $input) {
      user {
        ...UserInfo_user
      }
      userErrors {
        message
        code
      }
    }
  }
  ${UserInfoFragment}
`;

// TODO: Move this to a common place, we use this query in a lot of areas.
const query = gql`
  query MeQuery {
    me {
      ...UserInfo_user
    }
  }
  ${UserInfoFragment}
`;

const ChangeAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<FileType[]>([]);
  const [cropper, setCropper] = useState<Cropper>();
  const { handleError } = useToast();
  const { data } = useQuery<MeQuery>(query, { fetchPolicy: 'cache-only' });
  const [updateAvatar, updateAvatarResult] = useMutation<
    UpdateAvatar,
    UpdateAvatarVariables
  >(mutation, {
    onError: (error) => handleError(error),
    onCompleted: () => setIsOpen(false),
  });

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview!));
    };
  }, [files]);

  const onSubmit = useCallback(
    () =>
      cropper?.getCroppedCanvas().toBlob((blob) => {
        updateAvatar({ variables: { input: { file: blob } } });
      }),
    [cropper, updateAvatar]
  );

  const onFileSelected = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) => ({
        ...file,
        preview: URL.createObjectURL(file),
      }))
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
                  className="h-full max-w-md mx-auto"
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
                disabled={updateAvatarResult.loading}
                isSubmitting={updateAvatarResult.loading}
              >
                Apply
              </Form.SubmitButton>
            </Modal.Footer>
          </Modal.Content>
        </Form>
      </Modal>
      <figure className="flex flex-col flex-1 items-center justify-center">
        <div className="relative">
          <Avatar
            src={data!.me!.avatarUrl ?? getRandomAvatar()}
            name={data!.me!.name}
            className="h-16 w-16 sm:h-20 sm:w-20 md:w-32 md:h-32 lg:h-48 lg:w-48"
          />
          <FilePicker onFileSelected={onFileSelected}>
            <FilePicker.Button
              className="absolute right-0 bottom-0 mr-1 bg-indigo-400 rounded-full shadow-lg outline-none md:mr-4 md:mb-1 lg:mr-6 focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-red-600"
              aria-label="Change profile photo"
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="w-4 h-4 text-white sm:w-6 sm:h-6 lg:w-8 lg:h-8"
              />
            </FilePicker.Button>
          </FilePicker>
        </div>
        <figcaption className="mt-5 font-bold text-xl sm:text-2xl">
          {data!.me!.name} 😀
        </figcaption>
        <span className="text-gray-500 font-semibold">{data!.me!.email}</span>
      </figure>
    </>
  );
};

export default ChangeAvatar;
