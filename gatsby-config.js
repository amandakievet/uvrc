require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: `Upper Valley Running Club`,
    description: `A running club in the Upper Valley of Vermont and New Hampshire`,
    author: `@amandakievet`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-tailwind`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#4dc0b5`,
        display: `minimal-ui`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        purgeOnly: [`src/css/style.css`]
      }
    },
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-source-prismic",
      options: {
        repositoryName: `uppervalleyrunningclub`,
        accessToken: `${process.env.PRISMIC_API_KEY}`,
        linkResolver: ({ node, key, value }) => post => `/${post.uid}`,
        schemas: {
          all_pages: require("./src/schemas/all_pages.json"),
          article: require("./src/schemas/article.json"),
          home: require("./src/schemas/home.json"),
          newsletter: require("./src/schemas/newsletter.json"),
          page: require("./src/schemas/page.json"),
          people: require("./src/schemas/people.json")
        }
      }
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Poppins:700", "Roboto:400,400i,700"]
        }
      }
    },
    {
      resolve: `gatsby-source-meetup`,
      options: {
        groupUrlName: "Upper-Valley-Running-Club"
      }
    },
    {
      resolve: "gatsby-source-wordpress",
      options: {
        baseUrl: "uppervalleyrunningclub.org",
        protocol: "http",
        hostingWPCOM: false,
        useACF: false,
        includedRoutes: ["**/categories", "**/posts", "**/pages"]
      }
    }
  ]
};
