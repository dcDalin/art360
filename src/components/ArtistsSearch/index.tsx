import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import ArtistsFilter from '@/components/ArtistsSearch/ArtistsFilter';
import CategoryFilter from '@/components/ArtistsSearch/CategoryFilter';
import FilterDisplay from '@/components/ArtistsSearch/FilterDisplay';
import SearchBox from '@/components/ArtistsSearch/SearchBox';
import SummaryCountBadge from '@/components/ArtistsSearch/SummaryCountBadge';

import { RootState } from '@/redux/store';

export default function ArtistsSearch() {
  const { artist, category, searchString } = useSelector(
    (state: RootState) => state.searchArt
  );

  const router = useRouter();

  useEffect(() => {
    router.push(
      {
        pathname: `/shop`,
        query: {
          ...(searchString && { search: searchString }),
          ...(artist && { artist }),
          ...(category && { category }),
        },
      },
      undefined,
      { shallow: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artist, category, searchString]);

  return (
    <div className='mt-4 flex w-full flex-col space-y-4 rounded-lg bg-base-100 p-0 md:mt-0 md:p-6'>
      <FilterDisplay />
      <SummaryCountBadge />
      <SearchBox />
      <CategoryFilter />
      <ArtistsFilter />
    </div>
  );
}
