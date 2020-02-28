import React from "react";

const RichText = ({ html }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: html
    }}
  />
);

export default RichText;
