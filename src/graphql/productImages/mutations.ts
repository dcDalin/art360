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

export const DELETE_PRODUCT_IMAGE_BY_PK = gql`
  mutation deleteProductImageByPk($id: uuid = "") {
    delete_product_images_by_pk(id: $id) {
      id
    }
  }
`;
