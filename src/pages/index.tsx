import ProductsCarousel from '@/components/carousel/ProductsCarousel';
import SponsorCarousel from '@/components/carousel/SponsorCarousel';
import FeaturedArtist from '@/components/FeaturedArtist';
import Layout from '@/components/layout/Layout';

export default function HomePage() {
  return (
    <Layout templateTitle='Home'>
      <div className='flex space-x-0 pb-24 md:space-x-8'>
        <ProductsCarousel />
      </div>
      <FeaturedArtist />
      <SponsorCarousel />
    </Layout>
  );
}
