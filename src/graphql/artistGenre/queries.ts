import { gql } from '@apollo/client';

export const READ_ARTIST_GENRES = gql`
  query readArtistGenres {
    artist_genres(order_by: { createdAt: desc }) {
      id
      name
      description
    }
  }
`;

export const READ_ARTIST_GENRES_BY_PK = gql`
  query readArtistGenresByPk($id: uuid = "") {
    artist_genres_by_pk(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
