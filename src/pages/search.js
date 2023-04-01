import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { useLocation } from '@reach/router';
import { debounce } from 'lodash';
import { SearchResults } from '../components';
import { PopularPosts } from '../components';
import { Layout } from '../components';
import {Pagination} from '../components';
const SearchPage = ({data}) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 1;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const offset = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(offset, offset + postsPerPage);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSearchQuery(searchParams.get('s') || '');
  }, [location.search]);

  const updateFilteredPosts = debounce((query) => {
    setFilteredPosts(
      data.allWpPost.nodes.filter((post) =>
        query ? post.title.toLowerCase().includes(query.toLowerCase()) : true
      )
    );
  }, 1000);
  

  useEffect(() => {
    updateFilteredPosts(searchQuery);
  }, [searchQuery, data.allWpPost.nodes]);


 

  

  return (
   
       <Layout>
          <div className="bg-gray-custom py-20">
            <div className="container px-4">
            {/* <div className="text-5xl mb-20 text-center navbar-font-family">{searchTerm}</div> */}
            <div className="grid grid-cols-12 gap-10 ">
            <div className="lg:col-span-9 col-span-12">
          {/* <ul className="breadcrumb bg-gray-300 text-black shadow-md navbar-font-family p-4 mb-5 flex text-base items-center space-x-3"><li className=""><a href="/">Home</a> </li>{breadcrumbs}</ul> */}

             
             <div >
             <SearchResults data={paginatedPosts} />

      </div>
 
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        searchQuery={searchQuery}
      />
   
          </div>
          <div className="lg:col-span-3 col-span-12  ">
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
{
  allWpPost {
    
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
        featuredImage {
          node {
            sourceUrl
          }
        }
    }
  }
}
`;

export default SearchPage;
