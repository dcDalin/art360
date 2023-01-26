import { gql } from '@apollo/client';

export const READ_ARTISTS_GENRES = gql`
  query fetchArtistsGenres($_eq: uuid = "") {
    artists_genres_pivot(where: { artistId: { _eq: $_eq } }) {
      artist_genre {
        id
        name
      }
      artist {
        firstName
        id
        imageId
        lastName
        nickName
      }
      id
    }
  }
`;
