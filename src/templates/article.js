import React from "react";
import { fromGlobalId } from 'graphql-relay';
import { graphql } from "gatsby";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Layout } from "../components/Layout";
import { BlockRenderer,getStyles, getClasses } from "@webdeveducation/wp-block-tools";
import { useEffect } from "react";
import { PopularPosts } from "../components";
import { formatDistanceToNow  } from 'date-fns';
import { Link } from "gatsby";

import {
  FacebookShareCount,
  HatenaShareCount,
  OKShareCount,
  PinterestShareCount,
  RedditShareCount,
  TumblrShareCount,
  VKShareCount,
  FacebookShareButton
} from "react-share";

const INCREMENT_POST_VIEWS = gql`
  mutation IncrementPostViews($postId: ID!) {
    incrementPostViews(input: { postId: $postId }) {
      success
      message
    }
  }
`;
const Post = ({ data ,pageContext}) => {
  useEffect(() => {
    // Manually reload Instagram script on component update
    if (window.instgrm && window.instgrm.Embeds) {
      window.instgrm.Embeds.process()
    }
  }, [data])

   
  console.log('asd', pageContext.blocks)
  const post = data.wpPost;

  const [incrementPostViews, { data: mutationData, error: mutationError }] = useMutation(INCREMENT_POST_VIEWS);

  useEffect(() => {
    const incrementViews = async () => {
      try {
        console.log("decodedPostId:", post.id);
      const { id: numericId } = fromGlobalId(post.id);
      console.log("numericId:", numericId);
        console.log("decodedPostId:", post.id);
        await incrementPostViews({ variables: { postId: numericId } });
      } catch (error) {
        console.error("Failed to increment post views:", error);
      }
    };

    incrementViews();
  }, [post.id, incrementPostViews]);

  console.log("Mutation data:", mutationData);
  console.log("Mutation error:", mutationError);

  return (
    <Layout>
      <div className="bg-gray-custom py-20 relative">
        <div className="absolute top-0 z-0 min-w-full opacity-20">
          <div className="relative  ">
          <img className="object-cover h-full w-full" src={post.featuredImage.node.sourceUrl}/>
          <div class="absolute bottom-0 w-full h-64 bg-gradient-to-t from-gray-custom to-transparent opacity-100"></div>
          </div></div>
          <div className="grid grid-cols-12 gap-10 container relative z-20">
          <div className="lg:col-span-9 col-span-12">
    <div className=" relative z-20 mx-auto bg-white p-10">
      <h1 className="text-4xl font-bold my-4">{post.title}</h1>
      <p dangerouslySetInnerHTML={{ __html: post.excerpt }}></p> 
      <div className="flex space-x-5 mt-4">
                     <div className="text-gray-500 text-sm uppercase">by <a className="font-bold hover:text-primary" href={`/author/${post.author.node.slug}`}>{post.author.node.name}</a></div>
                    
                     <div className="text-gray-500 text-sm uppercase">PUBLISHED { formatDistanceToNow (new Date(post.date), 'MMMM dd, yyyy')} ago</div>
                     </div>
      <div className="flex my-5">
        <FacebookShareButton url={post.uri} className="mr-2">
          <span className="sr-only">Share on Facebook</span>
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M20 12.066c0-5.524-4.475-10-10-10-5.522 0-10 4.476-10 10 0 4.946 3.627 9.022 8.369 9.791v-6.955h-2.509v-2.846h2.51v-2.174c0-2.488 1.488-3.849 3.729-3.849 1.082 0 2.015.08 2.283.116v2.583l-1.564.001c-1.232 0-1.473.587-1.473 1.445v1.898h2.942l-.384 2.846h-2.558v6.875c4.512-.793 7.931-4.755 7.931-9.616z"
              clipRule="evenodd"
            />
          </svg>
        </FacebookShareButton>
        {/* <FacebookShareCount url={post.uri} className="mr-2">
          {(count) => <span className="text-sm">{count} shares</span>}
        </FacebookShareCount>
        <HatenaShareCount url={post.uri} className="mr-2">
          {(count) => <span className="text-sm">{count} shares</span>}
        </HatenaShareCount>
        <OKShareCount url={post.uri} className="mr-2">
          {(count) => <span className="text-sm">{count} shares</span>}
        </OKShareCount>
        <PinterestShareCount url={post.uri} className="mr-2">
          {(count) => <span className="text-sm">{count} shares</span>}
        </PinterestShareCount>
        <RedditShareCount url={post.uri} className="mr-2">
          {(count) => <span className="text-sm">{count} shares</span>}
        </RedditShareCount>
        <TumblrShareCount url={post.uri} className="mr-2">
          {(count) => <span className="text-sm">{count} shares</span>}
        </TumblrShareCount>
        <VKShareCount url={post.uri}>
          {(count) => <span className="text-sm">{count} shares</span>}
        </VKShareCount> */}
      </div>
      <div className="article">
      {/* <div className={`text-lg ${post.postClass}`} dangerouslySetInnerHTML={{ __html: post.content }} /> */}
      {post.blocks.map((block, index) => {
        
        return  <div styles={getStyles(block)} className={getClasses(block)} dangerouslySetInnerHTML={{ __html: block.originalContent }} />
      })}
        
      {/* Render the InstagramEmbed component for each Instagram post URL */}
      {/* {post.socialMediaLinks.instagramUrl.map(url => ( */}
       
      {/* ))} */}
    </div>
    <div className="flex flex-wrap items-center space-x-3 mt-6 font-bold">
        <h3 className="">Tags:</h3>
        <ul className="flex space-x-3 flex-wrap">
          {post.tags.nodes.map((tag) => (
            <li className="bg-gray-300 px-3 py-1" key={tag.slug}>
              <Link to={`/tag/${tag.slug}`}>{tag.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
    <div className="lg:col-span-3 col-span-12 ">
          <div className=" flex items-center mb-5 space-x-3"><div className="h-8 w-8 bg-primary"></div><h2 className="text-4xl font-bold navbar-font-family   ">Popular</h2></div>
<PopularPosts/>
          </div>
    </div>
    </div>
    </Layout>
  );
};

export default Post;

export const query = graphql`
  query($slug: String!) {
    wpPost(slug: { eq: $slug }) {
      id
      title
      content
      uri
      blocks
      date
     excerpt
     author{
      node{
        name
        slug
      
      }
     }
      featuredImage {
        node {
          sourceUrl
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

