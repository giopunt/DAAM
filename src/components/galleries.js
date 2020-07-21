import React from "react"
import { StaticQuery, graphql } from "gatsby"
import cameraIcon from "../images/camera-icon.svg"

import styles from "./galleries.module.css"

const Galleries = () => (
  <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(
            filter: { 
              fileAbsolutePath: { regex: "/(galleries)/" }
              frontmatter: { Draft: { eq: false } } 
            }
          ) {
            totalCount
            edges {
              node {
                id
                frontmatter {
                  name
                }
              }
            }
          }
        }
      `}
      render={data => data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id} className={styles.box}>
          <h3 className={styles.name}>{node.frontmatter.name}</h3>
          <img className={styles.cameraIcon} src={cameraIcon} alt="" />
        </div>
      ))}
    />
)

export default Galleries
