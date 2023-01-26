import { gql } from '@apollo/client';

export const INSERT_CATEGORIES_ONE = gql`
  mutation insertCategoriesOne($name: String = "", $description: String = "") {
    insert_categories_one(object: { name: $name, description: $description }) {
      id
    }
  }
`;

export const UPDATE_CATEGORIES_BY_PK = gql`
  mutation updateCategoriesByPk(
    $id: uuid = ""
    $name: String = ""
    $description: String = ""
  ) {
    update_categories_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, description: $description }
    ) {
      id
    }
  }
`;

export const DELETE_CATEGORIES = gql`
  mutation deleteCategories($id: uuid = "") {
    delete_categories_by_pk(id: $id) {
      id
    }
  }
`;
