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
    display_title_,
    body
  } = data.prismicPage.data;

  return (
    <Layout>
      <SEO title={meta_title || title.text} description={meta_description} />
      <div className="mb-10">
        {(display_title_ || page_content.html) && (
          <div className="my-8">
            {display_title_ && <PageTitle title={title.text} />}
            <div className="px-4">
              {page_content.html && (
                <RichText
                  html={page_content.html}
                  className="text-center max-w-3xl mx-auto"
                />
              )}
            </div>
          </div>
        )}

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
        display_title_
        page_content {
          html
        }
        meta_title
        meta_description
        body {
          ... on PrismicPageBody5050 {
            primary {
              text_align
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
          ... on PrismicPageBodyBoardsCommittees {
            slice_type
          }
          ... on PrismicPageBodyNextMeetups {
            slice_type
            primary {
              title {
                text
              }
            }
          }
          ... on PrismicPageBodyRichtext {
            slice_type
            primary {
              richtext {
                html
              }
            }
          }
          ... on PrismicPageBodyLinkBlocks {
            slice_type
            items {
              block_title
              block_link {
                url
              }
            }
          }
          ... on PrismicPageBodyRaceList {
            slice_type
            items {
              race_title
              race_location
              race_link {
                url
                target
              }
              race_date
              distance
            }
          }
        }
      }
    }
  }
`;
