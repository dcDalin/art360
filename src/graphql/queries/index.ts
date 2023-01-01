import { gql } from '@apollo/client';

export const FETCH_TEST = gql`
  query MyQuery {
    test {
      id
      name
      created_at
    }
  }
`;

export const READ_ALL_SPONSORS = gql`
  query ReadAllSponsors {
    sponsors {
      created_at
      description
      id
      imageId
      title
      url
    }
  }
`;
