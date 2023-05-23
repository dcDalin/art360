import { gql } from '@apollo/client';

export const INSERT_GALLERY_ONE = gql`
  mutation insertGalleryOne(
    $imageId: uuid = ""
    $title: String = ""
    $description: String = ""
  ) {
    insert_gallery_one(
      object: { imageId: $imageId, title: $title, description: $description }
    ) {
      id
    }
  }
`;

export const UPDATE_GALLERY_BY_PK = gql`
  mutation updateGalleryByPk(
    $id: uuid = ""
    $description: String = ""
    $title: String = ""
  ) {
    update_gallery_by_pk(
      pk_columns: { id: $id }
      _set: { description: $description, title: $title }
    ) {
      id
    }
  }
`;

export const UPDATE_GALLERY_IMAGE = gql`
  mutation updateGalleryImage($id: uuid = "", $imageId: uuid = "") {
    update_gallery_by_pk(pk_columns: { id: $id }, _set: { imageId: $imageId }) {
      id
    }
  }
`;

export const DELETE_GALLERY = gql`
  mutation deleteGallery($id: uuid = "") {
    delete_gallery_by_pk(id: $id) {
      id
    }
  }
`;
