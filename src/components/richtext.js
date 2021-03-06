import React from "react";
import styles from "../css/richtext.module.css";

const RichText = ({ html, className }) => {
  const strippedHtml = html.replace(/undefined/g, "");
  return (
    <div
      className={`${styles.rt} ${className}`}
      dangerouslySetInnerHTML={{
        __html: strippedHtml
      }}
    />
  );
};

export default RichText;
