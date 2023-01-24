interface ITableLoaderProps {
  width?: 'lg' | 'full';
}

export default function TableLoader({ width = 'lg' }: ITableLoaderProps) {
  return (
    <div
      className={`animate-pulse ${width === 'full' ? 'w-full' : 'max-w-4xl'}`}
    >
      <div className='h-10 rounded-t-lg bg-gray-300'></div>
      <div className='h-40  rounded-b-lg bg-gray-200'></div>
      <div className='mt-2 h-10 w-1/2 rounded-lg bg-gray-300'></div>
    </div>
  );
}
