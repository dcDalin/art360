import { useRouter } from 'next/router';
import { IoMdArrowBack } from 'react-icons/io';
import { RiAddFill } from 'react-icons/ri';
interface IAdminCrudLayoutProps {
  children: React.ReactNode;
  title: string;
  createButton?: boolean;
  previousLink?: string;
}

export default function AdminCrudLayout({
  children,
  title,
  createButton = false,
  previousLink,
}: IAdminCrudLayoutProps) {
  const router = useRouter();
  const { pathname } = useRouter();

  return (
    <div>
      <div className='flex items-center justify-between py-2 md:py-4'>
        <div className='flex items-center space-x-2'>
          {previousLink ? (
            <div className='tooltip' data-tip='back'>
              <button
                className='btn-outline btn btn-sm btn-circle'
                onClick={() =>
                  router.replace(previousLink, undefined, { shallow: true })
                }
              >
                <IoMdArrowBack className='text-lg' />
              </button>
            </div>
          ) : null}
          <h1 className='text-lg md:text-2xl'>{title}</h1>
        </div>
        {createButton ? (
          <button
            className='btn btn-primary btn-sm gap-2 md:btn-md'
            onClick={() => router.push(`${pathname}/create`)}
          >
            New
            <RiAddFill />
          </button>
        ) : null}
      </div>

      <div>{children}</div>
    </div>
  );
}
