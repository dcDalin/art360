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
