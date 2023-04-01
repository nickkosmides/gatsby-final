import React from 'react';
import { BlockRendererComponents } from '../../config/blockRendererComponents'; // Import your BlockRendererComponents

export const CustomBlockRenderer = ({ blocks, columnIndex }) => {
  if (!blocks) return null;

  return (
    <>
      {blocks.map((block) => {
        const Component = BlockRendererComponents(block, columnIndex);
        return Component;
      })}
    </>
  );
};


