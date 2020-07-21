import React from "react"

import styles from "./footer.module.css"

const Footer = () => (<footer className={styles.footer}>
    <div className={styles.content}>
      DAAM è un’iniziativa con il patrocinio del MIA Photo Fair.

      <div className={styles.notice}>Tutti i diritti riservati © {new Date().getFullYear()}</div>
    </div>
  </footer>
)

export default Footer
