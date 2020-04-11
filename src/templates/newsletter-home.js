import React from "react";
import { graphql, Link } from "gatsby";
import classnames from "classnames";

import Layout from "../components/layout";
import SEO from "../components/seo";
import NewsletterArticleList from "../components/newsletter-article-list";
import ArticlesList from "../components/articles-list";

const NewsletterHome = ({ data }) => {
  const { newsletter, articleList } = data;
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
                className="chunkyLabel mx-4 border-b-2 border-black hover:border-none"
              >
                Read On
              </Link>
              <Link
                to={`/all-newsletters`}
                className="chunkyLabel mx-4 border-b-2 border-black hover:border-none"
              >
                All Newsletters
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="border-t-2 border-b-2 mt-4 py-3">
            <h4 className="chunkyLabel text-center">Latest Articles</h4>
          </div>
          <ArticlesList articleList={articleList} />
          <div className="text-center py-6">
            <Link
              to={`/articles`}
              className="chunkyLabel border-b-2 border-black hover:border-none inline-block mx-auto"
            >
              All Articles
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query NewsletterHomeByUid($uid: String!) {
    newsletter: prismicNewsletter(uid: { eq: $uid }) {
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
    articleList: allPrismicArticle(sort: { fields: data___date }, limit: 6) {
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
