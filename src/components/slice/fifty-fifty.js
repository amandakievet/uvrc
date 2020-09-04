import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import classnames from "classnames";

import RichText from "../richtext";
import btnStyles from "../../css/buttons.module.css";

const FiftyFiftyLink = ({ cta_text, cta_link }) => (
  <a href={cta_link.url} className={`${btnStyles.primary} mt-3 inline-block`}>
    {cta_text}
  </a>
);
FiftyFiftyLink.propTypes = {
  cta_text: PropTypes.string.isRequired,
  cta_link: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired
};

const FiftyFiftySlice = ({
  text_align,
  text_placement,
  header,
  text,
  image,
  cta_text,
  cta_link
}) => (
  <div
    className={classnames("flex flex-col", {
      "md:flex-row-reverse": text_placement === "left",
      "md:flex-row": text_placement === "right"
    })}
  >
    <Img fluid={image.fluid} className="w-full md:w-1/2" />
    <div className="md:w-1/2 flex items-center justify-center p-4">
      <div
        className={classnames("max-w-md mx-auto", {
          "text-center": text_align === "center",
          "text-left": text_align === "left",
          "text-right": text_align === "right"
        })}
      >
        <RichText html={header.html} />
        <RichText html={text.html} />
        {cta_text && <FiftyFiftyLink cta_text={cta_text} cta_link={cta_link} />}
      </div>
    </div>
  </div>
);

export default FiftyFiftySlice;

FiftyFiftySlice.propTypes = {
  text_placement: PropTypes.oneOf(["left", "right"]).isRequired,
  header: PropTypes.shape({ html: PropTypes.string }).isRequired,
  text: PropTypes.shape({
    html: PropTypes.string
  }),
  image: PropTypes.object.isRequired,
  cta_text: PropTypes.string,
  cta_link: PropTypes.object
};
