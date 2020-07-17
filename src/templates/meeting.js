import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import RichText from "../components/richtext";
import PageTitle from "../components/page-title";
import Pagination from "../components/pagination";
import PDFDownload from "../components/pdf-download";

import btnStyles from "../css/buttons.module.css";
const Meeting = ({ data, pageContext }) => {
  const { author, content, date, title, pdf_upload } = data.prismicMeeting.data;
  return (
    <Layout>
      <SEO title={title.text} />
      <div className="max-w-6xl mx-auto mb-10 py-10">
        <PageTitle title={title.text} />
        {content.html && <RichText html={content.html} />}
        {pdf_upload.url && <PDFDownload url={pdf_upload.url} />}
      </div>
      <div className="py-6">
        <Pagination {...pageContext} />
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
        pdf_upload {
          url
        }
      }
    }
  }
`;

export default Meeting;
