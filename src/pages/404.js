import React from "react"

import styles from "./index.module.css"
import cameraIcon from "../images/camera-icon.svg"
import arrowIcon from "../images/left-arrow.svg"

const NotFound = () => (
  <div>
    <section className={`${styles.section} ${styles.pinkBg}`}>
      <main className={styles.content}>
        <div className={styles.head}>
          <div>
            <h1 className={styles.subtitle}>404</h1>
          </div>
        </div>

        <div className={styles.mainTextBig}>
          <div className={styles.notFoundText}>Nothing to see here <img className={styles.cameraIcon} src={cameraIcon} alt="" /></div>
          <div className={styles.backHome}>
            <a className={styles.backHomeLink} href="/">
              <img className={styles.arrowIcon} src={arrowIcon} alt="" /> Home
            </a>
          </div>
        </div>
      </main>
    </section>
  </div>
)

export default NotFound
