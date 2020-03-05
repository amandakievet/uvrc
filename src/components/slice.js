import React from "react";
import classnames from "classnames";

import ImageGallery from "./image-gallery";
import RichText from "./richtext";

const Slice = ({ slice_type, primary, items }) => (
  <>
    {slice_type === "row_image___text" && <RowImageText primary={primary} />}
    {slice_type === "ask_the_coaches" && <div>Ask the Coaches</div>}
    {slice_type === "fullsize_image" && (
      <img src={primary.image.url} className="mb-8 max-h-screen" />
    )}
    {slice_type === "richtext" && (
      <RichText html={primary.rich_text.html} className="max-w-3xl" />
    )}
    {slice_type === "image_gallery" && <ImageGallery items={items} />}
  </>
);

const RowImageText = ({ primary }) => (
  <div
    className={classnames("flex flex-col md:flex-row", {
      "md:flex-row-reverse justify-end": primary.image_position === "Right"
    })}
  >
    <img
      src={primary.image.url}
      className={classnames("self-start w-64", {
        "md:pr-6": primary.image_position === "Left",
        "md:pl-6": primary.image_position === "Right"
      })}
    />
    <RichText html={primary.richtext.html} className="max-w-3xl" />
  </div>
);

export default Slice;
