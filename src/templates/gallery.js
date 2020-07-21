import React from "react"
import { Link, graphql } from "gatsby"
import ReactMarkdown from "react-markdown"
import Footer from "../components/footer"

import styles from "./gallery.module.css"

import arrowIcon from "../images/left-arrow.svg"

export default function Gallery({ data }) {
  const node = data.markdownRemark
  const {
    address,
    contacts,
    description,
    name,
    website
  } = node.frontmatter

  return (
    <div>
      <div className={styles.layout}>
        <main className={styles.main}>
          <Link className={styles.backHomeLink} to="/">
            <img className={styles.arrowIcon} src={arrowIcon} alt="" />
          </Link>
          <h1 className={styles.name}>{name}</h1>
          {website && <section className={styles.section}>
            <a href={website} className={styles.websiteLink} target="_blank" rel="noreferrer">WEBSITE</a>
          </section>}

          {address && <section className={styles.section}>
            <h3 className={styles.subtitle}>Indirizzo</h3>
            <ReactMarkdown source={address} escapeHtml={false} />
          </section>}

          {contacts && <section className={styles.section}>
            <h3 className={styles.subtitle}>Contatti</h3>
            <ReactMarkdown source={contacts} escapeHtml={false} />
          </section>}

          {description && <section className={styles.section}>
            <h3 className={styles.subtitle}>Bio</h3>
            <ReactMarkdown source={description} escapeHtml={false} />
          </section>}

        </main>
      </div>
      <Footer />
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { path: { eq: $slug } }) {
      frontmatter {
        address
        contacts
        description
        name
        website
      }
    }
  }
`
