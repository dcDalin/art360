import { gql } from '@apollo/client';

export const INSERT_PRODUCT = gql`
  mutation insertProduct(
    $artist: uuid
    $category: uuid
    $description: String
    $name: String
    $price: numeric
    $subCategory: uuid
  ) {
    insert_products_one(
      object: {
        artist: $artist
        category: $category
        description: $description
        name: $name
        price: $price
        subCategory: $subCategory
      }
    ) {
      id
    }
  }
`;

export const UPDATE_PRODUCT_DESCRIPTION = gql`
  mutation updateProductDescription(
    $id: uuid = ""
    $name: String = ""
    $price: numeric = ""
    $description: String = ""
  ) {
    update_products_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, price: $price, description: $description }
    ) {
      id
    }
  }
`;

export const UPDATE_PRODUCT_ARTIST = gql`
  mutation updateArtistByPk($id: uuid = "", $artist: uuid = "") {
    update_products_by_pk(pk_columns: { id: $id }, _set: { artist: $artist }) {
      id
    }
  }
`;

export const UPDATE_PRODUCT_CATEGORY_SUB_CATEGORY = gql`
  mutation updateProductCategorySubCategory(
    $id: uuid = ""
    $category: uuid = ""
    $subCategory: uuid = null
  ) {
    update_products_by_pk(
      pk_columns: { id: $id }
      _set: { category: $category, subCategory: $subCategory }
    ) {
      id
    }
  }
`;

export const DELETE_PRODUCT_BY_PK = gql`
  mutation deleteProductByPk($id: uuid = "") {
    delete_products_by_pk(id: $id) {
      id
    }
  }
`;
