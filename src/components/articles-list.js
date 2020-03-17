import React from "react";
import classnames from "classnames";

import ArticleCard from "./article-card";

const ArticlesList = ({ articleList }) => (
  <div className="flex flex-wrap max-w-4xl mx-auto px-4 justify-center">
    {articleList.edges.map(({ node }, index) => (
      <ArticleCard
        {...node.data}
        uid={node.uid}
        key={index}
        className={classnames("border-b-2", {
          "border-r-2": index % 2 === 0 || index === 0
        })}
      />
    ))}
  </div>
);

export default ArticlesList;
