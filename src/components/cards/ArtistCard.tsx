/* eslint-disable @typescript-eslint/no-explicit-any */
import router from 'next/router';

import NextImage from '@/components/NextImage';

interface IArtistCardProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
  nickName?: string;
  genres: any;
  artistId: string;
}

export default function ArtistCard({
  imageUrl,
  firstName,
  lastName,
  genres,
  artistId,
}: IArtistCardProps) {
  return (
    <div className='card w-full'>
      <div>
        <figure className='mask mask-square px-10 pt-10'>
          <NextImage
            imgClassName='w-24 h-24 object-cover'
            src={imageUrl}
            alt='artist'
            width={1000}
            height={1000}
          />
        </figure>
      </div>
      <div className='card-body'>
        <div className='flex flex-col items-center justify-center'>
          <h2 className='card-title'>{`${firstName} ${lastName}`}</h2>
          <button
            className='btn-info btn-sm btn'
            onClick={() => router.push(`/shop/artists/${artistId}`)}
          >
            View profile
          </button>
        </div>
        <div className='card-actions justify-center'>
          {genres && genres.length
            ? genres.map(({ artist_genre: { name, id } }: any) => {
                return (
                  <div key={id} className='badge-outline badge'>
                    {name}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
