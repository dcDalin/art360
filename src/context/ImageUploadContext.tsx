import React, { createContext, ReactNode, useState } from 'react';
import { ImageListType } from 'react-images-uploading';

export type UploadImageContextType = {
  image: ImageListType;
  handleImageUpload: React.Dispatch<React.SetStateAction<never[]>>;
};

export const ImageUploadContext = createContext<UploadImageContextType | null>(
  null
);

interface IImageUploadProviderTypes {
  children: ReactNode;
}

const ImageUploadProvider = ({ children }: IImageUploadProviderTypes) => {
  const [imageToUpload, setImageToUpload] = useState([]);
  return (
    <ImageUploadContext.Provider
      value={{ image: imageToUpload, handleImageUpload: setImageToUpload }}
    >
      {children}
    </ImageUploadContext.Provider>
  );
};

export default ImageUploadProvider;
