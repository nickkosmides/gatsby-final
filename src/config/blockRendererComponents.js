import React from "react";
import { BlockRenderer,getStyles, getClasses } from "@webdeveducation/wp-block-tools";
import { CustomBlockRenderer } from "../components/CustomBlockRenderer";
import { MediaText,Cover, Gallery } from "../components/index";
import { GatsbyImage } from "gatsby-plugin-image";
import {List} from '../components/List';

import numeral from "numeral";
import columnListStyles from '../styles/column-lists.module.css';

export const BlockRendererComponents = (block, columnIndex) => {
  console.log('asd')
  switch(block.name){
case "core/media-text": {
  console.log("render component2: ", block.attributes.gatsbyImage);
  return (<MediaText key={block.id} className={getClasses(block)} style={getStyles(block)}
  verticalAlignment={block.attributes.verticalAlignment}
  gatsbyImage={block.attributes.gatsbyImage}
  mediaPosition={block.attributes.mediaPosition}
  >
    <BlockRenderer blocks={block.innerBlocks}/>
  </MediaText>
  );
}
// case "core/cover": {
//   return <Cover key={block.id} style={getStyles(block)}
//   className={getClasses(block)}
//   gatsbyImage={block.attributes.gatsbyImage}>
//   <BlockRenderer blocks={block.innerBlocks}/>
//   </Cover>
// }
case "core/gallery": {
  return <Gallery key={block.id} 
  
  
  >
  <BlockRenderer blocks={block.innerBlocks}/>
  </Gallery>
}

case "core/columns": {
  const columns = block.innerBlocks.map((columnBlock, index) => (
    <CustomBlockRenderer key={columnBlock.id} blocks={columnBlock.innerBlocks} columnIndex={index + 1} />
  ));

  return <div className="columns flex space-x-3 items-center !mb-1">{columns}</div>;
}
case "core/list": {
  console.log(columnIndex,'test')
  const listClassName = columnIndex === 1 ? "text-black text-2xl font-bold" : columnIndex === 2 ? "text-gray-500" : "text-gray-500";
  return ( 
    <List
    key={block.id}
    className={`${getClasses(block)} ${listClassName}`}
    style={getStyles(block)}
  >
    <BlockRenderer blocks={block.innerBlocks} columnIndex={columnIndex} />
  </List>
  );
}
default:
  return null
  }
}