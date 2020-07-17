import React from "react";
import { graphql, Link } from "gatsby";
import moment from "moment";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PageTitle from "../components/page-title";
import Pagination from "../components/pagination";
import NewsletterArticleList from "../components/newsletter-article-list";

const NewsletterListTemplate = ({ data, pageContext }) => {
  const { next, prev } = pageContext;

  return (
    <Layout>
      <SEO title="All Newsletters" />
      <PageTitle title="All Newsletters" />
      <div className="max-w-5xl mx-auto px-4 w-full">
        <div className="flex flex-wrap">
          {data.allPrismicNewsletter.edges.map(({ node }, index) => {
            const { title, month } = node.data;
            const articles = node.data.articles
              .filter(articleNode => !!articleNode.article.document)
              .map(articleNode => articleNode.article.document.data);
            return (
              <Link
                to={`/${node.uid}`}
                key={index}
                className="mb-8 block md:w-1/2 md:px-4"
              >
                <div className="border-t-2 pt-4">
                  <p className="text-gray-500 chunkyLabel">
                    {moment(month).format("MMMM Do YYYY")}
                  </p>
                  <h2 className="text-3xl leading-tight mb-3">{title.text}</h2>
                  <div className="text-sm">
                    <NewsletterArticleList articles={articles} />
                  </div>
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

export default NewsletterListTemplate;

export const query = graphql`
  query prismicNewsletterListQuery($skip: Int!, $limit: Int!) {
    allPrismicNewsletter(
      sort: { fields: data___month, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          data {
            title {
              text
            }
            month
            articles {
              article {
                document {
                  ... on PrismicArticle {
                    data {
                      headline {
                        text
                      }
                      tag
                      author
                    }
                  }
                }
              }
            }
          }
          uid
        }
      }
    }
  }
`;
