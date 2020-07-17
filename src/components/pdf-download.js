import React from "react";
import PDFIcon from "./icons/pdf";

const PDFDownload = ({ url }) => (
  <a
    className="text-sm px-4 underline hover:no-underline block w-40 text-center mx-auto"
    href={url}
    download
    target="_blank"
  >
    <PDFIcon className="w-full text-brand hover:text-brand-lighter fill-current transition duration-500 ease-in-out" />
  </a>
);

export default PDFDownload;
