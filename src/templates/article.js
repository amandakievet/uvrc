import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Article from "../components/article";
import ArticleCard from "../components/article-card";

const ArticleTemplate = ({ data, pageContext }) => {
  const { next, previous } = pageContext;
  return (
    <Layout>
      <SEO title={data.prismicArticle.data.headline.text} />
      <div className="max-w-4xl mx-auto">
        <Article {...data.prismicArticle.data} display="bold" />
      </div>
      <div className="max-w-6xl mx-auto w-full mb-20">
        <div className="flex justify-between mt-10">
          {previous && <ArticleCard {...previous.data} uid={previous.uid} />}
          {next && (
            <ArticleCard {...next.data} uid={next.uid} className="md:ml-auto" />
          )}
        </div>
      </div>
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
                fluid(maxWidth: 1024) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                }
              }
            }
          }
          ... on PrismicArticleBodyImageGallery {
            slice_type
            items {
              gallery_image {
                url
                thumbnails {
                  Thumbnail {
                    url
                  }
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
          ... on PrismicArticleBodyQuote {
            slice_type
            primary {
              quote {
                html
              }
              author1
            }
          }
          ... on PrismicArticleBodyRowImageText {
            slice_type
            primary {
              image {
                fluid(maxWidth: 1024) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                }
              }
              image_position
              image_caption
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
