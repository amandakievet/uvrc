import React from "react";
import { Link } from "gatsby";
import moment from "moment";

const ArticleCard = ({
  headline,
  author,
  tag,
  date,
  article_thumbnail,
  uid,
  className
}) => (
  <Link
    to={`/${uid}`}
    className={`p-3 w-full max-w-sm block flex justify-between ${className}`}
  >
    <div className="w-full">
      {tag && (
        <span className="text-accent chunkyLabel text-xs font-display">
          {tag}
        </span>
      )}
      <h4 className="text-xl pb-3 leading-tight">{headline.text}</h4>
      <div className="text-xs w-full flex justify-between font-display leading-tight">
        {author && <p>By {author}</p>}
        {date && (
          <p className="text-gray-500">{moment(date).format("MMMM Do YYYY")}</p>
        )}
      </div>
    </div>
    {article_thumbnail && article_thumbnail.url && (
      <img src={article_thumbnail.url} className="w-24 self-start  pl-6" />
    )}
  </Link>
);

export default ArticleCard;
