import React from "react";
import { embellishTitle } from "../utils/article";

const NewsletterArticleList = ({ articles }) => (
  <>
    {articles.map(({ headline, tag, author }, index) => (
      <span key={index}>
        {index !== 0 && ", "}
        {embellishTitle(headline.text, tag)}
        {author && <> by {author}</>}
      </span>
    ))}
  </>
);

export default NewsletterArticleList;
