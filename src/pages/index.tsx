import ProductsCarousel from '@/components/carousel/ProductsCarousel';
import SponsorCarousel from '@/components/carousel/SponsorCarousel';
import FeaturedArtist from '@/components/FeaturedArtist';
import Layout from '@/components/layout/Layout';
import ProductCategorySideNav from '@/components/navigation/ProductCategorySideNav';

export default function HomePage() {
  return (
    <Layout templateTitle='Home'>
      <div className='flex space-x-0 pb-24 md:space-x-8'>
        <ProductCategorySideNav />
        <ProductsCarousel />
      </div>
      <FeaturedArtist />
      <SponsorCarousel />
    </Layout>
  );
}
