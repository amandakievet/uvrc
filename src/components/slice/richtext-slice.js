import React from "react";
import RichText from "../richtext";

const RichTextSlice = ({ html }) => (
  <RichText html={html} className="max-w-3xl mx-auto my-8 px-4" />
);

export default RichTextSlice;
