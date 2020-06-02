import React from "react";
import { graphql, Link } from "gatsby";
import moment from "moment";

import Layout from "../components/layout";
import SEO from "../components/seo";
import RichTextWP from "../components/richtext-wp";
import PageTitle from "../components/page-title";
import Pagination from "../components/pagination";

const WordpressMeetingListTemplate = ({ data, pageContext }) => {
  const { next, prev } = pageContext;
  const pageTitle = "All Meetings";

  return (
    <Layout>
      <SEO title={pageTitle} />
      <PageTitle title={pageTitle} />
      <div className="max-w-5xl mx-auto px-4 w-full pb-10">
        <div className="flex flex-wrap">
          {data.allWordpressPost.edges.map(({ node }, index) => {
            const excerpt = node.content.split("<!--more-->")[0];
            return (
              <Link to={`/${node.slug}`} className="block" key={index}>
                <div className="border-t-2 pt-3 mb-10">
                  <p className="text-gray-500 chunkyLabel pb-2">
                    {moment(node.date).format("MMMM Do YYYY")}
                  </p>
                  <h2 className="text-3xl leading-tight mb-3">
                    {node.title.replace("&#8211;", "—")}
                  </h2>

                  <RichTextWP
                    html={node.excerpt.slice(0, 800).concat("...")}
                    className="text-sm"
                  />
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

export default WordpressMeetingListTemplate;

export const query = graphql`
  query wordpressMeetingListQuery($skip: Int!, $limit: Int!) {
    allWordpressPost(
      filter: { categories: { elemMatch: { name: { eq: "Meetings" } } } }
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
