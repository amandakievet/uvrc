import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

function NotFoundPage() {
  return (
    <Layout>
      <SEO title="404: Not found" />
      <h2>404</h2>
    </Layout>
  );
}

export default NotFoundPage;
