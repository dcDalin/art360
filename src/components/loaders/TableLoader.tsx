import { ImSpinner2 } from 'react-icons/im';

interface ITableLoaderProps {
  width?: 'lg' | 'full';
  size?: 'sm' | 'md' | 'lg';
}

export default function TableLoader({
  width = 'lg',
  size = 'md',
}: ITableLoaderProps) {
  let spinnerSize;

  if (size === 'sm') {
    spinnerSize = 'h-4 w-4';
  } else if (size === 'md') {
    spinnerSize = 'h-8 w-8';
  } else {
    spinnerSize = 'h-10 w-10';
  }

  return (
    <div className={`${width === 'full' ? 'w-full' : 'max-w-4xl'} px-2`}>
      <div className='flex h-full w-full items-center justify-center'>
        <ImSpinner2 className={`flex animate-spin ${spinnerSize}`} />
      </div>
    </div>
  );
}
