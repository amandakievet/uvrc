import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const SITE_URL = "uppervalleyrunningclub.org";

const SmartLink = ({ className, to, children }) => {
  const hardCoded = to.indexOf(SITE_URL) > -1;
  const mailto = to.indexOf("mailto") > -1;
  const internal = /^\/(?!\/)/.test(to);

  if (internal) {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  }

  if (hardCoded && !mailto) {
    const splitTo = to.split(SITE_URL);
    const link = splitTo[splitTo.length - 1];
    return (
      <Link to={link} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={to} className={className}>
      {children}
    </a>
  );
};

export default SmartLink;

SmartLink.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};
