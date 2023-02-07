import { gql } from '@apollo/client';

export const FETCH_PRODUCTS = gql`
  query fetchProducts {
    products(order_by: { createdAt: desc }) {
      artistByArtist {
        nickName
      }
      categoryByCategory {
        name
      }
      createdAt
      id
      isDraft
      name
      description
      price
      product_images {
        imageId
      }
      subCategoryBySubCategory {
        name
      }
    }
  }
`;

export const FETCH_PRODUCTS_BY_PK = gql`
  query fetchProductsByPk($id: uuid = "", $_eq: uuid = "") {
    products_by_pk(id: $id) {
      artistByArtist {
        id
        firstName
        imageId
        lastName
        nickName
      }
      categoryByCategory {
        id
        name
      }
      createdAt
      description
      id
      isDraft
      name
      price
      product_images(where: { productId: { _eq: $_eq } }) {
        id
        imageId
      }
      subCategoryBySubCategory {
        id
        name
      }
    }
  }
`;
