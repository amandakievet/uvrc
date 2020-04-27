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
    to={`/${uid}/`}
    className={`block flex justify-between border-2 p-4 hover:border-brand ${className}`}
  >
    <div className="w-full">
      {tag && (
        <span className="text-brand-lighter chunkyLabel text-xs font-display pb-1">
          {tag}
        </span>
      )}
      <h4 className="text-xl pb-3 leading-tight">{headline.text}</h4>
      <div className="text-xs w-full flex justify-between font-display leading-tight">
        {author && <p className="mr-4">By {author}</p>}
        {date && (
          <p className="text-gray-500 ml-auto">
            {moment(date).format("MMMM Do YYYY")}
          </p>
        )}
      </div>
    </div>
    {article_thumbnail && article_thumbnail.url && (
      <img src={article_thumbnail.url} className="w-24 self-start  pl-6" />
    )}
  </Link>
);

export default ArticleCard;
