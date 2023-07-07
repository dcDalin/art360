/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import Slider from 'react-slick';

import nhost from '@/lib/nhost';

import ContainerLayout from '@/components/layout/ContainerLayout';
import SectionWrapper from '@/components/layout/SectionWrapper';
import NextImage from '@/components/NextImage';

import { FETCH_NEW_GALLERY_ITEMS } from '@/graphql/gallery/queries';

export default function ProductsCarousel() {
  const { data } = useQuery(FETCH_NEW_GALLERY_ITEMS);

  const settings = {
    dots: true,
    infinite:
      data && data.gallery && data.gallery.length
        ? data && data.gallery && data.gallery.length > 2
        : false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    dotsClass: 'button__bar',
    arrows: false,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
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
    <div className='bg-art-brown py-10'>
      <SectionWrapper heading='Gallery' textColor='text-white'>
        <ContainerLayout>
          <Slider {...settings}>
            {data && data.gallery && data.gallery.length
              ? data.gallery.map(({ id, imageId }: any) => {
                  let productImageUrl = '';

                  productImageUrl = nhost.storage.getPublicUrl({
                    fileId: imageId,
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
