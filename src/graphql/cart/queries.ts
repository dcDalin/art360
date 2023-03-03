import { gql } from '@apollo/client';

export const COUNT_CART_QUANTITY = gql`
  query countCartQuantity($_eq: uuid = "") {
    cart_aggregate(where: { userId: { _eq: $_eq } }) {
      aggregate {
        count(columns: id)
        sum {
          quantity
        }
      }
    }
  }
`;

export const PRODUCT_EXISTS_IN_CART = gql`
  query productExistsInCart($_eq: uuid = "", $_eq1: uuid = "") {
    cart(
      where: { userId: { _eq: $_eq }, _and: { productId: { _eq: $_eq1 } } }
    ) {
      id
    }
  }
`;

export const CART_SUMMARY = gql`
  query cartSummary($_eq: uuid = "") {
    cart(where: { userId: { _eq: $_eq } }, order_by: { createdAt: desc }) {
      id
      quantity
      product {
        name
        price
        id
        isUnique
        product_images {
          id
          imageId
        }
        artistByArtist {
          id
          firstName
          imageId
          lastName
          nickName
        }
      }
    }
    cart_aggregate(where: { userId: { _eq: $_eq } }) {
      aggregate {
        count(columns: id)
        sum {
          quantity
        }
      }
      nodes {
        quantity
      }
    }
  }
`;
