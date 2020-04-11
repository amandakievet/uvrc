import PropTypes from "prop-types";
import React from "react";

import Header from "./header";
import Announcement from "./announcement";

function Layout({ children }) {
  return (
    <div className="flex flex-col font-sans min-h-screen text-black font-sans">
      <Announcement />
      <Header />

      <main className="flex flex-col flex-1">{children}</main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
