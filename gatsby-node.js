const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulPressRelease {
          edges {
            node {
              id
              slug
            }
          }
        }
        allContentfulSalesDemoPage {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allContentfulSalesDemoPage.edges.forEach(({ node }) => {
        createPage({
          path: '/sales-demo-pages/'+node.slug,
          component: path.resolve('./src/templates/salesDemoPage.jsx'),
          context: {
            id: node.id
          },
        })
      })
      result.data.allContentfulPressRelease.edges.forEach(({ node }) => {
        createPage({
          path: '/press-releases/'+node.slug,
          component: path.resolve('./src/templates/pressRelease.jsx'),
          context: {
            id: node.id
          },
        })
      })
      resolve()
    })
  })
};
