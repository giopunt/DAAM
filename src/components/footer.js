import React from "react"

import styles from "./footer.module.css"

import logo from "../images/mia-logo.jpg"

const Footer = () => (<footer className={styles.footer}>
    <div className={styles.content}>
      <p><a href="https://www.miafair.it/">MIA Fair</a> è la prima e più importante Fiera d’arte dedicata alla fotografia e all’immagine in movimento in Italia, nata con l’obiettivo di evidenziare il ruolo trasversale che questo mezzo ha assunto tra i linguaggi espressivi dell’arte e del sistema dell’arte contemporanea</p>
      <p>DAAM è un’iniziativa con il patrocinio del <a href="https://www.miafair.it/">MIA (Milan Image Art) Fair</a>.</p>

      <a href="https://www.miafair.it/" className={styles.miaLogo}><img src={logo} alt="MIA logo" /></a>

      <div className={styles.notice}>Tutti i diritti riservati © {new Date().getFullYear()}</div>
    </div>
  </footer>
)

export default Footer
