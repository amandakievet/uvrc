import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PageTitle from "../components/page-title";
import RichText from "../components/richtext";
import Slice from "../components/slice/index";

const PageTemplate = ({ data }) => {
  const {
    meta_title,
    meta_description,
    title,
    page_content,
    body
  } = data.prismicPage.data;

  return (
    <Layout>
      <SEO title={meta_title || title.text} description={meta_description} />
      <div className="my-10">
        <div className="max-w-3xl mx-auto">
          <PageTitle title={title.text} />
          <RichText html={page_content.html} />
        </div>
        {body.map((slice, index) => (
          <Slice {...slice} key={index} />
        ))}
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
        body {
          ... on PrismicPageBody5050 {
            primary {
              text_placement
              header {
                html
              }
              text {
                html
              }
              image {
                fluid(maxWidth: 800) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                }
              }
              cta_text
              cta_link {
                url
              }
            }
            slice_type
          }
          ... on PrismicPageBodyMultiColumnText {
            slice_type
            items {
              richtext {
                html
              }
            }
          }
        }
      }
    }
  }
`;
