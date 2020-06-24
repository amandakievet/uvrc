import React from "react";
import classnames from "classnames";
import RichText from "./richtext";
import Slice from "./slice/index";

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
      <div className="px-4">
        {display === "bold" ? (
          <BoldHeader {...headerProps} />
        ) : (
          <Header {...headerProps} />
        )}
      </div>
      {richtext && (
        <div className="px-4">
          <RichText
            html={richtext.html}
            className={classnames("max-w-3xl", {
              "mx-auto": display === "bold"
            })}
          />
        </div>
      )}
      {body &&
        body.map((slice, index) => (
          <Slice {...slice} key={index} display={display} />
        ))}
    </div>
  );
};

export default Article;
