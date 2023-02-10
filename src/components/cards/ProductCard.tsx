import router from 'next/router';

import NextImage from '@/components/NextImage';

interface IProductCardProps {
  id: string;
  productImageUrl: string;
  name: string;
  price: number;
}

export default function ProductCard({
  productImageUrl,
  name,
  price,
  id,
}: IProductCardProps) {
  return (
    <div
      className='card-bordered card w-full cursor-pointer shadow-lg'
      onClick={() => router.push(`/art/${id}`)}
    >
      <div>
        <NextImage
          className='flex w-full items-center justify-center rounded-t-xl'
          imgClassName='w-full h-36 object-cover'
          src={productImageUrl}
          alt='artist'
          width={1000}
          height={1000}
        />
      </div>
      <div className='px-4 py-2'>
        <div className='text-sm'>{name}</div>
        <div className='flex items-center space-x-1 font-bold'>
          <div>Ksh.</div>
          <div>{price.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
