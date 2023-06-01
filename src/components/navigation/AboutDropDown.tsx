import router from 'next/router';
import { HiOutlineChevronDown } from 'react-icons/hi';

import useAboutDropDownData from '@/hooks/useAboutDropDownData';

import DropDownLink from '@/components/navigation/DropDownLink';

export default function AboutDropDown() {
  const { data, loading, error } = useAboutDropDownData();

  if (loading) return <></>;

  if (error) return <></>;

  return (
    <>
      {data && data.about && data.about.length ? (
        <div className='dropdown-end dropdown rounded-none'>
          <label
            tabIndex={0}
            className='btn-ghost btn gap-2 rounded-none text-base font-bold normal-case'
          >
            About
            <HiOutlineChevronDown />
          </label>
          <ul
            tabIndex={0}
            className='menu-compact dropdown-content menu rounded-box mt-3 w-52 bg-base-100 p-2 shadow'
          >
            <>
              {data.about.map(
                ({ path, name }: { path: string; name: string }) => {
                  return (
                    <DropDownLink
                      key={path}
                      handleClick={() => router.push(`/about/${path}`)}
                      title={name}
                    />
                  );
                }
              )}
            </>
          </ul>
        </div>
      ) : null}
    </>
  );
}
