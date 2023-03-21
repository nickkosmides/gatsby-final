import React, {useState, useEffect} from "react"
import { useQuery, gql } from "@apollo/client"
import { formatDistance, parseISO, format,  formatDistanceToNow  } from 'date-fns';
const ALL_POSTS_QUERY = gql`
query AllPosts($categoryName: String!) {
  posts(where: {categoryName: $categoryName}) {
    nodes {
      uri
      id
      date
      title
      excerpt
      author {
        node {
          name
        }
      }
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
}

`

export const CategoryTabsHomepage = ({latestnews}) => {
  const [category, setCategory] = useState('playstation')
  const [posts, setPosts] = useState(latestnews.allWpPost.nodes)
  // const [loading, setLoading] = useState('')
  // const [error, setError] = useState('')
  
  const { loading, error, data } = useQuery(ALL_POSTS_QUERY, {
    variables: { categoryName: category },
  })
  
  function categoryChange(cat) {
    setCategory(cat);
    
  }
  
  useEffect(() => {
    console.log(category);
    console.log(data)
    if(!loading && !error) {
         setPosts(data.posts.nodes);
    }
 
    
  }, [category, data]);
  
 
  // console.log(data.posts.nodes)
 
 
  // console.log(posts[0].featuredImage.node.sourceUrl)

// console.log(loading)

  // if (loading) return <p className="bg-black h-[1000px]">Loading...</p>
  // if (error) return <p>Error: {error.message}</p>
 
  return (
    <div className="container px-4 py-20">
      <div className="grid grid-cols-12 gap-6">
    <div className="col-span-8">
      <div className=" mb-20">
      <div className=" bg-white mx-auto  overflow-x-auto">
        <div className="flex  flex-nowrap items-center  navbar-font-family text-lg uppercase h-20">
          <div onClick={() =>categoryChange('latest-news')} className={`${category === 'latest-news' ? "bg-primary text-white":"text-black bg-white"} h-full cursor-pointer whitespace-nowrap  flex items-center px-10`}>Latest news</div>
          <div onClick={() =>categoryChange('playstation') } className={`${category === 'playstation' ? "bg-primary text-white":"text-black bg-white"} h-full cursor-pointer whitespace-nowrap  flex items-center px-10`}>Playstation</div>
          <div onClick={() =>categoryChange('xbox') } className="h-full whitespace-nowrap  text-black flex items-center px-10">Xbox</div>
          <div className="h-full whitespace-nowrap  text-black flex items-center px-10">Nintendo</div>
          <div className="h-full whitespace-nowrap  text-black flex items-center px-10">PC</div>
          <div className="h-full whitespace-nowrap  text-black flex items-center px-10">Movies & TV</div>
          <div className="h-full whitespace-nowrap  text-black flex items-center px-10">tech</div>
        </div>
      </div>
    </div>
    {loading ? (
       <div class="bg-gray-100 pb-10  ">
       <div className="">
         <div class="w-full relative  ">
           <div className="skeleton-img-overlay animate-pulse"><img src="https://dummyimage.com/16:9x1080/"></img></div>
         </div>
         <div class="w-full mt-4 text-xl font-bold text-black max-w-80">
           <div className="skeleton-text animate-pulse"></div>
         </div>
         <div className="flex space-x-5">
           <div className="text-gray-500 uppercase">
             <div className="skeleton-text animate-pulse"></div>
           </div>
           <div className="text-gray-500">
             <div className="skeleton-text animate-pulse"></div>
           </div>
         </div>
       </div>
       <div className=" flex flex-col space-y-10">
         {[1,2,3,4,5].map((num) => (
           <div key={num} class="bg-gray-100 flex w-full">
             <div class="w-6/12 relative  ">
               <div className="skeleton-img-overlay animate-pulse"><img src="https://dummyimage.com/16:9x1080/"></img></div>
             </div>
             <div className="flex w-6/12 flex-col space-y-4 px-2">
               <h2 class="text-xl font-bold text-black">
                 <div className="skeleton-text animate-pulse"></div>
               </h2>
               <div className="skeleton-text animate-pulse"></div>
               <div className="flex space-x-5">
                 <div className="text-gray-500 uppercase">
                   <div className="skeleton-text animate-pulse"></div>
                 </div>
                 <div className="text-gray-500">
                   <div className="skeleton-text animate-pulse"></div>
                 </div>
               </div>
             </div>
           </div>
         ))}
       </div>
     </div>
      ) : (
        posts && (<div class="bg-gray-100 pb-10  ">
        <div className="">
  <div class="w-full relative  ">
       
        <div className="img-overlay   ">
          <img src={posts[0].featuredImage.node.sourceUrl} alt="image" class="h-full w-full object-cover" />
        </div>
      </div>
      <h2 class="w-full mt-4 text-xl font-bold text-black   max-w-80">{posts[0].title}</h2>
      <div className="flex space-x-5">
      <div className="text-gray-500 uppercase">posted by {posts[0].author.node.name}</div>
      <div className="text-gray-500">{ formatDistanceToNow (new Date(posts[0].date), 'MMMM dd, yyyy')} ago</div>
      </div>
      </div>
 
 <div className=" flex flex-col space-y-10">
{posts.slice(1).map(post => (
  <div key={post.id} class="bg-gray-100 flex w-full">
  <div class="w-6/12 relative  ">
       
        <div className="img-overlay   ">
          <img src={post.featuredImage.node.sourceUrl} alt="image" class="h-full w-full object-cover" />
        </div>
        
      </div>
      <div className="flex w-6/12 flex-col space-y-4 px-2">
      <h2 class=" text-xl font-bold text-black  "><a href="#">{post.title}</a></h2>
      <div dangerouslySetInnerHTML={{ __html: post.excerpt.slice(0,150) }} />
      <div className="flex space-x-5">
      <div className="text-gray-500 uppercase">posted by {post.author.node.name}</div>
      <div className="text-gray-500">{ formatDistanceToNow (new Date(post.date), 'MMMM dd, yyyy')} ago</div>
      </div>
      </div>
   
  </div>
))} 
</div>

</div>))}
</div>
<div className="col-span-4 bg-red-500">

</div>
    </div>
    </div>
  )
}
export const query = graphql`
  query AllPosts {
    allWpPost(sort: { fields: date, order: DESC }) {
      nodes {
        uri
        id
        date
        slug
        categories {
          nodes {
            slug
            ancestors {
              nodes {
                slug
              }
            }
          }
        }
        title
        excerpt
        author {
          node {
            name
          }
        }
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;


// import React, { useState } from "react"
// import { useQuery, gql } from "@apollo/client"

// const CATEGORY_POSTS_QUERY = gql`
//   query CategoryPostsQuery($categorySlug: ID!) {
//     category(id: $categorySlug, idType: SLUG) {
//       id
//       name
//       slug
//       posts(first: 10, where: { status: PUBLISH }) {
//         nodes {
//           id
//           title
//           excerpt
//           date
//           slug
//         }
//       }
//     }
//   }
// `

