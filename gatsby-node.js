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
      wordpressMeetings: allWordpressPost(
        filter: { categories: { elemMatch: { name: { eq: "Meetings" } } } }
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

  const allPrismicNewsletter = pages.data.allPrismicNewsletter.edges;
  const allPrismicMeeting = pages.data.allPrismicMeeting.edges;
  const wordpressNewsletters = pages.data.wordpressNewsletters.edges;
  const wordpressMeetings = pages.data.wordpressMeetings.edges;

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

  wordpressNewsletters.forEach(edge => {
    createPage({
      path: `/${edge.node.slug}`,
      component: path.resolve("src/templates/wp-post.js"),
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

    let component, skip;

    if (source === "prismic") {
      component = path.resolve("src/templates/newsletter-list.js");
      const firstItemIndex = index * newslettersPerPage;
      const lastItemIndex = firstItemIndex + newslettersPerPage - 1;
      skip = index * newslettersPerPage;
    } else if (source === "wordpress") {
      component = path.resolve("src/templates/wp-newsletter-list.js");
      skip = (index - numPrismicNewsletterListPages) * newslettersPerPage;
    }

    createPage({
      path: index === 0 ? `/all-newsletters` : `/all-newsletters/${index + 1}`,
      component,
      context: {
        limit: newslettersPerPage,
        skip,
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

  const numPrismicMeetingListPages = Math.ceil(
    allPrismicMeeting.length / meetingsPerPage
  );
  const numWPMeetingListPages = Math.ceil(
    wordpressMeetings.length / meetingsPerPage
  );
  const numMeetingListPages =
    numPrismicMeetingListPages + numWPMeetingListPages;

  allPrismicMeeting.forEach(edge => {
    createPage({
      path: `/${edge.node.uid}`,
      component: path.resolve("src/templates/meeting.js"),
      context: {
        uid: edge.node.uid,
        next: edge.next
          ? `/${edge.next.uid}`
          : `/${wordpressMeetings[0].node.slug}`,
        prev: edge.previous && `/${edge.previous.uid}`
      }
    });
  });

  wordpressMeetings.forEach(edge => {
    createPage({
      path: `/${edge.node.slug}`,
      component: path.resolve("src/templates/wp-post.js"),
      context: {
        id: edge.node.id,
        next: edge.next && `/${edge.next.slug}`,
        prev: edge.previous
          ? `/${edge.previous.slug}`
          : `/${allPrismicMeeting[allPrismicMeeting.length - 1].node.uid}`
      }
    });
  });

  Array.from({ length: numMeetingListPages }).forEach((_, index) => {
    const source =
      index + 1 <= numPrismicMeetingListPages ? "prismic" : "wordpress";
    let component, skip;

    if (source === "prismic") {
      component = path.resolve("src/templates/meetings-list.js");
      const firstItemIndex = index * meetingsPerPage;
      const lastItemIndex = firstItemIndex + meetingsPerPage - 1;
      skip = index * meetingsPerPage;
    } else if (source === "wordpress") {
      component = path.resolve("src/templates/wp-meetings-list.js");
      skip = (index - numPrismicMeetingListPages) * meetingsPerPage;
    }

    createPage({
      path: index === 0 ? `/all-meetings` : `/all-meetings/${index + 1}`,
      component,
      context: {
        limit: meetingsPerPage,
        skip,
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
