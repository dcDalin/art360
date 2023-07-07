/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import { CarouselProvider, Slide, Slider } from 'pure-react-carousel';

import 'pure-react-carousel/dist/react-carousel.es.css';

import nhost from '@/lib/nhost';

import SectionWrapper from '@/components/layout/SectionWrapper';
import TableLoader from '@/components/loaders/TableLoader';
import NextImage from '@/components/NextImage';

import { READ_SPONSORS } from '@/graphql/sponsors/queries';

export default function SponsorCarousel() {
  const { data, loading, error } = useQuery(READ_SPONSORS);

  if (loading) return <TableLoader width='full' />;

  if (error) return <p>Could not fetch sponsors</p>;
  return (
    <>
      {data && data.sponsors && data.sponsors.length ? (
        <SectionWrapper heading='Our Sponsors'>
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            orientation='horizontal'
            totalSlides={data.sponsors.length}
            visibleSlides={3}
            isIntrinsicHeight={true}
            infinite={true}
            className='flex items-center justify-center'
          >
            <Slider>
              {data.sponsors.map(({ id, imageId }: any, index: number) => {
                const imageUrl = nhost.storage.getPublicUrl({
                  fileId: imageId,
                });
                return (
                  <Slide key={id} index={index}>
                    <NextImage
                      src={imageUrl}
                      className='flex cursor-pointer items-center'
                      imgClassName='w-24 h-24 rounded-sm object-contain'
                      useSkeleton
                      alt='art'
                      width={96}
                      height={96}
                    />
                  </Slide>
                );
              })}
            </Slider>
          </CarouselProvider>
        </SectionWrapper>
      ) : null}
    </>
  );
}
