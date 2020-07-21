import React from "react"
import { graphql } from "gatsby"

export default function Gallery ({ data }) {
  const gallery = data.markdownRemark
  
  return (
    <div>
      <Seo/>
      {gallery.frontmatter.name}
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { path: { eq: $slug } }) {
      frontmatter {
        name
      }
    }
  }
`
