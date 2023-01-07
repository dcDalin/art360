import { useMutation } from '@apollo/client';
import { useAccessToken, useFileUpload } from '@nhost/react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import nhost from '@/lib/nhost';

import UploadImage from '@/components/forms/UploadImage';

import {
  ImageUploadContext,
  UploadImageContextType,
} from '@/context/ImageUploadContext';
import { UPDATE_SPONSOR_IMAGE } from '@/graphql/mutations';
import { READ_ALL_SPONSORS } from '@/graphql/queries';
import { closeModals } from '@/redux/modals/adminCRUDModalSlice';
import { RootState } from '@/redux/store';

export default function UpdateSponsorImageProvider() {
  const dispatch = useDispatch();
  const accessToken = useAccessToken();

  const { image } = useContext(ImageUploadContext) as UploadImageContextType;

  const {
    adminModalPayload: {
      formData: { id: sponsorId, imageId },
    },
  } = useSelector((state: RootState) => state.adminCRUDModal);

  const { upload, isUploading } = useFileUpload();

  const [updateSponsorImage, { loading }] = useMutation(UPDATE_SPONSOR_IMAGE, {
    refetchQueries: [
      { query: READ_ALL_SPONSORS }, // DocumentNode object parsed with gql
      'ReadAllSponsors', // Query name
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
          dispatch(closeModals());
        }
      } else {
        toast.error('No image file found', { id: 'error-no-image' });
      }
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };

  return (
    <div className='flex flex-col justify-between space-x-0 md:flex-row md:space-x-4'>
      <div className='w-full'>
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
  );
}
