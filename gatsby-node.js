const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const galleryTemplate  = path.resolve(`./src/templates/gallery.js`);
  const eventTemplate  = path.resolve(`./src/templates/event.js`);

  return graphql(
    `
    query {
      galleries: allMarkdownRemark(
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
      events: allMarkdownRemark(
        filter: { 
          fileAbsolutePath: { regex: "/(events)/" }
        }
      ) {
        edges {
          node {
            id
          }
        }
      }
    }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const galleries = result.data.galleries.edges;

    galleries.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: galleryTemplate,
        context: {
          slug: node.frontmatter.path
        },
      })
    })

    const events = result.data.events.edges;

    events.forEach(({ node }) => {
      createPage({
        path: node.id,
        component: eventTemplate,
        context: {
          slug: node.id
        },
      })
    })

    return null;
  });
}


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const basePath = node.fileAbsolutePath.indexOf('events/') !== -1 ? `events` : `galleries`;
    const value = createFilePath({ node, getNode, basePath: basePath })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
