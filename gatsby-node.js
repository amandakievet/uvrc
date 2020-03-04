// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors;
    }
    return result;
  });

const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pages = await graphql(`
    {
      allPrismicNewsletter {
        edges {
          node {
            uid
          }
        }
      }
    }
  `);

  pages.data.allPrismicNewsletter.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.uid}`,
      component: path.resolve("src/templates/newsletter.js"),
      context: {
        uid: edge.node.uid
      }
    });
  });
};
