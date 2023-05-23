import { gql } from '@apollo/client';

export const READ_GALLERY = gql`
  query readGallery {
    gallery(order_by: { createdAt: desc }) {
      createdAt
      description
      id
      imageId
      title
      updatedAt
    }
  }
`;

export const READ_GALLERY_BY_PK = gql`
  query readGalleryByPk($id: uuid = "") {
    gallery_by_pk(id: $id) {
      createdAt
      description
      id
      imageId
      title
      updatedAt
    }
  }
`;

export const FETCH_NEW_GALLERY_ITEMS = gql`
  query fetchNewGallery {
    gallery(order_by: { createdAt: desc }, limit: 10) {
      description
      id
      imageId
      title
    }
  }
`;
