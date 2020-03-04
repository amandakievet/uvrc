import React from "react";
import classnames from "classnames";

import RichText from "./richtext";

const Slice = ({ slice_type, primary, items }) => (
  <>
    {slice_type === "row_image___text" && <RowImageText primary={primary} />}
    {slice_type === "ask_the_coaches" && <div>Ask the Coaches</div>}
    {slice_type === "fullsize_image" && <div>Fullsize Image</div>}
    {slice_type === "richtext" && <RichText html={primary.rich_text.html} />}
    {slice_type === "image_gallery" && <div>Image Gallery</div>}
  </>
);

const RowImageText = ({ primary }) => (
  <div
    className={classnames("flex flex-col md:flex-row", {
      "md:flex-row-reverse": primary.image_position === "Right"
    })}
  >
    <img
      src={primary.image.url}
      className={classnames("w-64 self-start", {
        "md:pr-6": primary.image_position === "Left",
        "md:pl-6": primary.image_position === "Right"
      })}
    />
    <RichText html={primary.richtext.html} />
  </div>
);

export default Slice;
