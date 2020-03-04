import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const ArticleTemplate = ({ data, pageContext }) => {
  const { headline, author } = data.prismicArticle.data;
  return (
    <Layout>
      <SEO title={title.text} />
      <h1>{headline.text}</h1>
      {author && <p>By: {author}</p>}
    </Layout>
  );
};

export const query = graphql`
  query ArticleByUid($uid: String!) {
    prismicArticle(uid: { eq: $uid }) {
      data {
        headline {
          text
        }
        author
      }
    }
  }
`;

export default ArticleTemplate;