// export const CategoryTabsHomepage = () => {
//   const [categorySlug, setCategorySlug] = useState("uncategorized") // default category
//   const { loading, error, data } = useQuery(CATEGORY_POSTS_QUERY, {
//     variables: { categorySlug },
//   })

//   const handleCategoryChange = (event, newCategorySlug) => {
//     event.preventDefault()
//     setCategorySlug(newCategorySlug)
//   }

//   if (loading) return <p>Loading..a</p>
//   if (error) return <p>Error: {error.message}</p>

//   return (
//     <div>
//       <h2>Category: {data.category.name}</h2>
//       <div>
//         {data.category.posts.nodes.map(post => (
//           <div key={post.id}>
//             <h3><a href={`/posts/${post.slug}`}>{post.title}</a></h3>
//             <p>{post.excerpt}</p>
//             <p>{new Date(post.date).toLocaleDateString()}</p>
//           </div>
//         ))}
//       </div>
//       <div>
//         <h4 className="mt-96">Change Category:</h4>
//         <button onClick={event => handleCategoryChange(event, "uncategorized")}>Uncategorized</button>
//         <button onClick={event => handleCategoryChange(event, "playstation")}>News</button>
//         <button onClick={event => handleCategoryChange(event, "xbox")}>Reviews</button>
//         {/* add more buttons as needed */}
//       </div>
//     </div>
//   )
// }









