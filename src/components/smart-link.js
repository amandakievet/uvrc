import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const SmartLink = ({ className, to, children }) => {
  const internal = /^\/(?!\/)/.test(to);
  if (internal) {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  } else {
    return (
      <a href={to} className={className}>
        {children}
      </a>
    );
  }
};

export default SmartLink;

SmartLink.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};
