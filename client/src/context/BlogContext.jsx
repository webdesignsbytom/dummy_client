import React, { createContext, useContext, useState } from 'react';
// Create the context
export const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  const [blogData, setBlogData] = useState([]);
  const [blogSummaryData, setBlogSummaryData] = useState([]);
  return (
    <BlogContext.Provider
      value={{
        blogData,
        setBlogData,
        blogSummaryData,
        setBlogSummaryData,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

export default BlogProvider;
