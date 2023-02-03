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
