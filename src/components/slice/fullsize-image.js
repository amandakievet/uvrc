import React from "react";
import Zoom from "react-medium-image-zoom";
import Img from "gatsby-image";
import "react-medium-image-zoom/dist/styles.css";

const FullsizeImage = ({ primary }) => {
  return (
    <div className="mb-8">
      <Zoom>
        <Img
          fluid={primary.image.fluid}
          className={"h-full max-h-screen mx-auto w-full"}
          imgStyle={{ objectFit: "contain" }}
        />
      </Zoom>
      {primary.caption_optional_ && primary.caption_optional_.text && (
        <p className="text-center text-sm">{primary.caption_optional_.text}</p>
      )}
    </div>
  );
};

export default FullsizeImage;
