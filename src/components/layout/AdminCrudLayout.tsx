import { RiAddFill } from 'react-icons/ri';

interface IAdminCrudLayoutProps {
  children: React.ReactNode;
  handleClick: () => void;
  title: string;
  buttonText?: string;
}

export default function AdminCrudLayout({
  children,
  handleClick,
  title,
  buttonText = 'New',
}: IAdminCrudLayoutProps) {
  return (
    <div>
      <div className='flex items-center justify-between py-2 md:py-4'>
        <h1>{title}</h1>
        <button className='btn btn-primary gap-2' onClick={handleClick}>
          {buttonText}
          <RiAddFill />
        </button>
      </div>

      <div>{children}</div>
    </div>
  );
}
