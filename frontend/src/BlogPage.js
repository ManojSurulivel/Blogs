import React from 'react';

const BlogPage = (props) => {
  return <div>{props?.location?.state?.name} page</div>;
};

export default BlogPage;
