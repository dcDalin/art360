import { gql } from '@apollo/client';

export const READ_SUB_CATEGORIES = gql`
  query readSubCategories {
    sub_categories(order_by: { createdAt: desc }) {
      id
      name
      createdAt
      description
      categoryId
    }
  }
`;

export const READ_SUB_CATEGORIES_BY_PK = gql`
  query readSubCategoriesByPk($id: uuid = "") {
    sub_categories_by_pk(id: $id) {
      id
      name
      createdAt
      description
      categoryId
    }
  }
`;
