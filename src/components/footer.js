import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";
import SmartLink from "./smart-link";
import Sponsors from "./sponsors";
import footerGraphic from "../images/footer.svg";

const Footer = () => {
  const { prismicAllPages } = useStaticQuery(graphql`
    {
      prismicAllPages {
        data {
          footer_links_column_1 {
            link_text
            link {
              url
            }
          }
          footer_links_column_2 {
            link_text
            link {
              url
            }
          }
        }
      }
    }
  `);

  const { footer_links_column_1, footer_links_column_2 } = prismicAllPages.data;

  return (
    <>
      <Sponsors />
      <img src={footerGraphic} />
      <div className="bg-brand pb-8 pt-8 md:pt-0 md:pb-16 px-8 -mt-1">
        <div className="max-w-6xl mx-auto w-full flex text-white text-sm justify-between">
          <div className="flex flex-col sm:flex-row">
            <ul className="mr-10">
              {footer_links_column_1.map(({ link_text, link }) => (
                <li key={link_text} className="pb-2">
                  <SmartLink to={link.url}>{link_text}</SmartLink>
                </li>
              ))}
            </ul>
            {footer_links_column_2.length && (
              <ul className="mr-10">
                {footer_links_column_2.map(({ link_text, link }) => (
                  <li key={link_text} className="pb-2">
                    <SmartLink to={link.url}>{link_text}</SmartLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <p>UVRC, c/o Lebanon Recreation & Parks</p> <p>51 North Park St</p>
            <p> Lebanon NH 03766</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
