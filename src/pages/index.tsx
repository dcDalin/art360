import AboutSummary from '@/components/AboutSummary';
import FeaturedArtCarousel from '@/components/carousel/FeaturedArtCarousel';
import ProductsCarousel from '@/components/carousel/ProductsCarousel';
import SponsorCarousel from '@/components/carousel/SponsorCarousel';
import FeaturedArtist from '@/components/FeaturedArtist';
import Layout from '@/components/layout/Layout';

export default function HomePage() {
  return (
    <Layout templateTitle='Home'>
      <FeaturedArtCarousel />
      <AboutSummary />
      <FeaturedArtist />
      <ProductsCarousel />

      <SponsorCarousel />
    </Layout>
  );
}
