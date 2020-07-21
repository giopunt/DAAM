import React from "react"

import Seo from "../components/seo"
import Galleries from "../components/galleries"

import styles from "./index.module.css"

const Gallerie = () => (
  <div>
    <Seo/>
    <section className={[styles.section, styles.pinkBg].join(' ')}>
      <main className={styles.content}>
        <div className={styles.head}>
          <div>
            <h2 className={styles.subtitle}>Gallerie</h2>
          </div>
        </div>

        <Galleries />
      </main>
    </section>
  </div>
)

export default Gallerie
