import React, { useState } from "react";
import FsLightbox from "fslightbox-react";

const ImageGallery = ({ items }) => {
  const [toggler, setToggler] = useState(false);

  return (
    <>
      <div className="flex flex-wrap">
        {items.map(({ gallery_image }, index) => (
          <img
            className="w-64 cursor-pointer p-3"
            src={gallery_image.thumbnails.Thumbnail.url}
            onClick={() => setToggler(!toggler)}
            key={index}
          />
        ))}
      </div>
      <FsLightbox
        toggler={toggler}
        sources={items.map(item => item.gallery_image.url)}
      />
    </>
  );
};

export default ImageGallery;
