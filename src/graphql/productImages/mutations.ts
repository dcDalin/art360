import { gql } from '@apollo/client';

export const INSERT_PRODUCT_IMAGES = gql`
  mutation insertProductImages($imageId: uuid = "", $productId: uuid = "") {
    insert_product_images_one(
      object: { imageId: $imageId, productId: $productId }
    ) {
      id
    }
  }
`;
