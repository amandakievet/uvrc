import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import RichText from "../components/richtext";
import Article from "../components/article";
import Profile from "../components/profile";
import PageTitle from "../components/page-title";
import Pagination from "../components/pagination";

import { embellishTitle } from "../utils/article";

const TableOfContentsLink = ({ author, headline, tag, index }) => (
  <li className="pb-2">
    <a
      href={`#${index + 1}`}
      className="text-brand-lighter hover:text-brand c-transition"
    >
      {embellishTitle(headline.text, tag)}
      {author && <> by {author}</>}
    </a>
  </li>
);

const NewsletterTemplate = ({ data, pageContext }) => {
  const {
    title,
    note_from_the_editor,
    month,
    editor,
    articles,
    article_collector
  } = data.prismicNewsletter.data;
  const { newsletter_editors } = data.prismicPeople.data;
  const currentEditor = newsletter_editors.filter(e => e.name === editor)[0];
  const articleCollector = newsletter_editors.filter(
    e => e.name === article_collector
  )[0];
  const articleData = articles.map(
    articleNode => articleNode.article.document.data
  );
  return (
    <Layout>
      <SEO title={title.text} />
      <div className="max-w-6xl mx-auto border-b-2 pb-10 py-10">
        <PageTitle title={title.text} />
        <div className="flex flex-col md:flex-row px-4">
          <div className="mr-8 flex-1 mb-6">
            <h4 className="chunkyLabel pb-4">Note from the Editor</h4>
            <RichText html={note_from_the_editor.html} className="mb-10" />
            {[
              { profile: currentEditor, title: "Editor" },
              { profile: articleCollector, title: "Article Collection" }
            ].map(({ profile, title }) => (
              <div className="pb-4">
                <h6 className="mb-3 text-gray-500">{title}</h6>
                <Profile {...profile} />
              </div>
            ))}
          </div>
          <div className="flex-1">
            <h4 className="chunkyLabel pb-4">Table of Contents</h4>
            <ul>
              {articleData.map((articleNode, index) => (
                <TableOfContentsLink
                  {...articleNode}
                  key={index}
                  index={index}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto">
        {articleData.map((articleNode, index) => (
          <div key={index}>
            <a name={index + 1} />
            <Article {...articleNode} key={index} className="border-b-2 py-4" />
          </div>
        ))}
        <div className="py-6">
          <Pagination {...pageContext} />
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query NewsletterByUid($uid: String!) {
    prismicNewsletter(uid: { eq: $uid }) {
      data {
        title {
          text
        }
        note_from_the_editor {
          html
        }
        month
        editor
        article_collector
        articles {
          article {
            document {
              ... on PrismicArticle {
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
          }
        }
      }
    }
    prismicPeople {
      data {
        newsletter_editors {
          name
          description {
            html
          }
          profile_picture {
            url
          }
        }
      }
    }
  }
`;

export default NewsletterTemplate;
