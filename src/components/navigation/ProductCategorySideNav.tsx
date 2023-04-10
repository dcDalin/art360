/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import Link from 'next/link';

import { READ_CATEGORIES } from '@/graphql/categories/queries';

export default function ProductCategorySideNav() {
  const { data } = useQuery(READ_CATEGORIES);

  return (
    <div className='hidden md:block'>
      {data && data.categories && data.categories.length ? (
        <ul className='menu w-56 bg-base-100'>
          {data.categories.map(({ id, name }: any) => {
            return (
              <li key={id}>
                <Link href={`art?category=${id}`}>{name.toUpperCase()}</Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
