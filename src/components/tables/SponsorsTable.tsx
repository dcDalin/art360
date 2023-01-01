import { useQuery } from '@apollo/client';
import Image from 'next/image';

import nhost from '@/lib/nhost';

import { READ_ALL_SPONSORS } from '@/graphql/queries';

export default function SponsorsTable() {
  const { data, loading } = useQuery(READ_ALL_SPONSORS);

  if (loading) return <p>loading...</p>;

  return (
    <div>
      {data && data.sponsors && data.sponsors.length
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.sponsors.map(({ title, imageId, id }: any) => {
            const imageUrl = nhost.storage.getPublicUrl({ fileId: imageId });

            return (
              <div key={id}>
                <h2>{title}</h2>
                <Image src={imageUrl} alt='' width={100} height={100} />
              </div>
            );
          })
        : null}
    </div>
  );
}
