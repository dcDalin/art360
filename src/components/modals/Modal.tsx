import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import { closeModals } from '@/redux/modals/adminCRUDModalSlice';

interface IModalProps {
  children: React.ReactNode;
  open: boolean;
  size: 'sm' | 'md' | 'lg';
}

export default function Modal({ children, open, size }: IModalProps) {
  const dispatch = useDispatch();

  let modalSize = 'max-w-screen-sm';

  if (size === 'sm') {
    modalSize = 'max-w-screen-sm';
  } else if (size === 'md') {
    modalSize = 'max-w-screen-md';
  } else if (size === 'lg') {
    modalSize = 'max-w-screen-lg';
  }

  return (
    <div className={`modal ${open ? 'modal-open' : ''}`}>
      <div className={`modal-box ${modalSize}`}>
        <label
          className='absolute right-2 top-2 cursor-pointer focus:ring'
          onClick={() => dispatch(closeModals())}
        >
          <MdOutlineClose className='h-6 w-6' />
        </label>
        {children}
      </div>
    </div>
  );
}
