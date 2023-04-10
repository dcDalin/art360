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

export const UPDATE_BLOG_ONE = gql`
  mutation MyMutation(
    $id: uuid = ""
    $blog: String = ""
    $excerpt: String = ""
    $title: String = ""
  ) {
    update_blogs_by_pk(
      pk_columns: { id: $id }
      _set: { blog: $blog, excerpt: $excerpt, title: $title }
    ) {
      blog
      excerpt
      title
    }
  }
`;
