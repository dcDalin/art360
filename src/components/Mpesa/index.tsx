import { useState } from 'react';

import STKProvider from '@/components/forms/MPesa/STKProvider';
import ModalWrapper from '@/components/modals/ModalWrapper';
import NextImage from '@/components/NextImage';

export default function Mpesa() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className='stats cursor-pointer shadow'
        onClick={() => setOpen(true)}
      >
        <div className='stat'>
          <div className='flex items-center space-x-2'>
            <NextImage
              alt='image'
              src='/images/mpesa.png'
              width={50}
              height={50}
            />
            <div className='text-lg'>M-Pesa</div>
          </div>
        </div>
      </div>

      <ModalWrapper
        isOpen={open}
        closeModal={() => setOpen(false)}
        title='M-Pesa'
      >
        <STKProvider />
      </ModalWrapper>
    </>
  );
}
