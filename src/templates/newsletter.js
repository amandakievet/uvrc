import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import RichText from "../components/richtext";
import Article from "../components/article";
import Profile from "../components/profile";

import tagOrder from "../data/article-tags";

const TableOfContentsLink = ({ author, headline, tag }) => (
  <li className="pb-2">
    <a href="" className="underline hover:no-underline">
      {tag === "Ask the Coaches" && <>Ask the Coaches: </>}
      {tag === "Letter from a Board Member" && (
        <>Letter from a Board Member: </>
      )}{" "}
      {headline.text} {author && <>by {author}</>}
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

  const articleCompare = (a, b) => {
    if (tagOrder.indexOf(a.node.data.tag) < tagOrder.indexOf(b.node.data.tag)) {
      return -1;
    }
    if (tagOrder.indexOf(a.node.data.tag) > tagOrder.indexOf(b.node.data.tag)) {
      return 1;
    }
    return 0;
  };

  articles.sort(articleCompare);

  return (
    <Layout>
      <SEO title={title.text} />
      <div className="max-w-6xl mx-auto border-b-2 pb-10">
        <h1 className="text-5xl text-center mb-10">{title.text}</h1>
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
                <TableOfContentsLink {...node.data} key={index} />
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div>
        {articles.map(({ node }, index) => (
          <Article {...node.data} key={index} />
        ))}
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
