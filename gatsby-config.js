const { BLOCKS, INLINES } = require('@contentful/rich-text-types')
const urlParser = require('js-video-url-parser');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
    description: 'Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.',
    author: '@gatsbyjs',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
        host: process.env.GATSBY_CONTENTFUL_HOST
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
            [INLINES.ENTRY_HYPERLINK]: node => {
              const contentType = node.data.target.sys.contentType.sys.id;
              const entry = node.data.target;
              if (contentType == 'page') {
                return `<a href="/press-releases/${entry.fields.slug['en-US']}">${entry.fields.title['en-US']}</a>`
              } else if (contentType == 'demoPage') {
                return `<a href="/sales-demo-pages/${entry.fields.slug['en-US']}">${entry.fields.title['en-US']}</a>`
              }
            },
            [BLOCKS.EMBEDDED_ENTRY]: node => {
              const contentType = node.data.target.sys.contentType.sys.id;
              const entry = node.data.target;
              if (contentType == 'blockSignUp') {
                return `
                  <div class="block-signup">
                    <form
                      class="container"
                      action="${entry.fields.mailchimpFormAction['en-US']}"
                      method="post"
                      id="mc-embedded-subscribe-form"
                      name="mc-embedded-subscribe-form"
                      target="_blank">
                      <h2>${entry.fields.title['en-US']}</h2>
                      <p>${entry.fields.description['en-US']}</p>
                      <div>
                        <input
                          type="email"
                          placeholder="Your Email address (required)"
                          name="EMAIL"
                          class="block-signup__input-text"
                          id="mce-EMAIL" />
                        <input
                          type="text"
                          name="b_64719f4e18541c12bab05be89_be74f09e93"
                          tabindex="-1"
                          class="block-signup__input-honeypot"
                          value="" />
                        <input
                          type="submit"
                          value="Subscribe"
                          name="subscribe"
                          class="block-signup__submit"
                          id="mc-embedded-subscribe"/>
                      </div>
                    </form>
                  </div>`
              } else if (contentType == 'blockVideo') {
                const videoInfo = urlParser.parse(entry.fields.url['en-US']);
                if (videoInfo.provider == 'youtube') {
                  return `
                    <iframe src="https://www.youtube.com/embed/${videoInfo.id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                } else if (videoInfo.provider == 'vimeo') {
                  return `
                    <iframe src="https://player.vimeo.com/video/${videoInfo.id}?color=ffffff&title=0&byline=0&portrait=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`
                }
              } else if (contentType == 'page') {
                const entry = node.data.target;
                return `
                  <div class="block-entry">
                    <div class="container">
                      <div class="block-entry__label">See this Press Release too:</div>
                      <div class="block-entry__teaser">
                        👉 
                        <a class="block-entry__title" href="/press-releases/${entry.fields.slug['en-US']}">
                        ${entry.fields.title['en-US']}
                      </a>
                      </div>
                    </div>
                  </div>
                  `
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
