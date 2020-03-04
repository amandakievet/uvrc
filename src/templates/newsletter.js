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
      <RichText html={description.html} classNames="text-sm" />
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
  return (
    <Layout>
      <SEO title={title.text} />
      <h1 className="text-5xl text-center">{title.text}</h1>
      <div className="flex">
        <div>
          <h2 className="chunkyLabel">Note from the Editor</h2>
          <RichText html={note_from_the_editor.html} />
          <EditorProfile {...currentEditor[0]} />
        </div>
        <div>
          <h2 className="chunkyLabel">Table of Contents</h2>
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
  }
`;

export default NewsletterTemplate;
