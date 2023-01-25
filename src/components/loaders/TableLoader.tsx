import { ImSpinner2 } from 'react-icons/im';

interface ITableLoaderProps {
  width?: 'lg' | 'full';
}

export default function TableLoader({ width = 'lg' }: ITableLoaderProps) {
  return (
    <div className={`${width === 'full' ? 'w-full' : 'max-w-4xl'} h-40`}>
      <div className='flex h-full w-full items-center justify-center'>
        <ImSpinner2 className='flex h-8 w-8 animate-spin' />
      </div>
    </div>
  );
}
