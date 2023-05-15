import { useQuery } from '@apollo/client';
import router from 'next/router';
import { HiOutlineChevronDown } from 'react-icons/hi';

import DropDownLink from '@/components/navigation/DropDownLink';

import { READ_ALL_ABOUT } from '@/graphql/about/queries';

export default function AboutDropDown() {
  const { data, loading, error } = useQuery(READ_ALL_ABOUT);

  if (loading) return <></>;

  if (error) return <></>;

  return (
    <>
      {data && data.about && data.about.length ? (
        <div className='dropdown-end dropdown rounded-none'>
          <label tabIndex={0} className='btn-ghost btn gap-2 rounded-none'>
            About
            <HiOutlineChevronDown />
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow'
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
