/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';

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
                <a>{name}</a>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
