import React from "react";
import PropTypes from "prop-types";
import footerLinks from "../data/footer-links";
import SmartLink from "./smart-link";
import footerGraphic from "../images/footer.svg";

const Footer = () => (
  <>
    <img src={footerGraphic} />
    <div className="bg-brand pb-8 pt-8 md:pt-0 md:pb-16 px-8">
      <div className="max-w-6xl mx-auto w-full flex text-white text-sm justify-between">
        <ul>
          {footerLinks.map(({ route, title }) => (
            <li key={title} className="pb-2">
              <SmartLink to={route}>{title}</SmartLink>
            </li>
          ))}
        </ul>
        <div>
          <p>UVRC, c/o Lebanon Recreation & Parks</p> <p>51 North Park St</p>
          <p> Lebanon NH 03766</p>
        </div>
      </div>
    </div>
  </>
);

export default Footer;
