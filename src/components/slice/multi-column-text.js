import React from "react";
import PropTypes from "prop-types";
import RichText from "../richtext";

const MultiColumnTextSlice = ({ items }) => (
  <div className="flex flex-wrap max-w-6xl mx-auto my-10">
    {items.map(({ richtext }, index) => (
      <RichText
        className="flex-1 px-4 min-w-xs pb-8"
        html={richtext.html}
        key={index}
      />
    ))}
  </div>
);

export default MultiColumnTextSlice;

MultiColumnTextSlice.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      richtext: PropTypes.shape({
        html: PropTypes.string
      }).isRequired
    })
  ).isRequired
};
