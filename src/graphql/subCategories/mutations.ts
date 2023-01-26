import { gql } from '@apollo/client';

export const INSERT_SUB_CATEGORIES_ONE = gql`
  mutation insertSubCategory(
    $categoryId: uuid = ""
    $description: String = ""
    $name: String = ""
  ) {
    insert_sub_categories_one(
      object: {
        categoryId: $categoryId
        description: $description
        name: $name
      }
    ) {
      id
    }
  }
`;

export const UPDATE_SUB_CATEGORIES_BY_PK = gql`
  mutation updateSubCategory(
    $id: uuid = ""
    $categoryId: uuid = ""
    $description: String = ""
    $name: String = ""
  ) {
    update_sub_categories_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, description: $description, categoryId: $categoryId }
    ) {
      id
    }
  }
`;

export const DELETE_SUB_CATEGORIES = gql`
  mutation deleteSubCategory($id: uuid = "") {
    delete_sub_categories_by_pk(id: $id) {
      id
    }
  }
`;
