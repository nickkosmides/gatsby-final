import React,{useState} from 'react';
import { graphql } from 'gatsby';
import {Layout} from "../components/Layout";
import { formatDistanceToNow  } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { PopularPosts } from '../components';
const AuthorPage = ({ data: author, pageContext }) => {
  const [postsPerPage, setPostsPerPage] = useState(7);
  const { currentPage, offset } = pageContext;
console.log(author)
  const authorName = author.allWpPost.nodes[0]?.author.node.name;
  const authorSlug = author.allWpPost.nodes[0]?.author.node.slug;
  const posts = author.allWpPost.nodes;
  console.log(posts,'asd')
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
  const getFullAuthorPathBread = (authName, authSlug) => {
    console.log(authSlug)
    return [{ name: authName, slug: `author/${authSlug}` }];
  };
  
  const authorBread = { name: authorName, slug: authorSlug }; // Replace this with the actual author data.
  const authorPath = getFullAuthorPathBread(authorName,authorSlug);
  console.log(authorPath,'nikos')
  console.log(authorBread,'john')
  const breadcrumbs = authorPath.map((authorItem, index) => {
    const parentAuthorPath = authorPath.slice(0, index + 1).map(author => author.slug).join("/");
    return (
      <li className="flex space-x-3 items-center" key={parentAuthorPath}>
        <FontAwesomeIcon className="text-base" icon={faChevronRight} />
        <a href={`/${parentAuthorPath}`}>{authorItem.name}</a>
      </li>
    );
  });

  console.log(breadcrumbs,'asd')
  // Logic for displaying posts
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost).slice(0, 2); // Only show first 2 posts


  // Logic for displaying page numbers
  const pageNumbers = [];
  console.log(posts.totalCount,'total')
  for (let i = 1; i <= Math.ceil(author.allWpPost.totalCount / postsPerPage); i++) {
    pageNumbers.push(i);
  }
console.log(currentPage,'pagetest')
  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        id={number}
        className={` ${
          currentPage === number ? "active" : null
        }`}
      >
        <a
          className={` ${
            offset/postsPerPage + 1 === number ? "bg-primary text-white shadow-lg" : 'shadow-md bg-gray-300 text-black'
          } page-item cursor-pointer h-10 w-10 flex justify-center items-center `}
          href={
            number === 1
              ? `/author/${authorSlug}/`
              : `/author/${authorSlug}/page/${number}`
          }
        >
          {number}
        </a>
      </li>
    );
  });
  return (
    <Layout>
    <div className="bg-gray-custom py-20">
      <div className="container px-4">
        <div className="text-5xl mb-20 text-center navbar-font-family">Articles by {authorName}</div>
      <div className="grid grid-cols-12 gap-6">
      <div className="lg:col-span-9 col-span-12">
    <ul className="breadcrumb bg-gray-300 text-black shadow-md navbar-font-family p-4 mb-5 flex text-base items-center space-x-3"><li className=""><a href="/">Home</a> </li>{breadcrumbs}</ul>

       
       <div className="flex flex-col space-y-10">
     { posts.map((post) => (
           <div key={post.id} class="bg-gray-100 flex flex-wrap w-full">
           <div class="w-full md:w-4/12 relative  ">
           {/* <pre>{JSON.stringify(post.categories.nodes)}</pre>
           <h2>{post.categories.nodes[0].name}</h2> */}
                 <div className="img-overlay   ">
                   <img src={post.featuredImage.node.sourceUrl} alt="image" class=" h-auto  w-full  " />
                 </div>
                 
               </div>
               <div className="flex w-full md:w-8/12 flex-col space-y-4 py-2 px-5">
               <h1 class=" text-xl font-bold text-black  "><a href={getFullCategoryPathWithPostSlug(getFullCategoryPathSSR(post.categories.nodes),post)}>{post.title}</a></h1>
               <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              
               <div className="flex space-x-5">
               <div className="text-gray-500 text-sm uppercase">posted by <a className="font-bold hover:text-primary" href={`/author/${post.author.node.slug}`}>{post.author.node.name}</a></div>              
               <div className="text-gray-500 text-sm">{ formatDistanceToNow (new Date(post.date), 'MMMM dd, yyyy')} ago</div>
               </div>
               </div>
            
           </div>
          ))}
      </div>
      <ul id="page-numbers" className="container px-4 mt-10 pagination flex flex-wrap space-x-5 ">
    {renderPageNumbers}
  </ul>
    </div>
    <div className="lg:col-span-3 col-span-12 ">
    <div className="flex items-center mb-5 space-x-3"><div className="h-8 w-8 bg-primary"></div><h2 className="text-4xl font-bold navbar-font-family   ">Popular</h2></div>
<PopularPosts/>
    </div>
      </div>
    
    </div>
  
        </div>
    
  </Layout>
  );
};

export const query = graphql`
query MyQuery ($slug: String!, $limit: Int!, $offset: Int!)  {
  allWpPost(
    filter: {author: { node: {slug: {eq: $slug}}}},
    limit: $limit,
    skip: $offset
) {
    
    nodes {
      id
    
        uri
        date
        slug
      title
      excerpt
      author {
        node {
          name
          slug
        }
      }
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
     
    }
     totalCount
  }
}
`;

export default AuthorPage;
