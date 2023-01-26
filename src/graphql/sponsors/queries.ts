import { gql } from '@apollo/client';

export const READ_SPONSORS = gql`
  query readSponsors {
    sponsors(order_by: { createdAt: desc }) {
      createdAt
      description
      id
      imageId
      title
      updatedAt
      url
    }
  }
`;

export const READ_SPONSOR_BY_PK = gql`
  query readSponsorByPk($id: uuid = "") {
    sponsors_by_pk(id: $id) {
      createdAt
      description
      id
      imageId
      title
      updatedAt
      url
    }
  }
`;
