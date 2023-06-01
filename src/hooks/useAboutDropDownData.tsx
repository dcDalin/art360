import { useQuery } from '@apollo/client';

import { READ_ALL_ABOUT } from '@/graphql/about/queries';

export default function useAboutDropDownData() {
  const { data, loading, error } = useQuery(READ_ALL_ABOUT);

  return { loading, data, error };
}
