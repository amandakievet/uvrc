import React from "react";
import classnames from "classnames";

import CommitteesSlice from "./committees";
import FiftyFiftySlice from "./fifty-fifty";
import ImageGallery from "../image-gallery";
import RichText from "../richtext";
import AskTheCoaches from "../ask-the-coaches";
import MultiColumnTextSlice from "./multi-column-text";
import UpcomingEvents from "../upcoming-events";
import LinkBlock from "./link-block";
import RaceListSlice from "./race-list";
import FullsizeImage from "./fullsize-image";
import RichTextSlice from "./richtext-slice";
import RowImageText from "./row-image-text";
import Quote from "./quote";
import IFrame from "./iframe";

const Slice = ({ slice_type, primary, items, display }) => (
  <>
    {slice_type === "link_blocks" && <LinkBlock items={items} />}
    {slice_type === "race_list" && <RaceListSlice items={items} />}
    {slice_type === "row_image___text" && <RowImageText primary={primary} />}
    {slice_type === "ask_the_coaches" && (
      <AskTheCoaches primary={primary} items={items} display={display} />
    )}
    {slice_type === "fullsize_image" && <FullsizeImage primary={primary} />}
    {slice_type === "richtext" && (
      <RichTextSlice
        html={
          (primary.richtext && primary.richtext.html) ||
          (primary.rich_text && primary.rich_text.html)
        }
      />
    )}
    {slice_type === "image_gallery" && <ImageGallery items={items} />}
    {slice_type === "50_50" && <FiftyFiftySlice {...primary} />}
    {slice_type === "multi-column_text" && (
      <MultiColumnTextSlice items={items} />
    )}
    {slice_type === "boards___committees" && <CommitteesSlice />}
    {slice_type === "next_meetups" && <UpcomingEvents {...primary} />}
    {slice_type === "quote" && <Quote {...primary} />}
    {slice_type === "iframe" && <IFrame {...primary} />}
  </>
);

export default Slice;
