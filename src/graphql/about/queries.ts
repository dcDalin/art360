import { gql } from '@apollo/client';

export const READ_ALL_ABOUT = gql`
  query readAllAbout {
    about {
      name
      about
      path
    }
  }
`;

export const READ_ABOUT_BY_PK = gql`
  query readAboutByPk($path: String = "") {
    about_by_pk(path: $path) {
      name
      about
      path
    }
  }
`;
