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

export const FETCH_NEW_PRODUCTS = gql`
  query fetchNewProducts {
    products(order_by: { createdAt: desc }, limit: 10) {
      id
      name
      price
      product_images(limit: 1) {
        imageId
      }
    }
  }
`;

export const FETCH_PRODUCTS_FILTER_SORT_PAGINATE = gql`
  query MyQuery($condition: products_bool_exp!) {
    products(order_by: { createdAt: desc }, where: $condition) {
      name
      price
      id
      product_images(limit: 1) {
        id
        imageId
      }
    }
  }
`;

export const FETCH_PRODUCTS_FILTER_SORT_AGGREGATE = gql`
  query fetchAggregate($condition: products_bool_exp!) {
    products_aggregate(where: $condition) {
      aggregate {
        count(columns: id)
      }
    }
  }
`;
