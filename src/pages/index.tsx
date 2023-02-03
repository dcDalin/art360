import FeaturedArtist from '@/components/FeaturedArtist';
import Layout from '@/components/layout/Layout';

export default function HomePage() {
  return (
    <Layout templateTitle='Home'>
      <FeaturedArtist />
    </Layout>
  );
}
