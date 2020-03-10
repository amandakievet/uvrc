import React from "react";
import classnames from "classnames";
import RichText from "./richtext";
import Slice from "./slice";

const BoldHeader = ({ headline, author, tag }) => (
  <div className="mb-8 text-center">
    {tag && <span className="chunkyLabel text-sm text-accent">{tag}</span>}
    <h2 className="text-5xl mb-2">{headline.text}</h2>
    {author && <p className="font-display">By: {author}</p>}
  </div>
);
const Header = ({ headline, author, tag }) => (
  <div className="mb-8">
    {tag && <span className="chunkyLabel text-sm text-accent">{tag}</span>}
    <h2 className="text-4xl mb-2">{headline.text}</h2>
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
      {display === "bold" ? (
        <BoldHeader {...headerProps} />
      ) : (
        <Header {...headerProps} />
      )}
      {richtext && (
        <RichText
          html={richtext.html}
          className={classnames("max-w-3xl", {
            "mx-auto": display === "bold"
          })}
        />
      )}
      {body &&
        body.map((slice, index) => (
          <Slice {...slice} key={index} display={display} />
        ))}
    </div>
  );
};

export default Article;
