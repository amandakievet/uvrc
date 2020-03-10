import React from "react";
import { Link } from "gatsby";

const Pagination = ({ next, prev }) => (
  <div className="flex justify-between chunkyLabel">
    {prev && <Link to={prev}>Newer</Link>}
    {next && (
      <Link to={next} className="ml-auto">
        Older
      </Link>
    )}
  </div>
);

export default Pagination;
