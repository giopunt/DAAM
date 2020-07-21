exports.createPages = async function ({ actions, graphql }) {

  const { data } = await graphql(`
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
  `)

  data.allMarkdownRemark.edges.forEach(edge => {
    actions.createPage({
      path: node.frontmatter.path,
      component: require.resolve(`./src/templates/gallery.js`),
      context: { slug: node.frontmatter.path },
    })
  })
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