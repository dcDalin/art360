import { gql } from '@apollo/client';

export const FETCH_USER_PROFILE = gql`
  query fetchUserProfile($id: uuid = "") {
    user_profile_by_pk(id: $id) {
      address
      country
      firstName
      id
      lastName
      phoneNumber
      town
    }
  }
`;
