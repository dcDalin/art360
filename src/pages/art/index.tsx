import { useState } from 'react';
import { RiFilterLine } from 'react-icons/ri';

import ArtistsSearch from '@/components/ArtistsSearch';
import Layout from '@/components/layout/Layout';
import ModalWrapper from '@/components/modals/ModalWrapper';
import RenderArt from '@/components/RenderArt';

export default function ArtPage() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Layout templateTitle='Art'>
      <div className='flex space-x-0 md:space-x-8'>
        <div className='hidden w-96 md:block'>
          <ArtistsSearch />
        </div>
        <div className='w-full'>
          <div className='flex w-full items-center justify-between pb-8'>
            <h3 className='text-2xl md:text-3xl'>Discover Art</h3>
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
