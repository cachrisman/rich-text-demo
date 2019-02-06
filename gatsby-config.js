const { BLOCKS, INLINES } = require('@contentful/rich-text-types')

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST
      }
    },
    {
      resolve: '@contentful/gatsby-transformer-contentful-richtext',
      options: {
        renderOptions: {
          renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: node => {
              return `<img src="${
                node.data.target.fields.file['en-US'].url
              }" alt="${
                node.data.target.fields.title['en-US']
              }"/>`
            },
            [INLINES.EMBEDDED_ENTRY]: node => {
              const contentType = node.data.target.sys.contentType.sys.id;
              if (contentType == 'inlineMicrocopy') {
                return `<span>
                    ${node.data.target.fields.value['en-US']}
                  </span>`
              } else {
                return ''
              }
            },
            [BLOCKS.EMBEDDED_ENTRY]: node => {
              const contentType = node.data.target.sys.contentType.sys.id;
              if (contentType == 'blockSignUp') {
                const signUpForm = node.data.target;
                return `
                  <div class="signup">
                    <form
                      class="container"
                      action="${signUpForm.fields.mailchimpFormAction['en-US']}"
                      method="post"
                      id="mc-embedded-subscribe-form"
                      name="mc-embedded-subscribe-form"
                      target="_blank">
                      <h2>${signUpForm.fields.title['en-US']}</h2>
                      <p>${signUpForm.fields.description['en-US']}</p>
                      <div>
                        <input
                          type="email"
                          placeholder="Your Email address (required)"
                          name="EMAIL"
                          class="signup__input-text"
                          id="mce-EMAIL" />
                        <input
                          type="text"
                          name="b_64719f4e18541c12bab05be89_be74f09e93"
                          tabindex="-1"
                          class="signup__input-honeypot"
                          value="" />
                        <input
                          type="submit"
                          value="Subscribe"
                          name="subscribe"
                          class="signup__submit"
                          id="mc-embedded-subscribe"/>
                      </div>
                    </form>
                  </div>`
              } else {
                return ''
              }
            }
          },
        },
      },
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
