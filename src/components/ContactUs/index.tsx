import { useQuery } from '@apollo/client';
import { AiFillFacebook, AiFillInstagram, AiFillYoutube } from 'react-icons/ai';
import { FaTiktok } from 'react-icons/fa';

import TableLoader from '@/components/loaders/TableLoader';

import { FETCH_CONTACT_US } from '@/graphql/contactUs/queries';

export default function ContactUs() {
  const { data, loading, error } = useQuery(FETCH_CONTACT_US);

  if (loading) return <TableLoader width='full' />;

  if (error) return <p>Could not fetch contact details</p>;

  return (
    <div>
      {data && data.contact_us && data.contact_us.length ? (
        <div>
          <div className='flex items-center space-x-2'>
            {data.contact_us[0].facebook ? (
              <AiFillFacebook className='h-12 w-12' />
            ) : null}

            {data.contact_us[0].facebook ? (
              <AiFillInstagram className='h-12 w-12' />
            ) : null}

            {data.contact_us[0].facebook ? (
              <AiFillYoutube className='h-12 w-12' />
            ) : null}

            {data.contact_us[0].facebook ? (
              <FaTiktok className='h-12 w-12' />
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
