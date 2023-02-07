interface IEditCardWrapperProps {
  children: React.ReactNode;
  title: string;
  handleClick: () => void;
}

export default function EditCardWrapper({
  children,
  title,
  handleClick,
}: IEditCardWrapperProps) {
  return (
    <div className='full card my-4 bg-base-100 shadow-xl'>
      <div className='card-body'>
        <div className='flex items-center justify-between'>
          <h2 className='card-title'>{title}</h2>
          <button
            className='btn-outline btn-sm btn md:btn-md'
            onClick={handleClick}
          >
            Edit
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
