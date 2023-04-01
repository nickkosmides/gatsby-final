import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { navigate } from 'gatsby';
export const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  

  

  
  if (!isOpen) {
    return null;
  }



  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  navigate(`/search/?s=${encodeURIComponent(searchTerm)}`);
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-80">
        <form className="relative w-full max-w-4xl mx-4 md:mx-0" onSubmit={handleSubmit}>
  <div className="w-full">
    <div className="flex items-center w-full bg-white border-primary border-4">
  
      <input
        type="text"
        placeholder="Search..."
        className="flex-grow pl-4 pr-20 py-4 text-lg text-black transition-all duration-300 focus:outline-none"
      
      
        value={searchTerm}
        onChange={handleChange}
      
      />
      <div className="flex items-center justify-center w-16 bg-white">
        <button type="submit"
          className="text-black transition-all duration-300 focus:outline-none hover:text-primary"
        >
          <FontAwesomeIcon className="text-3xl" icon={faSearch} />
        </button>
       
      </div>
    
    </div>
   
  </div>
  </form>
  <button
      className="absolute top-0 p-10 right-0 mt-2 mr-2 text-white transition-all duration-300 focus:outline-none hover:text-red-500"
      onClick={onClose}
    >
      <FontAwesomeIcon className="text-3xl" icon={faTimes} />
    </button>
</div>
  );
};


