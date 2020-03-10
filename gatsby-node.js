// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors;
    }
    return result;
  });

const path = require("path");

const newslettersPerPage = 8;

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
            slug
            author
            content
          }
        }
      }
    }
  `);

  const allPrismicNewsletter = pages.data.allPrismicNewsletter.edges;
  allPrismicNewsletter.forEach(edge => {
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

  const wordpressNewsletters = pages.data.wordpressNewsletters.edges;
  wordpressNewsletters.forEach(edge => {
    createPage({
      path: `/${edge.node.slug}`,
      component: path.resolve("src/templates/wp-newsletter.js"),
      context: {
        id: edge.node.id
      }
    });
  });

  const numPrismicNewsletterListPages = Math.ceil(
    allPrismicNewsletter.length / newslettersPerPage
  );
  const numWPNewsletterListPages = Math.ceil(
    wordpressNewsletters.length / newslettersPerPage
  );

  const numNewsletterListPages =
    numPrismicNewsletterListPages + numWPNewsletterListPages;
  Array.from({ length: numNewsletterListPages }).forEach((_, index) => {
    const component =
      index + 1 <= numPrismicNewsletterListPages
        ? path.resolve("src/templates/newsletter-list.js")
        : path.resolve("src/templates/wp-newsletter-list.js");
    createPage({
      path: index === 0 ? `/all-newsletters` : `/all-newsletters/${index + 1}`,
      component,
      context: {
        limit: newslettersPerPage,
        skip: index * newslettersPerPage,
        prev:
          index === 0
            ? null
            : index === 1
            ? `/all-newsletters`
            : `/all-newsletters/${index}`,
        next:
          index === numNewsletterListPages - 1
            ? null
            : `/all-newsletters/${index + 2}`
      }
    });
  });
};
