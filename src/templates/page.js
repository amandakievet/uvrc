import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PageTitle from "../components/page-title";
import RichText from "../components/richtext";

const PageTemplate = ({ data }) => {
  const {
    meta_title,
    meta_description,
    title,
    page_content
  } = data.prismicPage.data;

  return (
    <Layout>
      <SEO title={meta_title} description={meta_description} />
      <div className="max-w-3xl mx-auto">
        <PageTitle title={title.text} />
        <RichText html={page_content.html} />
      </div>
    </Layout>
  );
};

export default PageTemplate;

export const query = graphql`
  query PageByUID($uid: String!) {
    prismicPage(uid: { eq: $uid }) {
      data {
        title {
          text
        }
        page_content {
          html
        }
        meta_title
        meta_description
      }
    }
  }
`;
