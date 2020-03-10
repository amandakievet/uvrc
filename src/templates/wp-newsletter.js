import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import RichText from "../components/richtext";

const WordpressNewsletterTemplate = ({ data, pageContext }) => {
  const { title, content, date } = data.wordpressPost;

  return (
    <Layout>
      <SEO title={title} />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl text-center mb-10">{title}</h1>
      </div>
      <div>
        <RichText html={content} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query WordpressNewsletterById($id: String!) {
    wordpressPost(id: { eq: $id }) {
      content
      title
      date
    }
  }
`;

export default WordpressNewsletterTemplate;
