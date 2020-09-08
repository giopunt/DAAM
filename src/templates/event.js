import React from "react"
import moment from 'moment'
import { Link, graphql } from "gatsby"
import ReactMarkdown from "react-markdown"

import Footer from "../components/footer"
import Seo from "../components/seo"

import styles from "./event.module.css"

import arrowIcon from "../images/left-arrow.svg"

const getEventTime = eventDate => moment(eventDate).format("HH:mm")

class Event extends React.Component {
  render() {
    const node = this.props.data.markdownRemark
  
    const {
      title,
      description,
      location,
      date,
      endDate
    } = node.frontmatter
  
    return (
      <div>
        <Seo title={title + " | DAAM (dovevo andare al MIA)"} />
        <div className={styles.layout}>
          <main className={styles.main}>
            <Link className={styles.backHomeLink} to="/#events">
              <img className={styles.arrowIcon} src={arrowIcon} alt="" />
            </Link>
            <h1 className={styles.name}>{title}</h1>

            <p className={styles.eventTime}>
              Dalle {getEventTime(date)}
              {
                endDate && ` alle ${getEventTime(endDate)}`
              } 
            </p>

            <div className={styles.location}>Presso: {location}</div>

            {description && <section className={styles.section}>
              <ReactMarkdown className={styles.programma} source={description} escapeHtml={false} parserOptions={{ commonmark: true }} />
            </section>}
          </main>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Event

export const query = graphql`
  query($slug: String!) {
    markdownRemark(id: { eq: $slug }) {
      frontmatter {
        title
        description
        location
        gallery
        date
        endDate
      }
    }
  }
`
