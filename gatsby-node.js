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
const meetingsPerPage = 8;
const articlesPerPage = 10;

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
      allPrismicArticle(sort: { fields: data___date, order: DESC }) {
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
      allPrismicPage {
        edges {
          node {
            uid
          }
        }
      }
      allPrismicMeeting(sort: { fields: data___date, order: DESC }) {
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
    }
  `);

  const allPrismicMeeting = pages.data.allPrismicMeeting.edges;

  pages.data.allPrismicNewsletter.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.uid}`,
      component: path.resolve("src/templates/newsletter.js"),
      context: {
        uid: edge.node.uid,
        next: edge.next ? `/${edge.next.uid}` : null,
        prev: edge.previous && `/${edge.previous.uid}`
      }
    });
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
      path: node.uid === "home" ? `/` : `/${node.uid}`,
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

  const numNewsletterListPages = Math.ceil(
    pages.data.allPrismicNewsletter.edges.length / newslettersPerPage
  );
  Array.from({ length: numNewsletterListPages }).forEach((_, index) => {
    createPage({
      path: index === 0 ? `/all-newsletters` : `/all-newsletters/${index + 1}`,
      component: path.resolve("src/templates/newsletter-list.js"),
      context: {
        limit: newslettersPerPage,
        skip: index * newslettersPerPage,
        numPostsPerPage: newslettersPerPage,
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

  const numMeetingListPages = Math.ceil(
    pages.data.allPrismicMeeting.edges.length / meetingsPerPage
  );

  pages.data.allPrismicMeeting.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.uid}`,
      component: path.resolve("src/templates/meeting.js"),
      context: {
        uid: edge.node.uid,
        next: edge.next ? `/${edge.next.uid}` : null,
        prev: edge.previous && `/${edge.previous.uid}`
      }
    });
  });

  Array.from({ length: numMeetingListPages }).forEach((_, index) => {
    createPage({
      path: index === 0 ? `/all-meetings` : `/all-meetings/${index + 1}`,
      component: path.resolve("src/templates/meetings-list.js"),
      context: {
        limit: meetingsPerPage,
        skip: index * meetingsPerPage,
        numPostsPerPage: meetingsPerPage,
        prev:
          index === 0
            ? null
            : index === 1
            ? `/all-meetings`
            : `/all-meetings/${index}`,
        next:
          index === numMeetingListPages - 1
            ? null
            : `/all-meetings/${index + 2}`
      }
    });
  });
};
