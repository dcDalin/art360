import { AiOutlineClose } from 'react-icons/ai';

interface IModalWrapperProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  title: string;
  width?: string;
}

export default function ModalWrapper({
  isOpen,
  closeModal,
  children,
  title,
  width,
}: IModalWrapperProps) {
  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className={`modal-box ${width ? width : ''}`}>
        <div className='flex items-start justify-between'>
          <h3 className='text-lg font-bold'>{title}</h3>
          <button
            className='btn-outline btn btn-sm btn-circle'
            onClick={closeModal}
          >
            <AiOutlineClose />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
