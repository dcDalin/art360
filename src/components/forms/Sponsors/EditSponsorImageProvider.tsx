import { useMutation } from '@apollo/client';
import { useAccessToken, useFileUpload } from '@nhost/nextjs';
import router from 'next/router';
import { useContext } from 'react';
import toast from 'react-hot-toast';

import nhost from '@/lib/nhost';

import UploadImage from '@/components/forms/UploadImage';
import NextImage from '@/components/NextImage';

import {
  ImageUploadContext,
  UploadImageContextType,
} from '@/context/ImageUploadContext';
import { UPDATE_SPONSOR_IMAGE } from '@/graphql/sponsors/mutations';
import { READ_SPONSORS } from '@/graphql/sponsors/queries';
import { ADMIN_SPONSORS } from '@/routes/paths';

interface IEditArtistProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export default function EditSponsorImageProvider({
  data,
}: IEditArtistProviderProps) {
  const accessToken = useAccessToken();

  const { id: sponsorId, imageId } = data;

  const imageUrl = nhost.storage.getPublicUrl({
    fileId: imageId,
  });

  const { image } = useContext(ImageUploadContext) as UploadImageContextType;

  const { upload, isUploading } = useFileUpload();

  const [updateSponsorImage, { loading }] = useMutation(UPDATE_SPONSOR_IMAGE, {
    refetchQueries: [
      { query: READ_SPONSORS }, // DocumentNode object parsed with gql
      'readSponsors', // Query name
    ],
  });

  const onSubmit = async () => {
    try {
      if (image && image[0] && image[0].file) {
        // delete previous file first
        const { error } = await nhost.storage.delete({ fileId: imageId });

        if (error) {
          toast.error('Could not delete previous image', {
            id: 'could-not-delete',
          });
          return;
        }

        const { file } = image[0];
        const { id: newImageId, isUploaded, isError } = await upload({ file });

        if (isError) {
          toast.error('Something went wrong while uploading the image', {
            id: 'isError',
          });
        } else if (isUploaded) {
          // submit rest of the form
          await updateSponsorImage({
            context: {
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            },
            variables: {
              id: sponsorId,
              imageId: newImageId,
            },
          });
          toast.success('Sponsor updated', { id: 'data' });
          router.replace(ADMIN_SPONSORS, undefined, { shallow: true });
        }
      } else {
        toast.error('No image file found', { id: 'error-no-image' });
      }
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };

  return (
    <div className='max-w-4xl'>
      <div className='flex flex-col space-x-0 md:flex-row md:space-x-8'>
        <div>
          <h4>Original image</h4>
          <div className='avatar'>
            <div className='mask mask-square h-24 w-24'>
              <NextImage
                src={imageUrl}
                imgClassName='object-cover'
                useSkeleton
                alt='sponsor'
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
        <div>
          <UploadImage />
          {image && image[0] ? (
            <button
              className={`btn-primary btn my-2 ${
                loading || isUploading ? 'loading' : ''
              }`}
              onClick={onSubmit}
            >
              Save
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
