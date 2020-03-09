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
      allPrismicArticle {
        edges {
          node {
            uid
          }
        }
      }
      wordpressNewsletters: allWordpressPost(
        filter: { categories: { elemMatch: { name: { eq: "Newsletters" } } } }
      ) {
        edges {
          node {
            id
            title
            path
            author
            content
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

  pages.data.allPrismicArticle.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.uid}`,
      component: path.resolve("src/templates/article.js"),
      context: {
        uid: edge.node.uid
      }
    });
  });

  pages.data.wordpressNewsletters.edges.forEach(edge => {
    createPage({
      path: edge.node.path,
      component: path.resolve("src/templates/wp-newsletter.js"),
      context: {
        id: edge.node.id
      }
    });
  });
};
