import { gql } from '@apollo/client';

export const INSERT_ARTIST_GENRE_ONE = gql`
  mutation insertArtistGenreOne($description: String = "", $name: String = "") {
    insert_artist_genres_one(
      object: { description: $description, name: $name }
    ) {
      id
    }
  }
`;

export const UPDATE_ARTIST_GENRE_BY_PK = gql`
  mutation updateArtistGenre(
    $id: uuid = ""
    $name: String = ""
    $description: String = ""
  ) {
    update_artist_genres_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, description: $description }
    ) {
      id
    }
  }
`;

export const DELETE_ARTIST_GENRE = gql`
  mutation deleteArtistGenre($id: uuid = "") {
    delete_artist_genres_by_pk(id: $id) {
      id
    }
  }
`;
