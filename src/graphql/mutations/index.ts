import { gql } from '@apollo/client';

export const INSERT_SPONSOR = gql`
  mutation InsertSponsor(
    $description: String = ""
    $imageId: String = ""
    $title: String = ""
    $url: String = ""
  ) {
    insert_sponsors_one(
      object: {
        description: $description
        imageId: $imageId
        title: $title
        url: $url
      }
    ) {
      id
    }
  }
`;
