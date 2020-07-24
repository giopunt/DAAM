import React from "react"

import styles from "./footer.module.css"

import logo from "../images/mia-logo.jpg"

const Footer = () => (<footer className={styles.footer}>
    <div className={styles.content}>
      DAAM è un’iniziativa con il patrocinio del <a href="https://www.miafair.it/">MIA (Milan Image Art) Fair</a>.

      <div className={styles.notice}>Tutti i diritti riservati © {new Date().getFullYear()}</div>

      <a href="https://www.miafair.it/" className={styles.miaLogo}><img src={logo} alt="MIA logo" /></a>
    </div>
  </footer>
)

export default Footer
