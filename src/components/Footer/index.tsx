import AppLogo from '@/components/AppLogo';
import ContactUs from '@/components/ContactUs';

export default function Footer() {
  return (
    <div className='footer footer-center mt-64 mb-20 md:mt-4 md:mb-4'>
      <div>
        <AppLogo />
        <p className='font-bold'>
          Art 360 Kibera <br />
        </p>
        <p>Copyright © 2023 - All right reserved</p>
      </div>
      <div>
        <div className='grid grid-flow-col gap-4'>
          <ContactUs />
        </div>
      </div>
    </div>
  );
}
