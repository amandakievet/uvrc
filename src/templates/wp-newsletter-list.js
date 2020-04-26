import React from "react";
import { graphql, Link } from "gatsby";
import moment from "moment";

import Layout from "../components/layout";
import SEO from "../components/seo";
import RichTextWP from "../components/richtext-wp";
import PageTitle from "../components/page-title";
import Pagination from "../components/pagination";

const WordpressNewsletterListTemplate = ({ data, pageContext }) => {
  const { next, prev } = pageContext;

  return (
    <Layout>
      <SEO title="All Newsletters" />
      <PageTitle title="All Newsletters" />
      <div className="max-w-5xl mx-auto px-4 w-full">
        <div className="flex flex-wrap">
          {data.allWordpressPost.edges.map(({ node }, index) => {
            const excerpt = node.content.split("<!--more-->")[0];
            return (
              <Link
                to={`/${node.slug}`}
                className="block px-3 md:w-1/2"
                key={index}
              >
                <div className="border-t-2 pt-3">
                  <p className="text-gray-500 chunkyLabel pb-2">
                    {moment(node.date).format("MMMM Do YYYY")}
                  </p>
                  <h2 className="text-3xl leading-tight mb-3">{node.title}</h2>

                  <RichTextWP html={node.excerpt} className="text-sm" />
                </div>
              </Link>
            );
          })}
        </div>
        <Pagination {...pageContext} />
      </div>
    </Layout>
  );
};

export default WordpressNewsletterListTemplate;

export const query = graphql`
  query wordpressNewsletterListQuery($skip: Int!, $limit: Int!) {
    allWordpressPost(
      filter: { categories: { elemMatch: { name: { eq: "Newsletters" } } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          title
          slug
          date
          content
          excerpt
        }
      }
    }
  }
`;
