import { gql } from '@apollo/client';

export const INSERT_BLOG_ONE = gql`
  mutation insertBlogOne(
    $blog: String = ""
    $excerpt: String = ""
    $title: String = ""
  ) {
    insert_blogs_one(
      object: { blog: $blog, excerpt: $excerpt, title: $title }
    ) {
      id
    }
  }
`;
