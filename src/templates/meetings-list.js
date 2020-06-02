import React from "react";
import { graphql, Link } from "gatsby";
import moment from "moment";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PageTitle from "../components/page-title";
import Pagination from "../components/pagination";

const MeetingListTemplate = ({ data, pageContext }) => {
  const { next, prev } = pageContext;
  const pageTitle = "All Meetings";

  return (
    <Layout>
      <SEO title={pageTitle} />
      <PageTitle title={pageTitle} />
      <div className="max-w-5xl mx-auto px-4 w-full pb-10">
        <div className="flex flex-wrap">
          {data.allPrismicMeeting.edges.map(({ node }, index) => {
            const { title, content, author, date } = node.data;
            return (
              <Link to={`/${node.uid}`} className="block" key={index}>
                <div className="border-t-2 pt-3 mb-10">
                  <p className="text-gray-500 chunkyLabel pb-2">
                    {moment(date).format("MMMM Do YYYY")}
                  </p>
                  <h2 className="text-3xl leading-tight mb-3">{title.text}</h2>
                  <p className="text-sm">
                    {content.text.slice(0, 800).concat("...")}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Pagination {...pageContext} />
    </Layout>
  );
};

export default MeetingListTemplate;

export const query = graphql`
  query prismicMeetingListQuery($skip: Int!, $limit: Int!) {
    allPrismicMeeting(
      sort: { fields: data___date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          data {
            author
            content {
              text
            }
            date
            title {
              text
            }
          }
          uid
        }
      }
    }
  }
`;
