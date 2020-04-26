import React from "react";
import classnames from "classnames";

import ArticleCard from "./article-card";

const ArticlesList = ({ articleList }) => (
  <div className="grid grid-cols-2 gap-4">
    {articleList.edges.map(({ node }, index) => (
      <ArticleCard {...node.data} uid={node.uid} key={index} />
    ))}
  </div>
);

export default ArticlesList;
