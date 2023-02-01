import { gql } from '@apollo/client';

export const INSERT_ARTISTS_ONE = gql`
  mutation InsertArtistsOne(
    $bio: String = ""
    $firstName: String = ""
    $imageId: uuid = ""
    $nickName: String = ""
    $lastName: String = ""
    $isFeatured: Boolean = "false"
  ) {
    insert_artists_one(
      object: {
        bio: $bio
        firstName: $firstName
        imageId: $imageId
        nickName: $nickName
        lastName: $lastName
        isFeatured: $isFeatured
      }
    ) {
      id
    }
  }
`;

export const UPDATE_ARTIST_BY_PK = gql`
  mutation updateArtistByPk(
    $id: uuid = ""
    $bio: String = ""
    $firstName: String = ""
    $lastName: String = ""
    $nickName: String = ""
    $isFeatured: Boolean = "false"
  ) {
    update_artists_by_pk(
      pk_columns: { id: $id }
      _set: {
        bio: $bio
        firstName: $firstName
        lastName: $lastName
        nickName: $nickName
        isFeatured: $isFeatured
      }
    ) {
      id
    }
  }
`;

export const UPDATE_ARTIST_IMAGE = gql`
  mutation updateArtistProfile($id: uuid = "", $imageId: uuid = "") {
    update_artists_by_pk(pk_columns: { id: $id }, _set: { imageId: $imageId }) {
      id
    }
  }
`;

export const DELETE_ARTIST = gql`
  mutation deleteArtist($id: uuid = "") {
    delete_artists_by_pk(id: $id) {
      id
    }
  }
`;
