import React, { useEffect, useState } from "react";

const InstagramEmbed = ({ shortcode }) => {
  const [html, setHtml] = useState(null);

  useEffect(() => {
    async function fetchInstagramEmbed() {
      const response = await fetch(`https://api.instagram.com/oembed/?url=http://instagr.am/p/${shortcode}/`);
      const data = await response.json();
      setHtml(data.html);
    }

    if (shortcode) {
      fetchInstagramEmbed();
    }
  }, [shortcode]);

  if (!html) {
    return <div>Loading...</div>;
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default InstagramEmbed;
