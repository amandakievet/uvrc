import React from "react";
import { graphql, Link } from "gatsby";
import moment from "moment";
import classnames from "classnames";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PageTitle from "../components/page-title";
import ArticlesList from "../components/articles-list";
import Pagination from "../components/pagination";

const ArticleListTemplate = ({ data, pageContext }) => {
  return (
    <Layout>
      <SEO title="All Articles" />
      <div className="my-8">
        <PageTitle title="Articles" />
        <div className="max-w-4xl mx-auto">
          <ArticlesList articleList={data.allPrismicArticle} />
          <Pagination {...pageContext} />
        </div>
      </div>
    </Layout>
  );
};

export default ArticleListTemplate;

export const query = graphql`
  query prismicArticleQuery($skip: Int!, $limit: Int!) {
    allPrismicArticle(
      sort: { fields: data___date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          uid
          data {
            headline {
              text
            }
            tag
            author
            date
            article_thumbnail {
              url
            }
          }
        }
      }
    }
  }
`;
