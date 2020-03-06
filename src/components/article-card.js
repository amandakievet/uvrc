import React from "react";
import { Link } from "gatsby";
import moment from "moment";

const ArticleCard = ({ headline, author, tag, date, uid, className }) => (
  <Link to={`/${uid}`} className={`p-3 w-full max-w-xs block ${className}`}>
    {tag && (
      <span className="text-accent chunkyLabel text-xs font-display">
        {tag}
      </span>
    )}
    <h4 className="text-xl pb-3 leading-tight">{headline.text}</h4>
    <div className="text-xs flex justify-between font-display leading-tight">
      {author && <p>By {author}</p>}
      <p className="text-gray-500">{moment(date).format("MMMM Do YYYY")}</p>
    </div>
  </Link>
);

export default ArticleCard;
