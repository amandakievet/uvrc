import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";

import RichText from "./richtext";
import btnStyles from "../css/buttons.module.css";
const Sponsors = () => {
  const data = useStaticQuery(graphql`
    {
      prismicAllPages {
        data {
          why_sponsor_text {
            html
          }
          sponsors {
            sponsor_name
            sponsor_link {
              url
            }
            logo {
              fluid(maxWidth: 300) {
                base64
                aspectRatio
                src
                srcSet
                srcWebp
                srcSetWebp
                sizes
              }
            }
          }
          sponsor_button_text
          sponsor_button_link {
            url
          }
        }
      }
    }
  `);

  const {
    why_sponsor_text,
    sponsors,
    sponsor_button_link,
    sponsor_button_text
  } = data.prismicAllPages.data;
  return (
    <div className="max-w-6xl mx-auto px-4 text-center my-6">
      <h4 className="text-xl mb-2">Our Sponsors</h4>
      <div className="flex justify-center items-center flex-wrap">
        {sponsors.map(({ sponsor_name, sponsor_link, logo }) => (
          <a
            href={sponsor_link.url}
            key={sponsor_name}
            className="block w-32 md:w-40 mx-4"
          >
            <Img fluid={logo.fluid} />
          </a>
        ))}
      </div>
      <RichText html={why_sponsor_text.html} className="text-sm my-4" />
      <Link to={sponsor_button_link.url} className={btnStyles.primary}>
        {sponsor_button_text}
      </Link>
    </div>
  );
};

export default Sponsors;
