import React from "react";
import { graphql, Link } from "gatsby";
import classnames from "classnames";

import Layout from "../components/layout";
import SEO from "../components/seo";
import ArticleCard from "../components/article-card";

import { articleCompare, embellishTitle } from "../utils/article";

const NewsletterHome = ({ data }) => {
  const { newsletter, articleList } = data;
  let newsletterArticles = data.newsletterArticles.edges;
  newsletterArticles.sort(articleCompare);

  return (
    <Layout>
      <SEO
        keywords={[`uvrc`, `upper valley running club`, `running`]}
        title="Newsletter Home"
      />
      <div>
        <div className="max-w-2xl mx-auto px-4 text-center mb-16">
          <h1 className="text-4xl mb-2">{newsletter.data.title.text}</h1>
          <div className="text-sm">
            {newsletterArticles.map(({ node }, index) => (
              <>
                {index !== 0 && ", "}
                {embellishTitle(node.data.headline.text, node.data.tag)}
                {node.data.author && <> by {node.data.author}</>}
              </>
            ))}
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
          <div className="border-t-2 border-b-2 my-4 py-3">
            <h4 className="chunkyLabel text-center">Latest Articles</h4>
          </div>
          <div className="flex flex-wrap max-w-4xl mx-auto px-4 justify-center">
            {articleList.edges.map(({ node }, index) => (
              <ArticleCard
                {...node.data}
                uid={node.uid}
                className={classnames("border-t-2", {
                  "border-r-2": index % 2 === 0 || index === 0
                })}
              />
            ))}
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
      }
      uid
    }
    newsletterArticles: allPrismicArticle(
      filter: { data: { newsletter: { uid: { eq: $uid } } } }
    ) {
      edges {
        node {
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
    articleList: allPrismicArticle(sort: { fields: data___date }, limit: 10) {
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
          }
        }
      }
    }
  }
`;

export default NewsletterHome;