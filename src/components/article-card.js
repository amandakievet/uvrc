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
    className={`block p-1 md:p-2 ${className ? className : ""}`}
  >
    <div className="flex flex-wrap md:flex-no-wrap justify-between border-2 p-4 hover:border-brand">
      <div className="w-full">
        {tag && (
          <p className="text-brand-lighter chunkyLabel text-xs font-display pb-1 leading-none">
            {tag}
          </p>
        )}
        <h4 className="text-base md:text-xl pb-3 leading-tight normal-case tracking-normal">
          {headline.text}
        </h4>
        <div className="text-xs w-full flex flex-col sm:flex-row justify-between font-display leading-tight">
          {author && <p className="mr-4">By {author}</p>}
          {date && (
            <p className="text-gray-500 sm:ml-auto">
              {moment(date).format("MMMM Do YYYY")}
            </p>
          )}
        </div>
      </div>
      {article_thumbnail && article_thumbnail.url && (
        <img src={article_thumbnail.url} className="w-24 self-start sm:pl-6" />
      )}
    </div>
  </Link>
);

export default ArticleCard;
