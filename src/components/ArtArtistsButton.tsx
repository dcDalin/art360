import { useRouter } from 'next/router';

export default function ArtArtistsButton() {
  const router = useRouter();

  return (
    <div className='btn-group'>
      <button
        className='btn-active btn-sm btn'
        onClick={() => router.push('/shop')}
      >
        Art
      </button>
      <button
        className='btn-sm btn'
        onClick={() => router.push('/shop/artists')}
      >
        Artists
      </button>
    </div>
  );
}
