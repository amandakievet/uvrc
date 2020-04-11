import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import RichText from "../components/richtext";
import Pagination from "../components/pagination";

const WordpressNewsletterTemplate = ({ data, pageContext }) => {
  const { title, content, date } = data.wordpressPost;

  return (
    <Layout>
      <SEO title={title} />
      <div className="max-w-6xl mx-auto">
        <RichText
          html={title}
          className="text-5xl text-center mb-10 font-display"
        />
      </div>
      <div>
        <RichText html={content} />
      </div>
      <div className="py-6">
        <Pagination {...pageContext} />
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
