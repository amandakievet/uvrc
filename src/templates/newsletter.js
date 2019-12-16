import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

const NewsletterTemplate = ({ data }) => {
  const {
    headline,
    intro,
    publish_date,
    articles
  } = data.prismicNewsletter.data;
  return (
    <Layout>
      <p>{publish_date}</p>
      <h1 className="text-3xl">{headline}</h1>
      <div dangerouslySetInnerHTML={{ __html: intro.html }} />

      <div className="py-10">
        <h2 className="font-bold text-lg pb-3">Table of Contents</h2>
        <ol className="list-decimal">
          {articles.map(({ title, author }, index) => (
            <li key={index} className="pb-2">
              <Link to={`/newsletters/${data.prismicNewsletter.uid}/#${index}`}>
                {title} by {author}
              </Link>
            </li>
          ))}
        </ol>
      </div>
      {articles.map(({ title, author, image, content }, index) => (
        <div key={index} className="py-8">
          <div className="pb-4">
            <a name={index}></a>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p>By: {author}</p>
          </div>
          <img src={image.url} alt={image.alt} />
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
        </div>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query NewsletterByUid($uid: String!) {
    prismicNewsletter(uid: { eq: $uid }) {
      uid
      data {
        headline
        intro {
          html
        }
        publish_date
        articles {
          title
          author
          image {
            alt
            url
          }
          content {
            html
          }
        }
      }
    }
  }
`;

export default NewsletterTemplate;
