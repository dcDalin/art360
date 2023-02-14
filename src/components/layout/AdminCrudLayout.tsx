import { useRouter } from 'next/router';
import { IoMdArrowBack } from 'react-icons/io';
import { RiAddFill } from 'react-icons/ri';
interface IAdminCrudLayoutProps {
  children: React.ReactNode;
  title?: string;
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
                className='btn-outline btn-sm btn-circle btn'
                onClick={() =>
                  router.replace(previousLink, undefined, { shallow: true })
                }
              >
                <IoMdArrowBack className='text-lg' />
              </button>
            </div>
          ) : null}
          {title ? <h1 className='text-lg md:text-2xl'>{title}</h1> : null}
        </div>
        {createButton ? (
          <button
            className='btn-primary btn-sm btn gap-2 md:btn-md'
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
