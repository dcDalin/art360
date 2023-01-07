import { gql } from '@apollo/client';

export const INSERT_SPONSOR = gql`
  mutation InsertSponsor(
    $title: String = ""
    $imageId: uuid = ""
    $url: String = ""
    $description: String = ""
  ) {
    insert_sponsors_one(
      object: {
        title: $title
        imageId: $imageId
        url: $url
        description: $description
      }
    ) {
      id
    }
  }
`;

export const UPDATE_SPONSOR_DATA = gql`
  mutation UpdateSponsorData(
    $id: uuid = ""
    $url: String = ""
    $title: String = ""
    $description: String = ""
  ) {
    update_sponsors_by_pk(
      pk_columns: { id: $id }
      _set: { url: $url, title: $title, description: $description }
    ) {
      id
    }
  }
`;

export const UPDATE_SPONSOR_IMAGE = gql`
  mutation UpdateSponsorImage($id: uuid = "", $imageId: uuid = "") {
    update_sponsors_by_pk(
      pk_columns: { id: $id }
      _set: { imageId: $imageId }
    ) {
      id
    }
  }
`;
