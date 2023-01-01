import Image from 'next/image';
import { useContext } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaRegImage } from 'react-icons/fa';
import ImageUploading, { ImageListType } from 'react-images-uploading';

import {
  ImageUploadContext,
  UploadImageContextType,
} from '@/context/ImageUploadContext';

export default function UploadImage() {
  const { image, handleImageUpload } = useContext(
    ImageUploadContext
  ) as UploadImageContextType;

  const onChange = (uploadedImage: ImageListType) => {
    handleImageUpload(uploadedImage as never[]);
  };

  return (
    <div>
      <ImageUploading
        value={image}
        onChange={onChange}
        dataURLKey='data_url'
        acceptType={['jpg', 'gif', 'png']}
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          dragProps,
        }) => (
          <>
            {imageList && imageList.length ? (
              <>
                {imageList.map((image, index) => (
                  <div key={index} className='image-item'>
                    <div className='btn-group py-2'>
                      <button
                        className='btn-outline btn gap-2'
                        onClick={() => onImageUpdate(index)}
                      >
                        Update
                        <FaRegImage />
                      </button>
                      <button
                        className='btn-outline btn gap-2'
                        onClick={() => onImageRemove(index)}
                      >
                        Delete
                        <AiOutlineDelete />
                      </button>
                    </div>
                    <Image
                      src={image['data_url']}
                      alt='Picture of the author'
                      width={500}
                      height={500}
                    />
                  </div>
                ))}
              </>
            ) : (
              <button
                className='btn-outline btn my-2 gap-2'
                onClick={onImageUpload}
                {...dragProps}
              >
                Click to upload picture
                <FaRegImage />
              </button>
            )}
          </>
        )}
      </ImageUploading>
    </div>
  );
}
