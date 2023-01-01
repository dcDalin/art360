interface IDropDownLinkProps {
  handleClick: () => void;
  title: string;
  icon?: React.ReactNode;
  loading?: boolean;
  badge?: string;
}

export default function DropDownLink({
  handleClick,
  title,
  icon,
  loading,
  badge,
}: IDropDownLinkProps) {
  return (
    <>
      {loading ? (
        <li className='w-full'>
          <a className='h-10 w-full animate-pulse bg-gray-100'></a>
        </li>
      ) : (
        <li className='w-full' onClick={handleClick}>
          <a className='w-full justify-between'>
            <div className='flex items-center space-x-2'>
              {icon}
              <span>{title}</span>
            </div>
            {badge ? <span className='badge'>{badge}</span> : null}
          </a>
        </li>
      )}
    </>
  );
}
