import { gql } from '@apollo/client';

export const READ_BLOGS = gql`
  query readBlogs {
    blogs(order_by: { createdAt: desc }) {
      id
      title
      excerpt
      createdAt
      blog
    }
  }
`;

export const READ_BLOGS_BY_PK = gql`
  query MyQuery($id: uuid = "") {
    blogs_by_pk(id: $id) {
      blog
      createdAt
      excerpt
      id
      title
      updatedAt
    }
  }
`;
