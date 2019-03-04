import React from 'react'; // eslint-disable-line no-unused-vars
import Layout from '../components/layout'; // eslint-disable-line no-unused-vars
import Helmet from 'react-helmet'; // eslint-disable-line no-unused-vars
import { graphql } from 'gatsby';

const PressRelease = ({ data }) => {

  return (
    <Layout>
      <Helmet title={data.contentfulPressRelease.title} />
      <header>
        <nav><a href="/">« Go back</a></nav>
        <div className="title container">
          <h1>{data.contentfulPressRelease.title}</h1>
        </div>
      </header>
      <div className="body container" dangerouslySetInnerHTML={{__html: data.contentfulPressRelease.copy.childContentfulRichText.html}} />
    </Layout>
  )
}

export default PressRelease

export const PageQuery = graphql`
	query PressRelease($id: String!) {
	  contentfulPressRelease(id: { eq: $id }) {
	    title
	    copy {
        childContentfulRichText {
          html
        }
	    }
	  }
	}
`;
