import React from "react";
import { Link } from "gatsby";
import btnStyles from "../css/buttons.module.css";

const Pagination = ({ next, prev }) => (
  <div className="flex justify-between chunkyLabel max-w-6xl w-full mx-auto mt-10">
    {prev && (
      <Link to={prev} className={btnStyles.link}>
        Newer
      </Link>
    )}
    {next && (
      <Link to={next} className={`${btnStyles.link} ml-auto`}>
        Older
      </Link>
    )}
  </div>
);

export default Pagination;
