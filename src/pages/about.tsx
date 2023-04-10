import ContactUs from '@/components/ContactUs';
import Layout from '@/components/layout/Layout';
import SectionWrapper from '@/components/layout/SectionWrapper';

export default function AboutPage() {
  return (
    <Layout templateTitle='About'>
      <div className='flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-6 md:space-y-0'>
        <div className='w-full overflow-x-auto py-6'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7695619370506!2d36.779736815340335!3d-1.313736636028709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1b71824f3c6d%3A0x5787854ad7efa48c!2sArt360%20Kibera!5e0!3m2!1sen!2ske!4v1679551209197!5m2!1sen!2ske'
            width='600'
            height='450'
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </div>
        <div className='w-full'>
          <SectionWrapper
            heading='Follow us'
            description='Our social media handles'
          >
            <div className='flex w-full items-center justify-center'>
              <ContactUs />
            </div>
          </SectionWrapper>
        </div>
      </div>
    </Layout>
  );
}
