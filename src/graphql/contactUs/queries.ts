import { gql } from '@apollo/client';

export const FETCH_CONTACT_US = gql`
  query fetchContactUs {
    contact_us(limit: 1) {
      email
      facebook
      id
      instagram
      phone_number
      tiktok
      youtube
    }
  }
`;
