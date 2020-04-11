import React from "react";
import classnames from "classnames";

import ImageGallery from "../image-gallery";
import RichText from "../richtext";
import AskTheCoaches from "../ask-the-coaches";
import FiftyFiftySlice from "./fifty-fifty";
import MultiColumnTextSlice from "./multi-column-text";

const Slice = ({ slice_type, primary, items, display }) => (
  <>
    {slice_type === "row_image___text" && <RowImageText primary={primary} />}
    {slice_type === "ask_the_coaches" && (
      <AskTheCoaches primary={primary} items={items} display={display} />
    )}
    {slice_type === "fullsize_image" && (
      <img
        src={primary.image.url}
        className={classnames("mb-8 max-h-screen", {
          "mx-auto": display === "bold"
        })}
      />
    )}
    {slice_type === "richtext" && (
      <RichText
        html={primary.rich_text.html}
        className={classnames("max-w-3xl", {
          "mx-auto": display === "bold"
        })}
      />
    )}
    {slice_type === "image_gallery" && <ImageGallery items={items} />}
    {slice_type === "50_50" && <FiftyFiftySlice {...primary} />}
    {slice_type === "multi-column_text" && (
      <MultiColumnTextSlice items={items} />
    )}
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
