import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import RichText from "../components/richtext";

const EditorProfile = ({ name, description, profile_picture }) => (
  <div className="flex">
    <img src={profile_picture.url} className="rounded-full w-16 mr-4" />
    <div>
      <h5 className="font-display text-lg">{name}</h5>
      <RichText html={description.html} className="text-sm" />
    </div>
  </div>
);

const NewsletterTemplate = ({ data, pageContext }) => {
  const {
    title,
    note_from_the_editor,
    month,
    editor
  } = data.prismicNewsletter.data;
  const { newsletter_editors } = data.prismicPeople.data;
  const currentEditor = newsletter_editors.filter(e => e.name === editor);

  let articles = data.allPrismicArticle.edges;

  const tagOrder = [
    "Letter from a Board Member",
    "Social Events",
    "Member Submission",
    "Ask the Coaches"
  ];

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
      <h1 className="text-5xl text-center mb-10">{title.text}</h1>
      <div className="flex">
        <div>
          <h2 className="chunkyLabel">Note from the Editor</h2>
          <RichText html={note_from_the_editor.html} className="mb-10" />
          <EditorProfile {...currentEditor[0]} />
        </div>
        <div>
          <h2 className="chunkyLabel">Table of Contents</h2>
          {articles.map(({ node }, index) => (
            <a href="">
              {node.data.headline.text} by {node.data.author}{" "}
            </a>
          ))}
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
          }
        }
      }
    }
  }
`;

export default NewsletterTemplate;
