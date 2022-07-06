import { request, gql } from "graphql-request";
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection(orderBy: createdAt_DESC) {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails {
      posts(orderBy: createdAt_ASC, last: 3) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.posts;
};
export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query, { categories, slug });
  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.categories;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });
  return result.post;
};

export const submitComment = async (obj) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });
  return result.comments;
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};
export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const register = async(name,id)=>{
  const query = gql`
  mutation Register($name:String!,$id:ID) {
  createAuthor(data: {name: $name, photo: {connect: {id: $id}}}) {
    id
    name
    photo {
      fileName
    }
  }
}
`
  const result = await request(graphqlAPI,query,{name,id});
  return result
}

export const publish = async(imageId,authorId)=>{
  const query = gql`
  mutation Register($imageId:ID!,$authorId:ID) {
  
  publishAuthor(where: {id: $authorId}, to: PUBLISHED){
    id
  }
  publishAsset(where: {id: $imageId}, to: PUBLISHED){
    id
  }
}
`
  const result = await request(graphqlAPI,query,{imageId,authorId});
  return result
}
export const publishPost = async(imageId,postId)=>{
  const query = gql`
  mutation Register($imageId:ID!,$postId:ID) {
  
  publishPost(where: {id: $postId}, to: PUBLISHED) {
    id
  }
  publishAsset(where: {id: $imageId}, to: PUBLISHED){
    id
  }
}
`
  const result = await request(graphqlAPI,query,{imageId,postId});
  return result;
}



export const login = async(name)=>{
  const query = gql`
  query Login($name:String!) {
  authors(where: {name:$name}) {
    name
    photo {
      url
    }
    id
  }
}
  `
    const result = await request(graphqlAPI,query,{name});
    return result
}

export const getUser=async(id)=>{
const query = gql`
query Me($id:ID) {
  author(where: {id: $id}) {
    name
    photo {
      url
    }
    bio
  }
}

`
  const result = await request(graphqlAPI,query,{id});
    return result
}
export const getAuthorPosts = async (authorId) => {
  const query = gql`
    query MyQuery ($authorId:ID){
      postsConnection(orderBy: createdAt_DESC, where: {author: {id:$authorId}}) {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query,{authorId});
  return result.postsConnection.edges;
};

export const createPost=async(title,slug,excerpt,content,imageId,authorId,categories)=>{
  const mutation = gql`
  mutation MyMutation($title:String!,$slug:String!,$excerpt:String!,$content:RichTextAST!,$imageId:ID,$authorId:ID,$categories:[CategoryWhereUniqueInput!]) {
  createPost(
    data: {title: $title, slug: $slug, excerpt: $excerpt, content: $content, featuredPost: false, featuredImage: {connect: {id: $imageId}}, author: {connect: {id: $authorId}}, categories: {connect: $categories}}
  ) {
    categories {
      name
    }
    author {
      name
    }
    id
    title
    slug
  }
}

  `
   const result = await request(graphqlAPI, mutation,{title,slug,excerpt,content,imageId,authorId,categories});
   return result;
}


export const getAuthors=async(name)=>{
  const query = gql`
  query Query($name:String!) {
  authors(where: {name: $name}) {
    name
    id
  }
}
  `
     const result = await request(graphqlAPI, query,{name});
     return result;
}

export const uploadImage = async(form)=>{
  const response  = await fetch(`https://cmsfileupload.herokuapp.com/upload`, {
    method: "POST",
    body: form
  });
  const image = await response.json();
  return image.id
}