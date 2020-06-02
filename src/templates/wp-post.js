import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import RichText from "../components/richtext";
import Pagination from "../components/pagination";

import btnStyles from "../css/buttons.module.css";

const WordpressPostTemplate = ({ data, pageContext }) => {
  const { title, content, date, categories } = data.wordpressPost;

  return (
    <Layout>
      <SEO title={title} />
      <div className="max-w-4xl w-full my-10 mx-auto">
        <RichText
          html={title}
          className="text-5xl text-center mb-10 font-display"
        />
        <RichText html={content} />
        <div className="py-6">
          <Pagination {...pageContext} />
        </div>
        {categories[0].name === "Meetings" && (
          <div className="text-center">
            <Link to="/all-meetings/" className={`${btnStyles.link} mx-auto`}>
              All Meetings
            </Link>
          </div>
        )}
        {categories[0].name === "Newsletters" && (
          <div className="text-center">
            <Link
              to="/all-newsletters/"
              className={`${btnStyles.link} mx-auto`}
            >
              All Newsletters
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query WordpressPostById($id: String!) {
    wordpressPost(id: { eq: $id }) {
      content
      title
      date
      categories {
        name
      }
    }
  }
`;

export default WordpressPostTemplate;
