import React from "react";

const IFrame = ({ iframe_code }) => (
  <div className="max-w-4xl mx-auto border-2 p-4">
    <div
      dangerouslySetInnerHTML={{ __html: iframe_code.text }}
      className="relative overflow-hidden"
      style={{ paddingTop: "56.25%" }}
    />
  </div>
);
export default IFrame;
