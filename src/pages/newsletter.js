import React from "react";
import { graphql, Link } from "gatsby";
import classnames from "classnames";

import Layout from "../components/layout";
import SEO from "../components/seo";
import NewsletterArticleList from "../components/newsletter-article-list";
import ArticlesList from "../components/articles-list";
import btnStyles from "../css/buttons.module.css";

const NewsletterHome = ({ data }) => {
  const { newsletters, articleList } = data;
  const newsletter = newsletters.edges[0].node;
  const newsletterArticles = newsletter.data.articles.map(
    articleNode => articleNode.article.document.data
  );

  return (
    <Layout>
      <SEO
        keywords={[`uvrc`, `upper valley running club`, `running`]}
        title="Newsletter Home"
      />
      <div className="my-10 max-w-6xl mx-auto px-4">
        <div className="max-w-2xl mx-auto px-4 text-center mb-16">
          <h1 className="text-4xl mb-2">{newsletter.data.title.text}</h1>
          <div className="text-sm">
            <NewsletterArticleList articles={newsletterArticles} />
            <div className="flex justify-center mt-6">
              <Link
                to={`/${newsletter.uid}`}
                className={`${btnStyles.link} mx-4`}
              >
                Read On
              </Link>
              <Link
                to={`/all-newsletters`}
                className={`${btnStyles.link} mx-4`}
              >
                All Newsletters
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="my-4">
            <h4 className="chunkyLabel text-center text-xl">Latest Articles</h4>
          </div>
          <ArticlesList articleList={articleList} />
          <div className="text-center py-6">
            <Link to={`/articles`} className={btnStyles.link}>
              All Articles
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query NewsletterHomeBy {
    newsletters: allPrismicNewsletter(
      limit: 1
      sort: { fields: data___month, order: DESC }
    ) {
      edges {
        node {
          data {
            title {
              text
            }
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
    articleList: allPrismicArticle(
      sort: { fields: data___date, order: DESC }
      limit: 8
    ) {
      edges {
        node {
          uid
          data {
            headline {
              text
            }
            date
            author
            tag
            article_thumbnail {
              url
            }
          }
        }
      }
    }
  }
`;

export default NewsletterHome;
