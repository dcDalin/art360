import AppLogo from '@/components/AppLogo';
import ContactUs from '@/components/ContactUs';

export default function Footer() {
  return (
    <div className='footer footer-center mt-64 mb-20 bg-neutral text-neutral-content md:mt-4 md:mb-4'>
      <div className='pt-10'>
        <AppLogo />
      </div>
      <div className='my-10'>
        <div className='grid grid-flow-col gap-4'>
          <ContactUs />
        </div>
        <p className='font-bold'>
          Art 360 Kibera <br />
        </p>
        <p>Copyright © 2023 - All right reserved</p>
      </div>
    </div>
  );
}
