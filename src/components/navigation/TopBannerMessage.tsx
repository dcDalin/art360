import { CiMobile1 } from 'react-icons/ci';
import { MdOutlineEmail } from 'react-icons/md';

import ContainerLayout from '@/components/layout/ContainerLayout';

export default function TopBannerMessage() {
  return (
    <div className='bg-neutral text-neutral-content'>
      <ContainerLayout>
        <div className='flex h-11 items-center'>
          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-2'>
              <CiMobile1 />
              <div>0707237777</div>
            </div>
            <div className='flex items-center space-x-2'>
              <MdOutlineEmail />
              <div>art@mail.co</div>
            </div>
          </div>
        </div>
      </ContainerLayout>
    </div>
  );
}
