import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import RichText from "../components/richtext";
import Article from "../components/article";
import Profile from "../components/profile";
import PageTitle from "../components/page-title";
import Pagination from "../components/pagination";

import { articleCompare, embellishTitle } from "../utils/article";

const TableOfContentsLink = ({ author, headline, tag, index }) => (
  <li className="pb-2">
    <a href={`#${index + 1}`} className="underline hover:no-underline">
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
    editor
  } = data.prismicNewsletter.data;
  const { newsletter_editors } = data.prismicPeople.data;
  const currentEditor = newsletter_editors.filter(e => e.name === editor)[0];

  let articles = data.allPrismicArticle.edges;

  articles.sort(articleCompare);

  return (
    <Layout>
      <SEO title={title.text} />
      <div className="max-w-6xl mx-auto border-b-2 pb-10">
        <PageTitle title={title.text} />
        <div className="flex">
          <div className="mr-8">
            <h2 className="chunkyLabel pb-4">Note from the Editor</h2>
            <RichText html={note_from_the_editor.html} className="mb-10" />
            <Profile {...currentEditor} />
          </div>
          <div>
            <h2 className="chunkyLabel pb-4">Table of Contents</h2>
            <ul>
              {articles.map(({ node }, index) => (
                <TableOfContentsLink {...node.data} key={index} index={index} />
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div>
        {articles.map(({ node }, index) => (
          <div key={index}>
            <a name={index + 1} />
            <Article {...node.data} key={index} className="border-b-2 py-4" />
          </div>
        ))}
      </div>
      <div className="py-6">
        <Pagination {...pageContext} />
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
    allPrismicArticle(filter: { data: { newsletter: { uid: { eq: $uid } } } }) {
      edges {
        node {
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
    }
  }
`;

export default NewsletterTemplate;
