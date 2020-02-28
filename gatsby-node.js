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

  `);

  // const newsletterTemplate = path.resolve("src/templates/newsletter.js");
  // pages.data.allPrismicNewsletter.edges.forEach(edge => {
  //   createPage({
  //     path: `/newsletters/${edge.node.uid}`,
  //     component: newsletterTemplate,
  //     context: {
  //       uid: edge.node.uid
  //     }
  //   });
  // });
  //
  // const exampleTemplate = path.resolve("src/templates/example.js");
  // pages.data.allPrismicExample.edges.forEach(edge => {
  //   createPage({
  //     path: `/${edge.node.uid}`,
  //     component: exampleTemplate,
  //     context: {
  //       uid: edge.node.uid
  //     }
  //   });
  // });
};