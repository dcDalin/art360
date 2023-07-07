/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import Slider from 'react-slick';

import nhost from '@/lib/nhost';

import ContainerLayout from '@/components/layout/ContainerLayout';
import SectionWrapper from '@/components/layout/SectionWrapper';
import NextImage from '@/components/NextImage';

import { FETCH_NEW_PRODUCTS } from '@/graphql/products/queries';

export default function FeaturedArtCarousel() {
  const { data } = useQuery(FETCH_NEW_PRODUCTS);

  const settings = {
    dots: true,
    infinite:
      data && data.products && data.products.length
        ? data && data.products && data.products.length > 2
        : false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    dotsClass: 'button__bar__brown',
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className='py-10'>
      <SectionWrapper heading='Latest art'>
        <ContainerLayout>
          <Slider {...settings}>
            {data && data.products && data.products.length
              ? data.products.map(({ id, product_images }: any) => {
                  let productImageUrl = '';

                  productImageUrl = nhost.storage.getPublicUrl({
                    fileId: product_images[0].imageId,
                  });

                  return (
                    <div key={id}>
                      <NextImage
                        className='flex w-60 items-center justify-center rounded-t-xl'
                        imgClassName='w-full h-72 object-cover'
                        src={productImageUrl}
                        alt='artist'
                        width={1000}
                        height={1000}
                      />
                    </div>
                  );
                })
              : null}
          </Slider>
        </ContainerLayout>
      </SectionWrapper>
    </div>
  );
}
