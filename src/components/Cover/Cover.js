import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';

export const Cover = ({children, style, className, gatsbyImage}) => {
  return (
    <div style={style} className={`text-white h-96  relative ${className}`}>
      
     <div className='absolute h-full w-full'>

      <GatsbyImage alt="" image={gatsbyImage} className="h-full w-full"
      objectFit="cover" objectPosition="center"
      />
     </div>
     <div className='absolute top-0 left-0 h-full w-full bg-black/50'></div>
     <div className='z-10 relative flex h-full items-center justify-center'>
     {children}
     </div>
    </div>
  )
}

