import React, { useState } from "react";
import FsLightbox from "fslightbox-react";

const ImageGallery = ({ items }) => {
  const [toggler, setToggler] = useState(false);

  return (
    <>
      <div className="flex flex-wrap mb-8 justify-center">
        {items.map(({ gallery_image }, index) => (
          <div className="p-3 w-1/3 md:w-1/4 lg:w-1/5">
            <img
              className="cursor-pointer "
              src={gallery_image.thumbnails.Thumbnail.url}
              onClick={() => setToggler(!toggler)}
              key={index}
            />
            {gallery_image.alt && (
              <p className="text-sm leading-tight pt-4">{gallery_image.alt}</p>
            )}
          </div>
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
