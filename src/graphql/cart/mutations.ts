import { gql } from '@apollo/client';

export const INSERT_CART_ONE = gql`
  mutation insertCartOne(
    $productId: uuid = ""
    $quantity: numeric = ""
    $userId: uuid = ""
  ) {
    insert_cart_one(
      object: { productId: $productId, quantity: $quantity, userId: $userId }
    ) {
      id
    }
  }
`;

export const DELETE_FROM_CART = gql`
  mutation MyMutation($_eq: uuid = "", $_eq1: uuid = "") {
    delete_cart(
      where: { userId: { _eq: $_eq }, _and: { productId: { _eq: $_eq1 } } }
    ) {
      returning {
        id
      }
    }
  }
`;

export const UPDATE_CART_QUANTITY = gql`
  mutation updateCartQuantity($id: uuid = "", $quantity: numeric = "") {
    update_cart_by_pk(pk_columns: { id: $id }, _set: { quantity: $quantity }) {
      id
    }
  }
`;
