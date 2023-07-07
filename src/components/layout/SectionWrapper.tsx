import router from 'next/router';
import { BiArrowBack } from 'react-icons/bi';

interface ISectionWrapperProps {
  heading?: string;
  description?: string;
  children: React.ReactNode;
  backButton?: boolean;
  path?: string;
  textColor?: string;
}

export default function SectionWrapper({
  heading,
  description,
  children,
  backButton,
  path = '/',
  textColor,
}: ISectionWrapperProps) {
  return (
    <div className='py-4 md:py-10'>
      <div className='flex w-full flex-col items-center pb-10'>
        <div className='grid w-full grid-cols-3 items-center'>
          {backButton ? (
            <button
              className='btn-outline btn-sm btn w-10'
              onClick={() => router.push(path)}
            >
              <BiArrowBack className='text-lg' />
            </button>
          ) : (
            <div></div>
          )}
          {heading ? (
            <h1
              className={`text-center text-xl font-bold md:text-5xl ${textColor}`}
            >
              {heading}
            </h1>
          ) : null}
        </div>
        {description ? (
          <p className={`py-2 ${textColor}`}>{description}</p>
        ) : null}
      </div>

      <div>{children}</div>
    </div>
  );
}
