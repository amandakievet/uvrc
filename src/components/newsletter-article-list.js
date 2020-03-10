import React from "react";
import { articleCompare, embellishTitle } from "../utils/article";

const NewsletterArticleList = ({ articles }) => {
  const sortedArticles = articles.sort(articleCompare);
  return (
    <>
      {articles.map(({ node }, index) => (
        <>
          {index !== 0 && ", "}
          {embellishTitle(node.data.headline.text, node.data.tag)}
          {node.data.author && <> by {node.data.author}</>}
        </>
      ))}
    </>
  );
};

export default NewsletterArticleList;
