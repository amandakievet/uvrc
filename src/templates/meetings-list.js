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
