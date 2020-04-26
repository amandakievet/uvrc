import React from "react";
import PropTypes from "prop-types";
import SmartLink from "../smart-link";

const LinkBlockItem = ({ block_title, block_link }) => (
  <div className="flex-1 border flex items-center">
    <SmartLink to={block_link.url}>
      <h4 className="chunkyLabel md:text-2xl px-3 md:px-6 py-6 md:py-16 max-w-xs">
        {block_title}
      </h4>
    </SmartLink>
  </div>
);

LinkBlockItem.propTypes = {
  block_title: PropTypes.string.isRequired,
  block_link: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired
};

const LinkBlock = ({ items }) => (
  <div className="flex">
    {items.map((item, index) => (
      <LinkBlockItem {...item} key={index} />
    ))}
  </div>
);

export default LinkBlock;

LinkBlock.propTypes = {
  items: PropTypes.array.isRequired
};
