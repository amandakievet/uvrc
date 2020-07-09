import React from "react";
import classnames from "classnames";
import RichText from "./richtext";
import Slice from "./slice/index";
import RichTextSlice from "./slice/richtext-slice";

const BoldHeader = ({ headline, author, tag }) => (
  <div className="my-10 text-center">
    {tag && (
      <span className="chunkyLabel text-sm text-brand-lighter">{tag}</span>
    )}
    <h2 className="text-5xl mb-2">{headline.text}</h2>
    {author && <p className="font-display">By: {author}</p>}
  </div>
);
const Header = ({ headline, author, tag }) => (
  <div className="mb-8">
    {tag && (
      <span className="chunkyLabel text-sm text-brand-lighter">{tag}</span>
    )}
    <h2 className="mb-2">{headline.text}</h2>
    {author && <p className="font-display">By: {author}</p>}
  </div>
);

const Article = ({
  headline,
  author,
  tag,
  richtext,
  body,
  className,
  display
}) => {
  const headerProps = { headline, author, tag };
  return (
    <div className={className}>
      <div className="px-4 max-w-4xl mx-auto">
        {display === "bold" ? (
          <BoldHeader {...headerProps} />
        ) : (
          <Header {...headerProps} />
        )}
      </div>
      {richtext && <RichTextSlice html={richtext.html} />}
      {body &&
        body.map((slice, index) => (
          <Slice {...slice} key={index} display={display} />
        ))}
    </div>
  );
};

export default Article;
