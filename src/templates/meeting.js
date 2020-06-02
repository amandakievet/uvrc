import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import RichText from "../components/richtext";
import PageTitle from "../components/page-title";

import btnStyles from "../css/buttons.module.css";
const Meeting = ({ data }) => {
  const { author, content, date, title } = data.prismicMeeting.data;
  return (
    <Layout>
      <SEO title={title.text} />
      <div className="max-w-6xl mx-auto mb-10">
        <PageTitle title={title.text} />
        <RichText html={content.html} />
      </div>
      <div className="text-center mb-10">
        <Link to="/all-meetings/" className={btnStyles.link}>
          All Meetings
        </Link>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query MeetingByUid($uid: String!) {
    prismicMeeting(uid: { eq: $uid }) {
      data {
        author
        content {
          html
        }
        date
        title {
          text
        }
      }
    }
  }
`;

export default Meeting;
