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
