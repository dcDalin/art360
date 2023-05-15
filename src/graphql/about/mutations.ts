import { gql } from '@apollo/client';

export const INSERT_ABOUT_ONE = gql`
  mutation insertAboutOne(
    $about: String = ""
    $name: String = ""
    $path: String = ""
  ) {
    insert_about_one(object: { about: $about, name: $name, path: $path }) {
      path
      name
    }
  }
`;

export const DELETE_ABOUT = gql`
  mutation deleteAboutByPk($path: String = "") {
    delete_about_by_pk(path: $path) {
      path
    }
  }
`;
