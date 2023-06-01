import { Disclosure } from '@headlessui/react';
import router from 'next/router';
import { FiChevronRight } from 'react-icons/fi';

import useAboutDropDownData from '@/hooks/useAboutDropDownData';

export default function AboutMobileDisclosure() {
  const { data, loading, error } = useAboutDropDownData();

  if (loading) return <></>;

  if (error) return <></>;
  return (
    <>
      {data && data.about && data.about.length ? (
        <Disclosure>
          {({ open }) => (
            /* Use the `open` state to conditionally change the direction of an icon. */
            <>
              <Disclosure.Button className='flex items-center space-x-8'>
                About
                <FiChevronRight className={open ? 'rotate-90 transform' : ''} />
              </Disclosure.Button>
              <Disclosure.Panel>
                <div className='ml-8 mt-4 flex flex-col space-y-3'>
                  {data.about.map(
                    ({ path, name }: { path: string; name: string }) => {
                      return (
                        <a
                          key={name}
                          onClick={() => router.push(`/about/${path}`)}
                        >
                          {name}
                        </a>
                      );
                    }
                  )}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ) : null}
    </>
  );
}
