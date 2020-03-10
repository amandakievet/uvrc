import React from "react";
import styles from "./richtext-wp.module.css";

const RichTextWP = ({ html, className }) => (
  <div
    className={`${styles.rt} ${className}`}
    dangerouslySetInnerHTML={{
      __html: html
    }}
  />
);

export default RichTextWP;
