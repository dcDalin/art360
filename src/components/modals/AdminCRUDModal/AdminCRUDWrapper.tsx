import { BiArrowBack } from 'react-icons/bi';

interface IAdminCRUDModalSwitchProps {
  title: string;
  children: React.ReactNode;
  handleBackButton?: () => void;
}

export default function AdminCRUDWrapper({
  title,
  children,
  handleBackButton,
}: IAdminCRUDModalSwitchProps) {
  return (
    <div>
      <div className='mb-4 flex items-center space-x-2'>
        {typeof handleBackButton === 'function' ? (
          <button
            className='btn-ghost btn-sm btn-circle btn'
            onClick={handleBackButton}
          >
            <BiArrowBack className='cursor-pointer text-2xl' />
          </button>
        ) : null}

        <h3 className='text-lg font-bold'>{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
}
