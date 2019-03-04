import React from 'react'; // eslint-disable-line no-unused-vars
import Layout from '../components/layout'; // eslint-disable-line no-unused-vars
import Helmet from 'react-helmet'; // eslint-disable-line no-unused-vars
import { graphql } from 'gatsby';

const salesDemoPage = ({ data }) => {

  return (
    <Layout>
      <Helmet title={data.contentfulSalesDemoPage.title} />
      <header>
        <nav><a href="/" className="back">« Go back</a></nav>
        <div className="title container">
          <h1>{data.contentfulSalesDemoPage.title}</h1>
        </div>
      </header>
      <div className="body container" dangerouslySetInnerHTML={{__html: data.contentfulSalesDemoPage.copy.childContentfulRichText.html}} />
    </Layout>
  )
}

export default salesDemoPage

export const PageQuery = graphql`
	query salesDemoPage($id: String!) {
	  contentfulSalesDemoPage(id: { eq: $id }) {
	    title
	    copy {
        childContentfulRichText {
          html
        }
	    }
	  }
	}
`;
