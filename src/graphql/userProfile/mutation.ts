import { gql } from '@apollo/client';

export const INSERT_USER_PROFILE_ONE = gql`
  mutation insertUserProfileOne($id: uuid = "") {
    insert_user_profile_one(object: { id: $id }) {
      id
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation updateUserProfile(
    $address: String = ""
    $country: String = ""
    $firstName: String = ""
    $lastName: String = ""
    $phoneNumber: String = ""
    $town: String = ""
    $_eq: uuid = ""
  ) {
    update_user_profile(
      where: { id: { _eq: $_eq } }
      _set: {
        address: $address
        country: $country
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
        town: $town
      }
    ) {
      returning {
        id
      }
    }
  }
`;
