import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RiFilterLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';

import ArtArtistsButton from '@/components/ArtArtistsButton';
import ArtistsSearch from '@/components/ArtistsSearch';
import Layout from '@/components/layout/Layout';
import ModalWrapper from '@/components/modals/ModalWrapper';
import RenderArt from '@/components/RenderArt';

import { setCategoryFilter } from '@/redux/searchArt/searchArtSlice';

export default function ArtPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { category } = router.query;

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (category) {
      dispatch(setCategoryFilter(category));
    }
  }, [category, dispatch]);

  return (
    <Layout templateTitle='Art'>
      <div className='flex space-x-0 md:space-x-8'>
        <div className='hidden w-96 md:block'>
          <ArtistsSearch />
        </div>
        <div className='w-full'>
          <div className='flex w-full items-center justify-between pb-8'>
            <h3 className='text-2xl md:text-3xl'>Discover Art and Artists</h3>
            <ArtArtistsButton />
            <div className='flex md:hidden'>
              <button
                className='btn-outline btn-sm btn-circle btn'
                onClick={() => setOpenModal(true)}
              >
                <RiFilterLine />
              </button>
            </div>
          </div>

          <RenderArt />

          <ModalWrapper
            isOpen={openModal}
            closeModal={() => setOpenModal(false)}
            title='Search and filter'
          >
            <ArtistsSearch />
          </ModalWrapper>
        </div>
      </div>
    </Layout>
  );
}
