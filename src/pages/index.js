import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage = ({ data }) => {
  const { headline } = data.prismicHome.data;
  return (
    <Layout>
      <SEO
        keywords={[`uvrc`, `upper valley running club`, `running`]}
        title="Home"
      />

      <h1>{headline}</h1>
    </Layout>
  );
};

export const query = graphql`
  {
    prismicHome {
      data {
        headline
      }
    }
  }
`;

export default IndexPage;
