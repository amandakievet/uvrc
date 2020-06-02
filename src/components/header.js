import { graphql, useStaticQuery, Link } from "gatsby";
import React, { useState } from "react";
import classnames from "classnames";
import stackedLogo from "../images/stacked-logo.svg";
import btnStyles from "../css/buttons.module.css";

import SmartLink from "./smart-link";

function Header() {
  const [isExpanded, toggleExpansion] = useState(false);
  const { site, prismicAllPages } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      prismicAllPages {
        data {
          top_nav_links {
            link {
              url
            }
            link_text
            is_button
          }
        }
      }
    }
  `);

  return (
    <header className="bg-white">
      <div className="flex flex-wrap items-center justify-between md:justify-center lg:justify-between p-4 md:px-8 border-b-2">
        <Link className="flex items-center no-underline" to="/">
          <img
            src={stackedLogo}
            alt={site.siteMetadata.title}
            className="w-32 md:w-48 md:mb-4 lg:mb-0"
          />
        </Link>

        <button
          className="block md:hidden border flex items-center px-3 py-2"
          onClick={() => toggleExpansion(!isExpanded)}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>

        <nav
          className={`${
            isExpanded ? `block` : `hidden`
          } md:block md:flex md:items-center w-full lg:w-auto md:justify-center`}
        >
          {prismicAllPages.data.top_nav_links.map(
            ({ link, link_text, is_button }) => (
              <SmartLink
                className={classnames({
                  "block md:inline-block mt-4 md:mt-0 md:ml-8 no-underline chunkyLabel text-sm text-primary hover:text-brand-lighter": !is_button,
                  [btnStyles.primary + " md:ml-8 block mt-4 md:mt-0"]: is_button
                })}
                key={link_text}
                to={link.url}
              >
                {link_text}
              </SmartLink>
            )
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
