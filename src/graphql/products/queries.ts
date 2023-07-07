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
      priceFrame
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
      priceFrame
      isUnique
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
    products(order_by: { createdAt: desc }, limit: 15) {
      id
      name
      price
      priceFrame
      product_images(limit: 1) {
        imageId
      }
    }
  }
`;

export const FETCH_PRODUCTS_FILTER_SORT_PAGINATE = gql`
  query MyQuery($condition: products_bool_exp!, $limit: Int!, $offset: Int!) {
    products(
      order_by: { createdAt: desc }
      where: $condition
      limit: $limit
      offset: $offset
    ) {
      name
      price
      priceFrame
      id
      product_images(limit: 1) {
        id
        imageId
      }
    }
    products_aggregate(where: $condition) {
      aggregate {
        count(columns: id)
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
