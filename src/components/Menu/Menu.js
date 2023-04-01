import React,{useState} from "react";
import {SearchModal} from "../SearchModal";
import { graphql,useStaticQuery } from "gatsby";
import { Link } from "gatsby";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
export const Menu = () => {
  // const data = useStaticQuery(graphql`
  // query MyQuery {
  //     acfOptionsMainMenu {
  //       mainMenu {
  //         menuItems {
  //           root {
  //             destination {
  //               url
  //             }
  //             label
  //           }
  //           subMenuItems {
  //             destination {
  //               url
  //             }
  //             label
  //           }
  //         }
  //       }
  //     }
  // }
  // `);
  // console.log("Main menu", data);
  // const {acfOptionsMainMenu} = data
  // const menuItems = acfOptionsMainMenu?.mainMenu?.menuItems || [];
  
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const handleOpenSearchModal = () => {
    setSearchModalOpen(true);
  };

  const handleCloseSearchModal = () => {
    setSearchModalOpen(false);
  };
  const menuItems = [
    {
      "root": {
        "destination": {
          "url": "/"
        },
        "label": "Home"
      },
    
    },
    {
      "root": {
        "destination": {
          "url": "/news"
        },
        "label": "News"
      },
      "subMenuItems": [
        {
          "destination": {
            "url": "/news/gaming-news"
          },
          "label": "Gaming News"
        },
        {
          "destination": {
            "url": "/news/film-and-tv"
          },
          "label": "Film & TV"
        }
      ]
    },
    {
      "root": {
        "destination": {
          "url": "/reviews/"
        },
        "label": "Reviews"
      },
      "subMenuItems": [
        {
          "destination": {
            "url": "/reviews/game-reviews/"
          },
          "label": "Gaming Reviews"
        }
      ]
    },
    {
      "root": {
        "destination": {
          "url": ""
        },
        "label": "More"
      },
      "subMenuItems": [
        {
          "destination": {
            "url": "/reviews/game-reviews/"
          },
          "label": "Gaming Reviews"
        }
      ]
    }
    
    
    
  ]
  
  return (
 
  <div className="sticky top-0 z-30">
     <SearchModal isOpen={searchModalOpen} onClose={handleCloseSearchModal} />
  <div className="bg-white border-b-[1px] border-gray-300 flex items-center text-black px-4 font-bold   h-20 ">
    <div className=" container mx-auto px-4 flex items-center">
    <div className="flex-1 flex justify-start ">  <FontAwesomeIcon className="lg:hidden text-3xl" icon={faBars} /></div>
  <div className="pixel flex justify-center flex-1  text-primary">Gamebit</div>
  <div onClick={handleOpenSearchModal} className="flex-1 flex justify-end">  <FontAwesomeIcon className="text-3xl cursor-pointer" icon={faSearch} /></div>
  </div>
</div>
<div className="bg-white border-b-[1px] border-gray-300 hidden lg:flex items-center box  text-black px-4  h-16 ">
    <div className=" container mx-auto px-4">
    <div className="flex h-full justify-center items-center">
      {(menuItems || []).map((menuItem, index) => (
      <div key={index} className="group relative flex items-center h-full cursor-pointer ">
        <Link to={menuItem.root.destination.url} className="px-4 flex h-full items-center text-black hover:text-primary uppercase text-xl no-underline navbar-font-family">
        {menuItem.root.label}
        </Link>
        {!!menuItem.subMenuItems?.length && 
        <div className="group-hover:block hidden bg-gray-300 shadow-lg  navbar-font-family uppercase text-left absolute top-full right-0">
          {menuItem.subMenuItems.map((subMenuItem, index) => (
            <Link className="block whitespace-nowrap hover:bg-primary text-black  transition-all duration-300 p-4 no-underline " to={subMenuItem.destination.url} key={index}>
              {subMenuItem.label}
            </Link>
          ))}
</div>
        }
      </div>
    ))}
    
      </div>
  </div>
</div>
</div>
)
  
  
  
}