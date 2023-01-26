import { gql } from '@apollo/client';

export const INSERT_SPONSOR_ONE = gql`
  mutation insertSponserOne(
    $description: String = ""
    $imageId: uuid = ""
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

export const UPDATE_SPONSOR_BY_PK = gql`
  mutation updateSponsorByPk(
    $id: uuid = ""
    $description: String = ""
    $title: String = ""
    $url: String = ""
  ) {
    update_sponsors_by_pk(
      pk_columns: { id: $id }
      _set: { description: $description, title: $title, url: $url }
    ) {
      id
    }
  }
`;

export const UPDATE_SPONSOR_IMAGE = gql`
  mutation updateSponsorImage($id: uuid = "", $imageId: uuid = "") {
    update_sponsors_by_pk(
      pk_columns: { id: $id }
      _set: { imageId: $imageId }
    ) {
      id
    }
  }
`;

export const DELETE_SPONSOR = gql`
  mutation deleteSponsor($id: uuid = "") {
    delete_sponsors_by_pk(id: $id) {
      id
    }
  }
`;
