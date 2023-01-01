import { FiEdit2 } from 'react-icons/fi';

interface IValueInputProps {
  label?: string;
  value: string;
  handleClick: () => void;
  info?: string;
  loading?: boolean;
}

export default function ValueInput({
  label,
  value,
  handleClick,
  info,
  loading,
}: IValueInputProps) {
  return (
    <div className='grid grid-cols-6 gap-x-4 py-4 md:gap-x-8'>
      <div className='col-span-2 text-right font-light'>{label}</div>
      <div className='col-span-4 flex items-center'>
        {loading ? (
          <span className='h-6 w-20 animate-pulse rounded-sm bg-gray-100 font-bold'></span>
        ) : (
          <span className='w-full font-bold'>{value}</span>
        )}
        {loading ? null : (
          <button
            className='btn-outline btn-square btn-xs btn'
            onClick={handleClick}
            disabled={loading}
          >
            <FiEdit2 />
          </button>
        )}
      </div>
      <div className='col-span-4 col-start-3 text-sm font-light tracking-tight'>
        {info}
      </div>
    </div>
  );
}
