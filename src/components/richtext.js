import React from "react";
import styles from "./richtext.module.css";

const RichText = ({ html, className }) => (
  <div
    className={`${styles.rt} ${className}`}
    dangerouslySetInnerHTML={{
      __html: html
    }}
  />
);

export default RichText;
