import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage = ({ data }) => {
  const { edges } = data.allPrismicNewsletter;
  return (
    <Layout>
      <h1 className="font-bold py-4 text-3xl">All Newsletters</h1>
      {edges.map(({ node }, index) => (
        <Link to={`newsletters/${node.uid}`}>{node.data.headline}</Link>
      ))}
    </Layout>
  );
};

export const query = graphql`
  {
    allPrismicNewsletter {
      edges {
        node {
          uid
          data {
            headline
          }
        }
      }
    }
  }
`;

export default IndexPage;
