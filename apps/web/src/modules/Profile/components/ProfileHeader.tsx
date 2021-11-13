import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import {
  FilePicker,
  FileType,
  Modal,
  Form,
  Button,
  PhotoCropper,
} from '@spout/toolkit';
import { PlusCircleIcon } from '@spout/assets/icons/outline';
import { UserInfo_User } from '../../Classrooms/Discussion/utils/__generated__/fragments.generated';
import { UserInfoFragment } from '../../Classrooms/Discussion/utils/fragments';
import { Avatar, useToast } from '../../../shared/components';
import { getRandomAvatar } from '../../../shared/utils/getRandomAvatar';
import {
  UpdateAvatar,
  UpdateAvatarVariables,
} from './__generated__/ProfileHeader.generated';

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

interface Props {
  me: UserInfo_User;
}

const ProfileHeader = ({ me }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<FileType[]>([]);
  const [cropper, setCropper] = useState<Cropper>();
  const { handleError } = useToast();
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
    [cropper, updateAvatar],
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
      <figure className="flex flex-col items-center justify-center">
        <div className="relative">
          <Avatar
            src={me.avatarUrl ?? getRandomAvatar()}
            name={me.name}
            className="h-16 w-16 sm:h-20 sm:w-20 md:w-32 md:h-32 lg:h-48 lg:w-48"
          />
          <FilePicker onFileSelected={onFileSelected}>
            <FilePicker.Button
              className="absolute right-0 bottom-0 mr-1 bg-indigo-400 rounded-full shadow-lg outline-none md:mr-4 md:mb-1 lg:mr-6 focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-red-600"
              aria-label="Change profile photo"
            >
              <PlusCircleIcon className="w-4 h-4 text-white sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
            </FilePicker.Button>
          </FilePicker>
        </div>
        <figcaption className="mt-5 font-bold text-xl sm:text-2xl">
          {me.name} 😀
        </figcaption>
        <span className="text-gray-500 font-semibold">{me.email}</span>
      </figure>
    </>
  );
};

export default ProfileHeader;
