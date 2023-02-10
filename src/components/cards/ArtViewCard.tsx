/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import nhost from '@/lib/nhost';

import NextImage from '@/components/NextImage';

interface IArtViewCardProps {
  images: Array<any>;
}

export default function ArtView({ images }: IArtViewCardProps) {
  const [activeImageUrl, setActiveImageUrl] = useState('');

  return (
    <div>
      {activeImageUrl ? (
        <div className='w-full'>
          <NextImage
            src={activeImageUrl}
            className='w-full'
            imgClassName='w-full h-96 rounded-sm object-cover'
            useSkeleton
            alt='art'
            width={1000}
            height={1000}
          />
        </div>
      ) : (
        <p>No image found</p>
      )}

      <div className='flex items-center space-x-1 overflow-x-auto py-2'>
        {images && images.length ? (
          images.map(({ id, imageId }, index) => {
            const imageUrl = nhost.storage.getPublicUrl({
              fileId: imageId,
            });

            if (!activeImageUrl && index === 0) {
              setActiveImageUrl(imageUrl);
            }

            return (
              <div
                key={id}
                onClick={() => setActiveImageUrl(imageUrl)}
                className='cursor-pointer'
              >
                <NextImage
                  src={imageUrl}
                  imgClassName='w-16 h-16 rounded-sm object-cover'
                  useSkeleton
                  alt='art'
                  width={100}
                  height={100}
                />
              </div>
            );
          })
        ) : (
          <p>No images found</p>
        )}
      </div>
    </div>
  );
}
