import React from "react";
import RichText from "./richtext";
import Slice from "./slice";

const Article = ({ headline, author, tag, richtext, body }) => (
  <div className="border-b-2 py-4">
    <div className="mb-8">
      {tag && <span className="chunkyLabel text-sm text-accent">{tag}</span>}
      <h2 className="text-4xl mb-2">{headline.text}</h2>
      {author && <p className="font-display">By: {author}</p>}
    </div>
    {richtext && <RichText html={richtext.html} className="max-w-3xl" />}
    {body && body.map((slice, index) => <Slice {...slice} key={index} />)}
  </div>
);

export default Article;
