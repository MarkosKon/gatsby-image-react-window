import React from "react"
import { graphql } from "gatsby"
import sortBy from "lodash.sortby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Cards from "../components/Cards"

const IndexPage = ({ data }) => {
  const cards = data.allCardsJson.edges.map(n => n.node)
  const sortedCards = sortBy(cards, ["cost", "name"])
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <Cards cards={sortedCards} />
    </Layout>
  )
}

export const query = graphql`
  query indexPage {
    allCardsJson {
      edges {
        node {
          dbfId
          name
          cost
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
