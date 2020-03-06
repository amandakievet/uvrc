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
      allPrismicNewsletter(sort: { fields: data___month }) {
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

  const currentNewsletter = pages.data.allPrismicNewsletter.edges[0];
  createPage({
    path: `/newsletter`,
    component: path.resolve("src/templates/newsletter-home.js"),
    context: {
      uid: currentNewsletter.node.uid
    }
  });
};
