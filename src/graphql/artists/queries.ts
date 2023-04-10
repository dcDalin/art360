import { gql } from '@apollo/client';

export const READ_ARTISTS = gql`
  query readArtists {
    artists(order_by: { createdAt: desc }) {
      bio
      createdAt
      facebook
      firstName
      id
      imageId
      instagram
      isFeatured
      lastName
      nickName
      phoneNumber
      artists_genres_pivots {
        artist_genre {
          id
          name
        }
      }
    }
  }
`;

export const READ_ARTISTS_FILTER = gql`
  query readArtists($condition: artists_bool_exp!) {
    artists(order_by: { createdAt: desc }, where: $condition) {
      bio
      createdAt
      facebook
      firstName
      id
      imageId
      instagram
      isFeatured
      lastName
      nickName
      phoneNumber
      artists_genres_pivots {
        artist_genre {
          id
          name
        }
      }
    }
  }
`;

export const READ_ARTIST_BY_PK = gql`
  query readArtistByPk($id: uuid = "") {
    artists_by_pk(id: $id) {
      bio
      firstName
      id
      imageId
      lastName
      nickName
      isFeatured
    }
  }
`;

export const FEATURED_ARTIST = gql`
  query featuredArtist {
    artists(where: { isFeatured: { _eq: true } }, limit: 4) {
      nickName
      lastName
      isFeatured
      imageId
      id
      firstName
      bio
    }
  }
`;

export const ARTIST_PROFILE = gql`
  query artistProfile($id: uuid = "", $_eq: uuid = "") {
    artists_by_pk(id: $id) {
      artists_genres_pivots {
        artist_genre {
          id
          name
        }
      }
      bio
      createdAt
      facebook
      firstName
      id
      imageId
      instagram
      isFeatured
      lastName
      nickName
      phoneNumber
      twitter
      updatedAt
      products(
        where: { artist: { _eq: $_eq } }
        limit: 5
        order_by: { createdAt: desc }
      ) {
        id
        name
        price
        product_images(limit: 1) {
          imageId
          id
        }
      }
    }
  }
`;
