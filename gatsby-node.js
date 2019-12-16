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

  const newsletterTemplate = path.resolve("src/templates/newsletter.js");
  pages.data.allPrismicNewsletter.edges.forEach(edge => {
    createPage({
      path: `/newsletters/${edge.node.uid}`,
      component: newsletterTemplate,
      context: {
        uid: edge.node.uid
      }
    });
  });
};
