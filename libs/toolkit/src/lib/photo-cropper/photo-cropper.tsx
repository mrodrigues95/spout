import { Cropper, ReactCropperProps } from 'react-cropper';

export interface PhotoCropperProps extends ReactCropperProps {
  image: string;
  setCropper: (cropper: Cropper) => void;
}

export const PhotoCropper = ({
  image,
  setCropper,
  ...props
}: PhotoCropperProps) => {
  return (
    <Cropper
      src={image}
      initialAspectRatio={1}
      aspectRatio={1}
      autoCropArea={1}
      preview=".img-preview"
      guides={false}
      viewMode={1}
      background={false}
      responsive={true}
      onInitialized={setCropper}
      {...props}
    />
  );
};
