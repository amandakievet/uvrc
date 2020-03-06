import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Article from "../components/article";

const ArticleTemplate = ({ data, pageContext }) => {
  return (
    <Layout>
      <SEO title={data.prismicArticle.data.headline.text} />
      <Article {...data.prismicArticle.data} display="bold" />
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
        tag
        richtext {
          html
        }
        body {
          ... on PrismicArticleBodyAskTheCoaches {
            slice_type
            primary {
              question
              question_asker
            }
            items {
              answer {
                html
              }
              coach
            }
          }
          ... on PrismicArticleBodyFullsizeImage {
            slice_type
            primary {
              image {
                url
              }
            }
          }
          ... on PrismicArticleBodyImageGallery {
            slice_type
            items {
              gallery_image {
                url
                Thumbnail {
                  url
                }
              }
            }
          }
          ... on PrismicArticleBodyRichtext {
            slice_type
            primary {
              rich_text {
                html
              }
            }
          }
          ... on PrismicArticleBodyRowImageText {
            slice_type
            primary {
              image {
                url
              }
              image_position
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

export default ArticleTemplate;
