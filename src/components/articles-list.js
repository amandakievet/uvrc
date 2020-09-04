import React from "react";
import classnames from "classnames";

import ArticleCard from "./article-card";

const ArticlesList = ({ articleList }) => (
  <div className="flex flex-wrap">
    {articleList.edges.map(({ node }, index) => (
      <ArticleCard
        {...node.data}
        uid={node.uid}
        key={index}
        className="w-1/2"
      />
    ))}
  </div>
);

export default ArticlesList;
