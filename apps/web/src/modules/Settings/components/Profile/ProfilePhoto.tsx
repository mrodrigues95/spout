import { useCallback, useRef, useState } from 'react';
import { graphql, useFragment, useMutation } from 'react-relay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
} from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  Dropzone,
  FileWithPreview,
  Modal,
  Title,
  PhotoEditor,
  PhotoEditorRef,
} from '@spout/toolkit';
import { useFileUpload } from '../../../../shared/hooks';
import { Avatar, useToast } from '../../../../shared/components';
import { ProfilePhoto_user$key } from './__generated__/ProfilePhoto_user.graphql';
import { ProfilePhotoMutation } from './__generated__/ProfilePhotoMutation.graphql';

const mutation = graphql`
  mutation ProfilePhotoMutation($input: UpdateAvatarInput!) {
    updateAvatar(input: $input) {
      user {
        avatarUrl
      }
    }
  }
`;

const fragment = graphql`
  fragment ProfilePhoto_user on User {
    name
    avatarUrl
    profileColor
  }
`;

interface Props {
  me: ProfilePhoto_user$key;
}

const ProfilePhoto = ({ ...props }: Props) => {
  const me = useFragment(fragment, props.me);
  const [updatePhoto, isInFlight] = useMutation<ProfilePhotoMutation>(mutation);

  const { handleError } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [photo, setPhoto] = useState<FileWithPreview | null>(null);
  const { upload, isUploading } = useFileUpload();
  const editorRef = useRef<PhotoEditorRef>(null);

  const onDropAccepted = useCallback((files: File[]) => {
    setPhoto(
      Object.assign(files[0], { preview: URL.createObjectURL(files[0]) }),
    );
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
    setPhoto(null);
  }, []);

  return (
    <div className="mt-5 flex-1 space-y-6">
      <Title as="h2" variant="h5" className="font-medium">
        Your photo
      </Title>
      <div className="flex space-x-8">
        <Avatar
          name={me.name}
          src={me.avatarUrl}
          profileColor={me.profileColor}
          size="xxl"
          rounded
          priority
        />
        <Dropzone
          accept={['.png', '.jpg', '.jpeg']}
          onDropAccepted={onDropAccepted}
          onDropRejected={() => handleError('Invalid file type.')}
          primaryMessage="Select a photo to upload"
          multiple={false}
        />
        <Modal isOpen={isOpen} onClose={onClose}>
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Header title="Update Profile Photo" />
            <Modal.Body>
              <div className="flex flex-col space-y-6">
                <PhotoEditor
                  ref={editorRef}
                  image={photo?.preview ?? ''}
                  scale={zoom}
                  rounded
                />
                <div className="flex flex-row items-center justify-center space-x-4">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlassMinus}
                    className="text-gray-400"
                  />
                  <PhotoEditor.Slider value={zoom} onChange={setZoom} />
                  <FontAwesomeIcon
                    icon={faMagnifyingGlassPlus}
                    className="text-gray-400"
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button
                size="sm"
                variant="primary"
                loading={isUploading || isInFlight}
                onClick={() => {
                  editorRef.current?.getImage().toBlob(async (blob) => {
                    if (blob) {
                      const { file } = await upload(
                        new File([blob], photo!.name, { type: photo!.type }),
                      );

                      if (file) {
                        updatePhoto({
                          variables: { input: { avatarUrl: file.location } },
                          onError: () => handleError(),
                          onCompleted: () => onClose(),
                        });
                      } else {
                        handleError();
                      }
                    }
                  });
                }}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </div>
    </div>
  );
};

export default ProfilePhoto;
