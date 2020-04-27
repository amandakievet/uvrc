import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import SmartLink from "../smart-link";

const LinkBlockItem = ({ block_title, block_link, index }) => (
  <SmartLink
    to={block_link.url}
    className="flex-1 bg-brand-lighter text-white flex items-center block hover:bg-brand c-transition border-r-2 border-brand"
  >
    <h4 className="chunkyLabel md:text-2xl px-3 md:px-6 py-6 md:py-16 max-w-xs">
      {block_title}
    </h4>
  </SmartLink>
);

LinkBlockItem.propTypes = {
  block_title: PropTypes.string.isRequired,
  block_link: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired
};

const LinkBlock = ({ items }) => (
  <div className="flex">
    {items.map((item, index) => (
      <LinkBlockItem {...item} key={index} index={index} />
    ))}
  </div>
);

export default LinkBlock;

LinkBlock.propTypes = {
  items: PropTypes.array.isRequired
};
