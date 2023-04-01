import React from 'react';


export const List = ({ children, className, style }) => {
  return (
    <ul className={`${className} flex flex-col  navbar-font-family`} style={style}>
      {children}
    </ul>
  );
};

