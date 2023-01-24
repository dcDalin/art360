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
      lastName
      nickName
      phoneNumber
      twitter
      updatedAt
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
    }
  }
`;
