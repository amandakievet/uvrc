import React from "react";
import styles from "./richtext.module.css";

const RichText = ({ html, classNames }) => (
  <div
    className={`${styles.rt} ${classNames}`}
    dangerouslySetInnerHTML={{
      __html: html
    }}
  />
);

export default RichText;
