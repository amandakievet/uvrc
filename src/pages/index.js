import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import UpcomingEvents from "../components/upcoming-events";

const IndexPage = ({ data }) => {
  const { headline } = data.prismicHome.data;
  return (
    <Layout>
      <SEO
        keywords={[`uvrc`, `upper valley running club`, `running`]}
        title="Home"
      />
      <div className="max-w-6xl mx-auto px-4 my-10">
        <h1 className="text-5xl">{headline.text}</h1>
        <UpcomingEvents />
      </div>
    </Layout>
  );
};

export const query = graphql`
  {
    prismicHome {
      data {
        headline {
          text
        }
      }
    }
  }
`;

export default IndexPage;
