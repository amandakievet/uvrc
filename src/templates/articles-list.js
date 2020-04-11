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
      <div>
        <div className="border-b-2 mt-4">
          <PageTitle title="Articles" />
        </div>
        <ArticlesList articleList={data.allPrismicArticle} />
      </div>
      <Pagination {...pageContext} />
    </Layout>
  );
};

export default ArticleListTemplate;

export const query = graphql`
  query prismicArticleQuery($skip: Int!, $limit: Int!) {
    allPrismicArticle(limit: $limit, skip: $skip) {
      edges {
        node {
          data {
            headline {
              text
            }
            tag
            author
            article_thumbnail {
              url
            }
          }
        }
      }
    }
  }
`;
