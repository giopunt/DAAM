import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"

import styles from "./galleries.module.css"
import cameraIcon from "../images/camera-icon.svg"

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
            edges {
              node {
                id
                frontmatter {
                  name
                  path
                }
              }
            }
          }
        }
      `}
      render={data => (
        <div>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <Link key={node.id} to={node.frontmatter.path} className={styles.link}>
              <div className={styles.box}>
                <h3 className={styles.name}>{node.frontmatter.name}</h3>
                <img className={styles.cameraIcon} src={cameraIcon} alt="" />
              </div>
            </Link>
          ))}
        </div>
      )
    }
    />
)

export default Galleries
