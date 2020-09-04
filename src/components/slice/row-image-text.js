import React from "react";
import classnames from "classnames";
import Zoom from "react-medium-image-zoom";
import Img from "gatsby-image";
import "react-medium-image-zoom/dist/styles.css";

import RichText from "../richtext";

const RowImageText = ({ primary }) => (
  <div
    className={classnames("flex flex-col md:flex-row px-4 max-w-4xl mx-auto", {
      "md:flex-row-reverse justify-end": primary.image_position === "Right"
    })}
  >
    <figure
      className={classnames("self-start w-full sm:w-64", {
        "md:pr-6": primary.image_position === "Left",
        "md:pl-6": primary.image_position === "Right"
      })}
    >
      <Zoom>
        <Img fluid={primary.image.fluid} className="w-full" />
      </Zoom>
      {primary.image_caption && (
        <figcaption>{primary.image_caption}</figcaption>
      )}
    </figure>
    <RichText html={primary.richtext.html} className="flex-1" />
  </div>
);

export default RowImageText;
