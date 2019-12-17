import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

const ExampleTemplate = ({ data }) => {
  const { text } = data.prismicExample.data;
  return <Layout>{text}</Layout>;
};

export const query = graphql`
  query ExampleByUID($uid: String!) {
    prismicExample(uid: { eq: $uid }) {
      data {
        text
      }
    }
  }
`;

export default ExampleTemplate;
