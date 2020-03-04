import React from "react";
import RichText from "./richtext";
import Slice from "./slice";

const Article = ({ headline, author, tag, richtext, body }) => (
  <div className="border-b-2 py-4">
    {tag && <span className="chunkyLabel">{tag}</span>}
    <h2 className="text-3xl">{headline.text}</h2>
    {author && <p>By: {author}</p>}
    {richtext && <RichText html={richtext.html} />}
    {body && body.map((slice, index) => <Slice {...slice} key={index} />)}
  </div>
);

export default Article;
