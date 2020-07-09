import React from "react";
import Zoom from "react-medium-image-zoom";
import Img from "gatsby-image";
import "react-medium-image-zoom/dist/styles.css";

const FullsizeImage = ({ primary }) => {
  return (
    <Zoom>
      <Img
        fluid={primary.image.fluid}
        className={"mb-8 h-full max-h-screen mx-auto w-full"}
        imgStyle={{ objectFit: "contain" }}
      />
    </Zoom>
  );
};

export default FullsizeImage;
