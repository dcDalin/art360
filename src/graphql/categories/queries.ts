import { gql } from '@apollo/client';

export const READ_CATEGORIES = gql`
  query readCategories {
    categories(order_by: { createdAt: desc }) {
      id
      name
      updatedAt
      description
      createdAt
    }
  }
`;

export const READ_CATEGORIES_BY_PK = gql`
  query readCategoriesByPk($id: uuid = "") {
    categories_by_pk(id: $id) {
      createdAt
      description
      id
      name
      updatedAt
    }
  }
`;
