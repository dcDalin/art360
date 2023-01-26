import { gql } from '@apollo/client';

export const INSERT_ARTISTS_GENRES_PIVOT_ONE = gql`
  mutation insertArtistsGenresPivot($artistId: uuid = "", $genreId: uuid = "") {
    insert_artists_genres_pivot_one(
      object: { artistId: $artistId, genreId: $genreId }
    ) {
      id
    }
  }
`;

export const DELETE_ARTISTS_GENRES_PIVOT = gql`
  mutation deleteArtistsGenresPivot($id: Int = 0) {
    delete_artists_genres_pivot_by_pk(id: $id) {
      id
    }
  }
`;
