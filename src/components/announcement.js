import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import linkStyles from "../css/link.module.css";

const Announcement = () => {
  const data = useStaticQuery(graphql`
    {
      prismicAllPages {
        data {
          announcement {
            html
          }
        }
      }
    }
  `);
  return (
    <div
      className={`bg-brand text-white text-sm text-center py-2 px-4 font-display tracking-wide ${linkStyles.link} c-noPadding`}
      dangerouslySetInnerHTML={{
        __html: data.prismicAllPages.data.announcement.html
      }}
    />
  );
};

export default Announcement;
