import React,{useState} from 'react';
import { formatDistanceToNow  } from 'date-fns';
export const SearchResults = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
 
  const postsPerPage = 7;

  const getPaginatedData = (data, page) => {
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;
    return data.slice(start, end);
  };
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

  return (
    <div>
      {/* <h2>Search Results for "{searchTerm}"</h2> */}
      <ul className="flex flex-col space-y-10">
      {data.map((post) => (

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
      </ul>
    </div>
  );
};

