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
const articlesPerPage = 4;

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pages = await graphql(`
    {
      allPrismicNewsletter(sort: { fields: data___month, order: DESC }) {
        edges {
          node {
            uid
          }
          next {
            uid
          }
          previous {
            uid
          }
        }
      }
      allPrismicArticle {
        edges {
          node {
            uid
          }
          next {
            uid
            data {
              headline {
                text
              }
              author
              tag
              date
              article_thumbnail {
                url
              }
            }
          }
          previous {
            uid
            data {
              headline {
                text
              }
              author
              tag
              date
              article_thumbnail {
                url
              }
            }
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
          next {
            slug
          }
          previous {
            slug
          }
        }
      }
      allPrismicPage {
        edges {
          node {
            uid
          }
        }
      }
    }
  `);

  const allPrismicNewsletter = pages.data.allPrismicNewsletter.edges;
  const wordpressNewsletters = pages.data.wordpressNewsletters.edges;

  allPrismicNewsletter.forEach(edge => {
    createPage({
      path: `/${edge.node.uid}`,
      component: path.resolve("src/templates/newsletter.js"),
      context: {
        uid: edge.node.uid,
        next: edge.next
          ? `/${edge.next.uid}`
          : `/${wordpressNewsletters[0].node.slug}`,
        prev: edge.previous && `/${edge.previous.uid}`
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
        uid: edge.node.uid,
        next: edge.next,
        previous: edge.previous
      }
    });
  });

  pages.data.allPrismicPage.edges.forEach(({ node }) => {
    createPage({
      path: `/${node.uid}`,
      component: path.resolve("src/templates/page.js"),
      context: {
        uid: node.uid
      }
    });
  });

  const numArticleListPages = Math.ceil(
    pages.data.allPrismicArticle.edges.length / articlesPerPage
  );
  Array.from({ length: numArticleListPages }).forEach((_, index) => {
    createPage({
      path: index === 0 ? `/articles` : `/articles/${index + 1}`,
      component: path.resolve("src/templates/articles-list.js"),
      context: {
        limit: articlesPerPage,
        skip: index * articlesPerPage,
        prev:
          index === 0 ? null : index === 1 ? `/articles` : `/articles/${index}`,
        next:
          index === numArticleListPages - 1 ? null : `/articles/${index + 2}`
      }
    });
  });

  wordpressNewsletters.forEach(edge => {
    createPage({
      path: `/${edge.node.slug}`,
      component: path.resolve("src/templates/wp-newsletter.js"),
      context: {
        id: edge.node.id,
        next: edge.next && `/${edge.next.slug}`,
        prev: edge.previous
          ? `/${edge.previous.slug}`
          : `/${allPrismicNewsletter[allPrismicNewsletter.length - 1].node.uid}`
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
    const source =
      index + 1 <= numPrismicNewsletterListPages ? "prismic" : "wordpress";

    let component, uids, skip;

    if (source === "prismic") {
      component = path.resolve("src/templates/newsletter-list.js");
      const firstItemIndex = index * newslettersPerPage;
      const lastItemIndex = firstItemIndex + newslettersPerPage - 1;
      uids = allPrismicNewsletter
        .slice(firstItemIndex, lastItemIndex)
        .map(newsletter => newsletter.node.uid);

      skip = index * newslettersPerPage;
    } else if (source === "wordpress") {
      component = path.resolve("src/templates/wp-newsletter-list.js");
      uids = [];
      skip = (index - numPrismicNewsletterListPages) * newslettersPerPage;
    }

    createPage({
      path: index === 0 ? `/all-newsletters` : `/all-newsletters/${index + 1}`,
      component,
      context: {
        limit: newslettersPerPage,
        skip,
        numPostsPerPage: newslettersPerPage,
        uids,
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
