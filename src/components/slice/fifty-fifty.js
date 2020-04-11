import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import classnames from "classnames";

import RichText from "../richtext";

const FiftyFiftyLink = ({ cta_text, cta_link }) => (
  <a href={cta_link.url} className="btn-primary mt-3 inline-block">
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
  text_placement,
  header,
  text,
  image,
  cta_text,
  cta_link
}) => (
  <div
    className={classnames("flex flex-col", {
      "md:flex-row-reverse": text_placement === "right",
      "md:flex-row": text_placement === "left"
    })}
  >
    <Img fluid={image.fluid} className="md:w-1/2" />
    <div className="md:w-1/2 flex items-center justify-center p-4">
      <div className="text-center">
        <RichText html={header.html} />
        <RichText html={text.html} className="max-w-xs" />
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
