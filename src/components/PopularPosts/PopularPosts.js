import React, { useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { graphql,useStaticQuery } from "gatsby";
const INCREMENT_POST_VIEWS = gql`
  mutation IncrementPostViews($postId: ID!) {
    incrementPostViews(input: { postId: $postId }) {
      success
    }
  }
`;
 
export const PopularPosts = () => {
  const post = useStaticQuery(graphql`
  query Popular {
    allWpPost {
      nodes {
        id
        title
        excerpt
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          nodes {
            id
            name
            slug
            parentId
            wpParent {
              node {
                id
                name
                slug
              }
            }
          }
        }
        postViews
      }
    }
  }
  
  `);
  console.log(post)
  const posts = post.allWpPost.nodes;
  const getFullCategoryPathWithPostSlug = (categoryPath, post) => {
    return  `/${categoryPath}/${post.slug}`;
  }

  const getFullCategoryPathSSR = (categories) => {
    const findCategoryPath = (category, categories) => {
      if (!category.wpParent || !category.wpParent.node) {
        return [category.slug];
      }
  
      const parentCategory = categories.find((cat) => cat.id === category.wpParent.node.id);
  
      if (!parentCategory) {
        return [category.slug];
      }
  
      return [...findCategoryPath(parentCategory, categories), category.slug];
    };
  
    let longestPath = [];
    categories.forEach((category) => {
      const path = findCategoryPath(category, categories);
      if (path.length > longestPath.length) {
        longestPath = path;
      }
    });
  
    return longestPath.join("/");
  };
  const sortedPosts = post.allWpPost.nodes.sort((a, b) => b.postViews - a.postViews).slice(0,5);
  return (
    <div className="flex flex-col space-y-10">
 
      {sortedPosts.map((post) => (
        <article className=" bg-gray-300 shadow-md">
        <img src={post.featuredImage.node.sourceUrl}/>
        <h1 class=" text-xl font-bold text-black  p-4"><a href={getFullCategoryPathWithPostSlug(getFullCategoryPathSSR(post.categories.nodes),post)}>{post.title}</a></h1>

     
       </article>
      ))}
     
  
    </div>
  );
};


