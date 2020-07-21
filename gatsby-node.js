const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/gallery.js`);

  return graphql(
    `
    query {
      allMarkdownRemark(
        filter: { 
          fileAbsolutePath: { regex: "/(galleries)/" }
        }
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPost,
        context: {
          slug: node.frontmatter.path
        },
      })
    })

    return null;
  });
}


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode, basePath: `galleries` })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}